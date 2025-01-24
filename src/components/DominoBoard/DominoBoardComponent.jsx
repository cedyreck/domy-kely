import React from 'react';
import { useDrop } from 'react-dnd';
import DominoTile from '../DominoTile/DominoTileComponent';
import './DominoBoard.css';

function DominoBoard({ tiles, onTileDrop }) {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "domino",
    drop: (tile) => onTileDrop(tile),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={dropRef} className={`board ${isOver ? "over" : ""}`}>
      {tiles.map((tile) => (
        <DominoTile
          key={tile.id}
          left={tile.left}
          right={tile.right}
          flip={tile.isFlipped} // Use the isFlipped property from the tile
        />
      ))}
    </div>
  );
};

export default DominoBoard;