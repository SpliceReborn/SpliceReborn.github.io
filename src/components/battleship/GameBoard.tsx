"use client";

import React from 'react';
import { Ship, GameState } from './BattleshipGame';

// Import CSS module
import styles from './Battleship.module.css';

interface GameBoardProps {
  board: (string | null)[];
  hits: number[];
  misses: number[];
  isPlayerBoard: boolean;
  onClick: (position: number) => void;
  selectedShip: Ship | null;
  orientation: 'horizontal' | 'vertical';
  gameState: GameState;
  hideShips?: boolean;
}

export default function GameBoard({
  board,
  hits,
  misses,
  isPlayerBoard,
  onClick,
  selectedShip,
  orientation,
  gameState,
  hideShips = false
}: GameBoardProps) {
  const boardSize = Math.sqrt(board.length);
  
  // Generate preview positions for ship placement
  const getPreviewPositions = (position: number): number[] => {
    if (!selectedShip || gameState !== 'setup' || !isPlayerBoard) return [];
    
    const positions: number[] = [];
    const row = Math.floor(position / boardSize);
    const col = position % boardSize;
    
    for (let i = 0; i < selectedShip.length; i++) {
      if (orientation === 'horizontal') {
        // Check if ship goes off the edge horizontally
        if (col + i >= boardSize) {
          return [];
        }
        positions.push(row * boardSize + (col + i));
      } else {
        // Check if ship goes off the edge vertically
        if (row + i >= boardSize) {
          return [];
        }
        positions.push((row + i) * boardSize + col);
      }
    }
    
    // Check if positions overlap with other ships
    if (positions.some(pos => board[pos] !== null)) {
      return [];
    }
    
    return positions;
  };
  
  // Determine cell class based on its state
  const getCellClass = (position: number, value: string | null, previewPositions: number[]): string => {
    let cellClass = styles.cell;
    
    // If cell is in preview positions, add preview class
    if (previewPositions.includes(position)) {
      cellClass += ` ${styles.preview}`;
      
      // Add invalid class if any preview position is invalid
      if (previewPositions.some(pos => {
        const row = Math.floor(pos / boardSize);
        const col = pos % boardSize;
        const isAtEdge = (orientation === 'horizontal' && col + 1 >= boardSize) || 
                          (orientation === 'vertical' && row + 1 >= boardSize);
        return isAtEdge || board[pos] !== null;
      })) {
        cellClass += ` ${styles.invalid}`;
      }
      return cellClass;
    }
    
    // Add classes based on cell content
    if (value && !hideShips) {
      cellClass += ` ${styles.ship} ${styles[value]}`;
    }
    
    // Add hit or miss classes
    if (hits.includes(position)) {
      cellClass += ` ${styles.hit}`;
    } else if (misses.includes(position)) {
      cellClass += ` ${styles.miss}`;
    }
    
    return cellClass;
  };
  
  // Handle cell hover for ship placement preview
  const handleMouseEnter = (position: number) => {
    if (gameState !== 'setup' || !isPlayerBoard || !selectedShip) return;
    
    const previewCells = document.querySelectorAll(`.${styles.preview}`);
    previewCells.forEach(cell => {
      cell.classList.remove(styles.preview, styles.invalid);
    });
    
    const previewPositions = getPreviewPositions(position);
    previewPositions.forEach(pos => {
      const cell = document.getElementById(`cell-${pos}`);
      if (cell) {
        cell.classList.add(styles.preview);
        
        // Add invalid class if position is invalid
        if (pos >= board.length || board[pos] !== null) {
          cell.classList.add(styles.invalid);
        }
      }
    });
  };
  
  // Handle cell click for ship placement or firing
  const handleCellClick = (position: number) => {
    onClick(position);
  };
  
  return (
    <div 
      className={styles.board}
      style={{ 
        gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
        gridTemplateRows: `repeat(${boardSize}, 1fr)`
      }}
    >
      {board.map((value, position) => {
        const previewPositions = getPreviewPositions(position);
        const cellClass = getCellClass(position, value, previewPositions);
        
        return (
          <div
            key={position}
            id={`cell-${position}`}
            className={cellClass}
            onClick={() => handleCellClick(position)}
            onMouseEnter={() => handleMouseEnter(position)}
            data-position={position}
          />
        );
      })}
    </div>
  );
} 