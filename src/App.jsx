import { useState, useRef } from 'react';
import './App.css'; 

export default function App() {
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [status, setStatus] = useState('Game');
  const [board, setBoard] = useState(
    [null, null, null, null, null, null, null, null, null]
  )
  const result = useRef(null)

  const onSquareClick = (index) => {
    if (!board[index] && status === 'Game') {
      const newBoard = board.slice();
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X'); 
      calculateWinner(newBoard) 
    } else {
      return 
    }
  }

  const calculateWinner = (newBoard) => {
    if (
      (newBoard[0] === 'X' && newBoard[1] === 'X' && newBoard[2] === 'X') 
      || (newBoard[3] === 'X' && newBoard[4] === 'X' && newBoard[5] === 'X')
      || (newBoard[6] === 'X' && newBoard[7] === 'X' && newBoard[8] === 'X')
      || (newBoard[0] === 'X' && newBoard[3] === 'X' && newBoard[6] === 'X')
      || (newBoard[1] === 'X' && newBoard[4] === 'X' && newBoard[7] === 'X')
      || (newBoard[2] === 'X' && newBoard[5] === 'X' && newBoard[8] === 'X')
      || (newBoard[0] === 'X' && newBoard[4] === 'X' && newBoard[8] === 'X')
      || (newBoard[2] === 'X' && newBoard[4] === 'X' && newBoard[6] === 'X')
    ) {
      result.current.innerText = 'Winner: X';
      setStatus('Winner: x')
    } else if (
      (newBoard[0] === 'O' && newBoard[1] === 'O' && newBoard[2] === 'O') 
      || (newBoard[3] === 'O' && newBoard[4] === 'O' && newBoard[5] === 'O')
      || (newBoard[6] === 'O' && newBoard[7] === 'O' && newBoard[8] === 'O')
      || (newBoard[0] === 'O' && newBoard[3] === 'O' && newBoard[6] === 'O')
      || (newBoard[1] === 'O' && newBoard[4] === 'O' && newBoard[7] === 'O')
      || (newBoard[2] === 'O' && newBoard[5] === 'O' && newBoard[8] === 'O')
      || (newBoard[0] === 'O' && newBoard[4] === 'O' && newBoard[8] === 'O')
      || (newBoard[2] === 'O' && newBoard[4] === 'O' && newBoard[6] === 'O')
    ) {
      result.current.innerText = 'Winner: O';
      setStatus('Winner: o')
    } else if (newBoard.every(square => square)) { 
      result.current.innerText = "It's a Draw!";  
      setStatus('Draw')  
    }
  }

  const reset = () => {
    setBoard([null, null, null, null, null, null, null, null, null]); 
    setStatus('Game'); 
    setCurrentPlayer('X');
    result.current.innerText = '';
  }

  return (
    <>
      <h1>Tic-Tac-Toe</h1>
      <p ref={result} className='result'></p>
      <div className='btns'>
        {board.map(( btn, index ) => (  
          <button 
            className='square' 
            key={index}
            onClick={() => onSquareClick(index)} 
          >{board[index]}</button>
        ))}
      </div>
      <div className='reset-cont'>
        <button onClick={reset} className='reset-btn' id='reset' >Reset Game</button>
      </div>
    </>
  )
}