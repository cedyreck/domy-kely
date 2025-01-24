import React, { useState } from 'react';
import DominoBoard from '../DominoBoard/DominoBoardComponent';
import TileContainer from '../TileContainer/TileContainerComponent';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';

const generateCompleteDominoSet = () => {
  const dominoSet = [];
  let id = 1;
  for (let i = 0; i <= 6; i++) {
    for (let j = i; j <= 6; j++) {
      dominoSet.push({ id: id++, left: i, right: j });
    }
  }
  return dominoSet;
};

const shuffleTiles = (tiles) => {
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  return tiles;
};

function App() {
  const [boardTiles, setBoardTiles] = useState([]);
  const [tiles, setTiles] = useState(shuffleTiles(generateCompleteDominoSet()));

  const handleTileDrop = (tile) => {
    const updatedTile = { ...tile, isFlipped: false }; // Ensure the tile is face up
    setBoardTiles((prevTiles) => [...prevTiles, updatedTile]);
  };

  const handleTileDrag = (tile) => {
    setTiles((prevTiles) => prevTiles.filter((t) => t.id !== tile.id));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <h1>Domino Drag-and-Drop</h1>
        <div className="game-container">
          <TileContainer tiles={tiles} onTileDrag={handleTileDrag} />
          <DominoBoard tiles={boardTiles} onTileDrop={handleTileDrop} />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;