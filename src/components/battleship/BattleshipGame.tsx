"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Define types inline to avoid module resolution issues
export type GameState = 'setup' | 'playing' | 'over';

export interface Ship {
  name: string;
  length: number;
  positions: number[];
  isPlaced: boolean;
  isSunk: boolean;
}

// Dynamically import components to avoid circular dependencies
const GameBoard = dynamic(() => import('./GameBoard'), { ssr: false });
const GameControls = dynamic(() => import('./GameControls'), { ssr: false });

// Import CSS module
import styles from './Battleship.module.css';

const BOARD_SIZE = 10;

const initialShips: Ship[] = [
  {
    name: 'destroyer',
    length: 2,
    positions: [],
    isPlaced: false,
    isSunk: false
  },
  {
    name: 'submarine',
    length: 3,
    positions: [],
    isPlaced: false,
    isSunk: false
  },
  {
    name: 'cruiser',
    length: 3,
    positions: [],
    isPlaced: false,
    isSunk: false
  },
  {
    name: 'battleship',
    length: 4,
    positions: [],
    isPlaced: false,
    isSunk: false
  },
  {
    name: 'carrier',
    length: 5,
    positions: [],
    isPlaced: false,
    isSunk: false
  },
];

export default function BattleshipGame() {
  const [gameState, setGameState] = useState<GameState>('setup');
  const [playerShips, setPlayerShips] = useState<Ship[]>(JSON.parse(JSON.stringify(initialShips)));
  const [computerShips, setComputerShips] = useState<Ship[]>(JSON.parse(JSON.stringify(initialShips)));
  const [playerBoard, setPlayerBoard] = useState<(string | null)[]>(Array(BOARD_SIZE * BOARD_SIZE).fill(null));
  const [computerBoard, setComputerBoard] = useState<(string | null)[]>(Array(BOARD_SIZE * BOARD_SIZE).fill(null));
  const [playerHits, setPlayerHits] = useState<number[]>([]);
  const [playerMisses, setPlayerMisses] = useState<number[]>([]);
  const [computerHits, setComputerHits] = useState<number[]>([]);
  const [computerMisses, setComputerMisses] = useState<number[]>([]);
  const [selectedShip, setSelectedShip] = useState<Ship | null>(null);
  const [shipOrientation, setShipOrientation] = useState<'horizontal' | 'vertical'>('horizontal');
  const [currentTurn, setCurrentTurn] = useState<'player' | 'computer'>('player');
  const [message, setMessage] = useState<string>('Place your ships on the board');

  // Initialize the game
  useEffect(() => {
    if (gameState === 'setup') {
      // Generate computer ships
      const newComputerShips = JSON.parse(JSON.stringify(initialShips));
      const newComputerBoard = [...computerBoard];
      
      newComputerShips.forEach((ship: Ship) => {
        placeComputerShip(ship, newComputerBoard);
      });
      
      setComputerShips(newComputerShips);
      setComputerBoard(newComputerBoard);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Computer takes turn after player
  useEffect(() => {
    if (gameState === 'playing' && currentTurn === 'computer') {
      const timer = setTimeout(() => {
        computerMove();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTurn, gameState]);

  // Check for win conditions
  useEffect(() => {
    if (gameState === 'playing') {
      // Check if player won
      if (computerShips.every(ship => ship.isSunk)) {
        setGameState('over');
        setMessage("Congratulations! You won!");
      }
      
      // Check if computer won
      if (playerShips.every(ship => ship.isSunk)) {
        setGameState('over');
        setMessage("Game over! The computer won.");
      }
    }
  }, [playerShips, computerShips, gameState]);

  // Place a computer ship randomly on the board
  const placeComputerShip = (ship: Ship, board: (string | null)[]) => {
    let placed = false;
    
    while (!placed) {
      const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
      const positions: number[] = [];
      
      let startPosition: number;
      if (orientation === 'horizontal') {
        // Ensure ship doesn't go off the edge horizontally
        const row = Math.floor(Math.random() * BOARD_SIZE);
        const maxCol = BOARD_SIZE - ship.length;
        const col = Math.floor(Math.random() * (maxCol + 1));
        startPosition = row * BOARD_SIZE + col;
      } else {
        // Ensure ship doesn't go off the edge vertically
        const maxRow = BOARD_SIZE - ship.length;
        const row = Math.floor(Math.random() * (maxRow + 1));
        const col = Math.floor(Math.random() * BOARD_SIZE);
        startPosition = row * BOARD_SIZE + col;
      }
      
      // Generate ship positions
      for (let i = 0; i < ship.length; i++) {
        if (orientation === 'horizontal') {
          positions.push(startPosition + i);
        } else {
          positions.push(startPosition + (i * BOARD_SIZE));
        }
      }
      
      // Check if positions are valid
      const isValid = positions.every((pos: number) => {
        // Check if position is on the board
        if (pos < 0 || pos >= BOARD_SIZE * BOARD_SIZE) {
          return false;
        }
        
        // Check if position is already occupied
        if (board[pos] !== null) {
          return false;
        }
        
        // Check if position is adjacent to another ship
        return !hasAdjacentShip(pos, board);
      });
      
      if (isValid) {
        // Place ship on the board
        positions.forEach((pos: number) => {
          board[pos] = ship.name;
        });
        
        // Update ship object
        ship.positions = positions;
        ship.isPlaced = true;
        placed = true;
      }
    }
  };

  // Check if a position has adjacent ships
  const hasAdjacentShip = (position: number, board: (string | null)[]) => {
    const row = Math.floor(position / BOARD_SIZE);
    const col = position % BOARD_SIZE;
    
    // Check all adjacent cells (including diagonals)
    for (let r = Math.max(0, row - 1); r <= Math.min(BOARD_SIZE - 1, row + 1); r++) {
      for (let c = Math.max(0, col - 1); c <= Math.min(BOARD_SIZE - 1, col + 1); c++) {
        const pos = r * BOARD_SIZE + c;
        if (pos !== position && board[pos] !== null) {
          return true;
        }
      }
    }
    
    return false;
  };

  // Player selects a ship to place
  const selectShip = (ship: Ship) => {
    if (gameState !== 'setup') return;
    
    // If ship is already placed, remove it first
    if (ship.isPlaced) {
      const newPlayerBoard = [...playerBoard];
      ship.positions.forEach((pos: number) => {
        newPlayerBoard[pos] = null;
      });
      setPlayerBoard(newPlayerBoard);
      
      const newPlayerShips = playerShips.map((s: Ship) => {
        if (s.name === ship.name) {
          return { ...s, isPlaced: false, positions: [] };
        }
        return s;
      });
      setPlayerShips(newPlayerShips);
    }
    
    setSelectedShip(ship);
  };

  // Toggle ship orientation
  const toggleOrientation = () => {
    setShipOrientation(prev => prev === 'horizontal' ? 'vertical' : 'horizontal');
  };

  // Place a ship on the player's board
  const placeShip = (position: number) => {
    if (gameState !== 'setup' || !selectedShip) return;
    
    const positions: number[] = [];
    const row = Math.floor(position / BOARD_SIZE);
    const col = position % BOARD_SIZE;
    
    // Generate ship positions based on orientation
    for (let i = 0; i < selectedShip.length; i++) {
      if (shipOrientation === 'horizontal') {
        // Check if ship goes off the edge horizontally
        if (col + i >= BOARD_SIZE) {
          setMessage("Ship can't be placed outside the board!");
          return;
        }
        positions.push(row * BOARD_SIZE + (col + i));
      } else {
        // Check if ship goes off the edge vertically
        if (row + i >= BOARD_SIZE) {
          setMessage("Ship can't be placed outside the board!");
          return;
        }
        positions.push((row + i) * BOARD_SIZE + col);
      }
    }
    
    // Check if positions overlap with other ships
    if (positions.some((pos: number) => playerBoard[pos] !== null)) {
      setMessage("Ships can't overlap!");
      return;
    }
    
    // Check if positions are adjacent to other ships
    if (positions.some((pos: number) => hasAdjacentShip(pos, playerBoard))) {
      setMessage("Ships can't be adjacent to each other!");
      return;
    }
    
    // Place ship on the board
    const newPlayerBoard = [...playerBoard];
    positions.forEach((pos: number) => {
      newPlayerBoard[pos] = selectedShip.name;
    });
    setPlayerBoard(newPlayerBoard);
    
    // Update ship data
    const newPlayerShips = playerShips.map((ship: Ship) => {
      if (ship.name === selectedShip.name) {
        return { ...ship, isPlaced: true, positions };
      }
      return ship;
    });
    setPlayerShips(newPlayerShips);
    
    // Clear selection
    setSelectedShip(null);
    setMessage("Place your ships on the board");
  };

  // Start the game when all ships are placed
  const startGame = () => {
    if (playerShips.every(ship => ship.isPlaced)) {
      setGameState('playing');
      setCurrentTurn('player');
      setMessage("Your turn - Click on the computer's board to fire!");
    } else {
      setMessage("Place all your ships before starting!");
    }
  };

  // Reset the game
  const resetGame = () => {
    setGameState('setup');
    setPlayerShips(JSON.parse(JSON.stringify(initialShips)));
    setComputerShips(JSON.parse(JSON.stringify(initialShips)));
    setPlayerBoard(Array(BOARD_SIZE * BOARD_SIZE).fill(null));
    setComputerBoard(Array(BOARD_SIZE * BOARD_SIZE).fill(null));
    setPlayerHits([]);
    setPlayerMisses([]);
    setComputerHits([]);
    setComputerMisses([]);
    setSelectedShip(null);
    setShipOrientation('horizontal');
    setCurrentTurn('player');
    setMessage('Place your ships on the board');
    
    // Regenerate computer ships
    const newComputerShips = JSON.parse(JSON.stringify(initialShips));
    const newComputerBoard = Array(BOARD_SIZE * BOARD_SIZE).fill(null);
    
    newComputerShips.forEach((ship: Ship) => {
      placeComputerShip(ship, newComputerBoard);
    });
    
    setComputerShips(newComputerShips);
    setComputerBoard(newComputerBoard);
  };

  // Player fires at computer's board
  const playerMove = (position: number) => {
    if (gameState !== 'playing' || currentTurn !== 'player') return;
    
    // Check if position has already been attacked
    if (playerHits.includes(position) || playerMisses.includes(position)) {
      setMessage("You've already fired at this position!");
      return;
    }
    
    // Check if hit or miss
    const targetShipName = computerBoard[position];
    if (targetShipName) {
      // Hit
      setPlayerHits(prev => [...prev, position]);
      
      // Update ship status
      const newComputerShips = computerShips.map((ship: Ship) => {
        if (ship.name === targetShipName) {
          const updatedPositions = ship.positions.filter((pos: number) => pos !== position);
          const isSunk = updatedPositions.length === 0;
          
          if (isSunk) {
            setMessage(`You sunk their ${ship.name}!`);
          } else {
            setMessage("Hit!");
          }
          
          return {
            ...ship,
            positions: updatedPositions,
            isSunk
          };
        }
        return ship;
      });
      
      setComputerShips(newComputerShips);
    } else {
      // Miss
      setPlayerMisses(prev => [...prev, position]);
      setMessage("Miss!");
    }
    
    // Switch turns
    setCurrentTurn('computer');
  };

  // Computer fires at player's board
  const computerMove = () => {
    if (gameState !== 'playing' || currentTurn !== 'computer') return;
    
    // Enhanced AI logic
    let position: number;
    let attempts = 0;
    
    // Find consecutive hits that might be part of the same ship
    const findShipDirection = () => {
      const hitPositions = [...computerHits];
      
      // Check for consecutive hits
      for (const hit1 of hitPositions) {
        const row1 = Math.floor(hit1 / BOARD_SIZE);
        const col1 = hit1 % BOARD_SIZE;
        
        // Look for another hit adjacent to this one
        for (const hit2 of hitPositions) {
          if (hit1 === hit2) continue;
          
          const row2 = Math.floor(hit2 / BOARD_SIZE);
          const col2 = hit2 % BOARD_SIZE;
          
          // Check if these hits are adjacent (horizontally or vertically)
          const isAdjacent = (
            // Horizontal adjacency
            (row1 === row2 && Math.abs(col1 - col2) === 1) ||
            // Vertical adjacency
            (col1 === col2 && Math.abs(row1 - row2) === 1)
          );
          
          if (isAdjacent) {
            // Found adjacent hits - determine if horizontal or vertical
            const isHorizontal = row1 === row2;
            
            // Check the next positions in line
            const possibleTargets = [];
            
            if (isHorizontal) {
              // Check left and right from the line of hits
              const minCol = Math.min(col1, col2);
              const maxCol = Math.max(col1, col2);
              
              // Try leftmost position
              if (minCol > 0) {
                const leftPos = row1 * BOARD_SIZE + (minCol - 1);
                if (!computerHits.includes(leftPos) && !computerMisses.includes(leftPos)) {
                  possibleTargets.push(leftPos);
                }
              }
              
              // Try rightmost position
              if (maxCol < BOARD_SIZE - 1) {
                const rightPos = row1 * BOARD_SIZE + (maxCol + 1);
                if (!computerHits.includes(rightPos) && !computerMisses.includes(rightPos)) {
                  possibleTargets.push(rightPos);
                }
              }
            } else {
              // Check up and down from the line of hits
              const minRow = Math.min(row1, row2);
              const maxRow = Math.max(row1, row2);
              
              // Try upmost position
              if (minRow > 0) {
                const upPos = (minRow - 1) * BOARD_SIZE + col1;
                if (!computerHits.includes(upPos) && !computerMisses.includes(upPos)) {
                  possibleTargets.push(upPos);
                }
              }
              
              // Try bottom position
              if (maxRow < BOARD_SIZE - 1) {
                const downPos = (maxRow + 1) * BOARD_SIZE + col1;
                if (!computerHits.includes(downPos) && !computerMisses.includes(downPos)) {
                  possibleTargets.push(downPos);
                }
              }
            }
            
            if (possibleTargets.length > 0) {
              return possibleTargets[Math.floor(Math.random() * possibleTargets.length)];
            }
          }
        }
      }
      
      return null;
    };
    
    // First priority: try to find a ship's direction based on multiple hits
    const linearTarget = findShipDirection();
    
    if (linearTarget !== null) {
      position = linearTarget;
    } else {
      // First priority: target squares adjacent to hits that aren't already hit or missed
      const targetAdjacentToHits = () => {
        // Get all positions that have been hit
        const hitPositions = [...computerHits];
        
        // For each hit position, check its adjacent cells (up, right, down, left)
        for (const hitPos of hitPositions) {
          const row = Math.floor(hitPos / BOARD_SIZE);
          const col = hitPos % BOARD_SIZE;
          
          // Check adjacent cells: up, right, down, left (no diagonals)
          const adjacentPositions = [];
          
          // Up
          if (row > 0) {
            adjacentPositions.push(hitPos - BOARD_SIZE);
          }
          // Right
          if (col < BOARD_SIZE - 1) {
            adjacentPositions.push(hitPos + 1);
          }
          // Down
          if (row < BOARD_SIZE - 1) {
            adjacentPositions.push(hitPos + BOARD_SIZE);
          }
          // Left
          if (col > 0) {
            adjacentPositions.push(hitPos - 1);
          }
          
          // Filter out positions that have already been hit or missed
          const validTargets = adjacentPositions.filter(
            pos => !computerHits.includes(pos) && !computerMisses.includes(pos)
          );
          
          if (validTargets.length > 0) {
            // Return a random valid adjacent position
            return validTargets[Math.floor(Math.random() * validTargets.length)];
          }
        }
        
        return null;
      };
      
      // Try to find an intelligent target
      const intelligentTarget = targetAdjacentToHits();
      
      if (intelligentTarget !== null) {
        position = intelligentTarget;
      } else {
        // Fall back to random targeting if no intelligent targets are available
        do {
          position = Math.floor(Math.random() * (BOARD_SIZE * BOARD_SIZE));
          attempts++;
          
          // Prevent infinite loop
          if (attempts > 100) {
            setMessage("Computer couldn't find a valid move!");
            setCurrentTurn('player');
            return;
          }
        } while (computerHits.includes(position) || computerMisses.includes(position));
      }
    }
    
    // Check if hit or miss
    const targetShipName = playerBoard[position];
    if (targetShipName) {
      // Hit
      setComputerHits(prev => [...prev, position]);
      
      // Update ship status
      const newPlayerShips = playerShips.map((ship: Ship) => {
        if (ship.name === targetShipName) {
          const updatedPositions = ship.positions.filter((pos: number) => pos !== position);
          const isSunk = updatedPositions.length === 0;
          
          if (isSunk) {
            setMessage(`Computer sunk your ${ship.name}!`);
          } else {
            setMessage("Computer hit your ship!");
          }
          
          return {
            ...ship,
            positions: updatedPositions,
            isSunk
          };
        }
        return ship;
      });
      
      setPlayerShips(newPlayerShips);
    } else {
      // Miss
      setComputerMisses(prev => [...prev, position]);
      setMessage("Computer missed!");
    }
    
    // Switch turns
    setCurrentTurn('player');
  };

  return (
    <div className={styles.gameContainer}>
      <div className={styles.gameMessage}>
        {message}
      </div>
      
      <div className={styles.gameBoards}>
        <div className={styles.boardContainer}>
          <h2 className={styles.boardTitle}>Your Board</h2>
          <GameBoard 
            board={playerBoard}
            hits={computerHits}
            misses={computerMisses}
            isPlayerBoard={true}
            onClick={placeShip}
            selectedShip={selectedShip}
            orientation={shipOrientation}
            gameState={gameState}
          />
        </div>
        
        {(gameState === 'playing' || gameState === 'over') && (
          <div className={styles.boardContainer}>
            <h2 className={styles.boardTitle}>Computer&apos;s Board</h2>
            <GameBoard 
              board={computerBoard}
              hits={playerHits}
              misses={playerMisses}
              isPlayerBoard={false}
              onClick={playerMove}
              selectedShip={null}
              orientation="horizontal"
              gameState={gameState}
              hideShips={true}
            />
          </div>
        )}
      </div>
      
      <GameControls 
        gameState={gameState}
        ships={playerShips}
        selectedShip={selectedShip}
        orientation={shipOrientation}
        onSelectShip={selectShip}
        onToggleOrientation={toggleOrientation}
        onStartGame={startGame}
        onResetGame={resetGame}
      />
    </div>
  );
} 