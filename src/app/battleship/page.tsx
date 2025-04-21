"use client";

import React from 'react';
import dynamic from 'next/dynamic';

// Use dynamic import with ssr: false to avoid hydration issues
const BattleshipGame = dynamic(
  () => import('@/components/battleship/BattleshipGame'),
  { ssr: false }
);

export default function BattleshipPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4 text-center">Battleship Game</h1>
      <p className="text-xl text-muted-foreground mb-8 text-center">
        Play the classic Battleship game against the computer.
      </p>
      <BattleshipGame />
    </div>
  );
} 