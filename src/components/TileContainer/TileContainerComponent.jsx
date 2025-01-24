import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import DominoTile from '../DominoTile/DominoTileComponent';
import './TileContainer.css';

function TileContainer({ tiles, onTileDrag }) {
  return (
    <div className="tile-container">
      <h2>Your Tiles</h2>
      <div className="tiles">
        {tiles.map((tile) => (
          <DraggableTile
            key={tile.id}
            tile={tile}
            onDrag={onTileDrag} // Pass the onDrag function
          />
        ))}
      </div>
    </div>
  );
}

function DraggableTile({ tile, onDrag }) {
  const [isFlipped, setIsFlipped] = useState(true); // Tile starts flipped by default

  const handleFlip = (flipped) => {
    setIsFlipped(flipped); // Update the flip state
  };

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "domino",
    item: tile,
    canDrag: () => {
      return !isFlipped; // Only allow dragging if the tile is face up
    },
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        onDrag(item);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [isFlipped]); // Ensure the hook reruns when isFlipped state changes

  return (
    <div
      ref={dragRef} // Ensure the ref is applied here
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="draggable-tile"
    >
      <DominoTile
        left={tile.left}
        right={tile.right}
        flip={isFlipped} // Pass the isFlipped state
        onFlip={handleFlip} // Pass the flip handler
      />
    </div>
  );
}

export default TileContainer;