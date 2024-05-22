import React, { useState, useEffect } from "react";
import "./App.css";
import dorgaIcon from "./dorgaIcon.png";
import beer from "./beer.png";
import dorDrink from "./dor-drink.gif";
import { Howl } from "howler";
import winSoundFile from "./win-sound.mp3"; // Ensure you have a sound file

const App = () => {
  const [gridSize, setGridSize] = useState(3);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [images, setImages] = useState([]);
  const [fadeOutIndices, setFadeOutIndices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [randomIndex, setRandomIndex] = useState(null);

  const winSound = new Howl({
    src: [winSoundFile],
  });

  useEffect(() => {
    resetGame();
  }, [gridSize]);

  useEffect(() => {
    if (gameOver) {
      winSound.play();
    }
  }, [gameOver]);

  const handleClick = (index) => {
    if (index === randomIndex) {
      setSelectedImageIndex(index);
      setGameOver(true);
    } else {
      setFadeOutIndices((prev) => [...prev, index]);
    }
  };

  const resetGame = () => {
    setLoading(true);
    const newImages = Array.from(
      { length: gridSize * gridSize },
      () => dorgaIcon
    );
    setImages(newImages);
    setFadeOutIndices([]);
    setSelectedImageIndex(null);
    setGameOver(false);
    setRandomIndex(Math.floor(Math.random() * (gridSize * gridSize)));

    setTimeout(() => {
      setLoading(false);
    }, 1500); // Adjust the timeout as needed for the loading animation
  };

  return (
    <div className="App">
      <div className="button-group">
        <button onClick={() => setGridSize(3)}>3x3 Grid</button>
        <button onClick={() => setGridSize(4)}>4x4 Grid</button>
      </div>
      {loading ? (
        <div className="loading">
          <img src={dorgaIcon} alt="Loading" />
        </div>
      ) : (
        <div className={`grid grid-${gridSize}`}>
          {images.map((img, index) => (
            <div
              key={index}
              className={`grid-item ${
                fadeOutIndices.includes(index) ? "fade-out" : ""
              }`}
              onClick={() => handleClick(index)}
              style={{
                animationDelay: `${index * 100}ms`,
                borderRadius: index === randomIndex ? "2px" : "0px",
              }}
            >
              <img
                src={img}
                alt={`Grid ${index}`}
                style={{
                  borderBottomRightRadius:
                    index === randomIndex ? "50px" : "0px",
                }}
              />
            </div>
          ))}
        </div>
      )}
      {gameOver && (
        <div className="modal">
          <img src={dorDrink} alt="Selected" className="loadingAnimation" />
          <img src={beer} alt="Selected" className="beerAnimation" />
          <button onClick={resetGame} className="btnReplay">
            סיבוב נוסף
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
