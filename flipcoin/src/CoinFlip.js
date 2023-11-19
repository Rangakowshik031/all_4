// CoinFlip.js
import React, { useState } from 'react';
import './CoinFlip.css';
import headImage from './images/head.jpg';
import tailImage from './images/tail.jpg';
const CoinFlip = () => {
  const [result, setResult] = useState(null);

  const flipCoin = () => {
    const randomNum = Math.floor(Math.random() * 2);
    const newResult = randomNum === 0 ? 'Heads' : 'Tails';
    setResult(newResult);
  };
  return(
    <div className="coin-container">
  <h1>Coin Flip</h1>
  <button onClick={flipCoin}>Flip Coin</button>
  {result && (
    <div className="coin-result">
      <p>Result: {result}</p>
      <img
        src={result === 'Heads' ? headImage : tailImage}
        alt={result}
        className="coin-image"
      />
    </div>
  )}
</div>
  )
}
export default CoinFlip;