import React, { useState } from 'react';
import './styles.css';

function App() {
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [answer, setAnswer] = useState(Math.floor(Math.random() * 100) + 1);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const handleChange = e => {
    setGuess(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newGuesses = [...guesses, guess];
    setGuesses(newGuesses);

    const difference = Math.abs(guess - answer);

    if (difference === 0) {
      setMessage('You win!');
      setGameOver(true);
    } else if (difference <= 5) {
      setMessage('Very hot!');
    } else if (difference <= 10) {
      setMessage('Hot');
    } else if (difference <= 20) {
      setMessage('Warm');
    } else if (difference <= 30) {
      setMessage('Cold');
    } else {
      setMessage('Very cold');
    }

    if (newGuesses.length === 10) {
      setMessage(`You lose. The correct answer was ${answer}.`);
      setGameOver(true);
    }

    setGuess('');
  };

  const resetGame = () => {
    setGuess('');
    setGuesses([]);
    setAnswer(Math.floor(Math.random() * 100) + 1);
    setMessage('');
    setGameOver(false);
  };

  return (
    <div>
      <h1>Number Guessing Game</h1>
      <form onSubmit={handleSubmit}>
        <input type="number" min="1" max="100" value={guess} onChange={handleChange} required />
        <button type="submit">Guess</button>
      </form>
      {message && <p>{message}</p>}
      {gameOver && (
        <div>
          <p>Game over. Play again?</p>
          <button onClick={resetGame}>Yes</button>
        </div>
      )}
      <h2>Guesses:</h2>
      <ul>
        {guesses.map((guess, index) => (
          <li key={index}>{guess}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
