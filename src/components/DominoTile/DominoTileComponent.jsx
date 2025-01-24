import React, { useState } from "react";
import "./DominoTile.css"; 

function DominoTile({ left, right, flip = true, onFlip }) {


  const handleClick = () => {
    if (!flip) return; // Only allow flipping if the tile is face down
    const newFlippedState = !flip; // Calculate the new flipped state
    onFlip(newFlippedState); // Notify parent component about the flip state
    console.log(`Tile flipped, new state: ${newFlippedState}`); // Debugging
  };

  return (
    <div
      className={`tile ${flip ? "flipped" : ""}`}
      onClick={handleClick}
    >
      <div className="half top-half">{renderDots(left)}</div>
      <div className="half bottom-half">{renderDots(right)}</div>
    </div>
  );
}


function renderDots(number) {
  const positions = {
    0: [],
    1: [5],
    2: [1, 9],
    3: [1, 5, 9],
    4: [1, 3, 7, 9],
    5: [1, 3, 5, 7, 9],
    6: [1, 3, 4, 6, 7, 9],
  };

  return (
    <div className="dots-container">
      {Array.from({ length: 9 }, (_, i) => (
        <div
          key={i}
          className={`dot ${positions[number].includes(i + 1) ? "visible" : ""}`}
        ></div>
      ))}
    </div>
  );
}

export default DominoTile;