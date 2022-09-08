import React, { useEffect, useState } from 'react';
import './App.css';
import { TodoController } from './TodoController';

import create from 'zustand';

export const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

function App() {
  return (
    <>
      <TodoController />
    </>
  );
}

export default App;
