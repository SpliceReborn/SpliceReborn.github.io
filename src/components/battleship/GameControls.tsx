"use client";

import React from 'react';
import { Ship, GameState } from './BattleshipGame';

// Import CSS module
import styles from './Battleship.module.css';

interface GameControlsProps {
  gameState: GameState;
  ships: Ship[];
  selectedShip: Ship | null;
  orientation: 'horizontal' | 'vertical';
  onSelectShip: (ship: Ship) => void;
  onToggleOrientation: () => void;
  onStartGame: () => void;
  onResetGame: () => void;
}

export default function GameControls({
  gameState,
  ships,
  selectedShip,
  orientation,
  onSelectShip,
  onToggleOrientation,
  onStartGame,
  onResetGame
}: GameControlsProps) {
  return (
    <div className={styles.controls}>
      {gameState === 'setup' && (
        <>
          <div className={styles.shipsContainer}>
            <h3 className={styles.controlTitle}>Your Ships</h3>
            <p className={styles.controlDescription}>Select a ship and place it on your board</p>
            
            <div className={styles.shipsList}>
              {ships.map((ship) => (
                <button
                  key={ship.name}
                  className={`${styles.shipButton} ${selectedShip?.name === ship.name ? styles.selected : ''} ${ship.isPlaced ? styles.placed : ''}`}
                  onClick={() => onSelectShip(ship)}
                  disabled={gameState !== 'setup'}
                >
                  <div className={styles.shipPreview}>
                    {Array.from({ length: ship.length }).map((_, i) => (
                      <div key={i} className={`${styles.shipCell} ${styles[ship.name]}`} />
                    ))}
                  </div>
                  <span className={styles.shipName}>
                    {ship.name.charAt(0).toUpperCase() + ship.name.slice(1)}
                    {ship.isPlaced && ' ✓'}
                  </span>
                </button>
              ))}
            </div>
            
            <div className={styles.orientationControl}>
              <button
                className={styles.orientationButton}
                onClick={onToggleOrientation}
                disabled={!selectedShip || gameState !== 'setup'}
              >
                Rotate Ship ({orientation})
              </button>
            </div>
            
            <button
              className={styles.startButton}
              onClick={onStartGame}
              disabled={!ships.every(ship => ship.isPlaced) || gameState !== 'setup'}
            >
              Start Game
            </button>
          </div>
        </>
      )}
      
      {(gameState === 'playing' || gameState === 'over') && (
        <div className={styles.gameInfo}>
          <h3 className={styles.controlTitle}>
            {gameState === 'playing' ? 'Game in Progress' : 'Game Over'}
          </h3>
          
          <div className={styles.shipStatus}>
            <div className={styles.playerShips}>
              <h4>Your Ships</h4>
              <ul>
                {ships.map(ship => (
                  <li key={ship.name} className={ship.isSunk ? styles.sunk : ''}>
                    {ship.name.charAt(0).toUpperCase() + ship.name.slice(1)}: 
                    {ship.isSunk ? ' Sunk' : ' Active'}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <button
            className={styles.resetButton}
            onClick={onResetGame}
          >
            {gameState === 'playing' ? 'Restart Game' : 'Play Again'}
          </button>
        </div>
      )}
    </div>
  );
} 