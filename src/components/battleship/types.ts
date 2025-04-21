export type GameState = 'setup' | 'playing' | 'over';

export interface Ship {
  name: string;
  length: number;
  positions: number[];
  isPlaced: boolean;
  isSunk: boolean;
} 