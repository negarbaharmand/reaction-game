import { useEffect, useState } from "react";

function ReactionGame() {
type GameState = 'idle' | 'waiting' | 'ready' | 'result'  | 'tooEarly';

    const [gameState, setGameState] = useState<GameState>('idle');
    const [startTime, setStartTime] = useState<number|null>(null);
    const [reactionTime, setReactionTime] = useState<number|null>(null);
    const [highScore, setHighScore] = useState<number|null>(null);


    useEffect(() => {
      if (gameState === 'waiting') {
        const delay = Math.random() * 3000 + 2000; //3-5 seconds
        const timer = setTimeout(() => {  
          setStartTime(Date.now());
          setGameState('ready');
        }, delay);
        
        // Cleanup function: cancel timer if component unmounts or state changes
        return () => clearTimeout(timer);
      }
    }, [gameState]);


    const handleClick = () => {
      switch (gameState) {
        case 'idle':
          setGameState('waiting');
          setReactionTime(null);
          break;
        case 'waiting':
          setGameState('tooEarly');
          break;
        case 'ready':
          const reactionTime = Date.now() - (startTime || 0);
          setReactionTime(reactionTime);
          setGameState('result');
          if (highScore == null || reactionTime < highScore) {
            setHighScore(reactionTime);
          }
          break;
        case 'result':
        case 'tooEarly':
          setGameState('idle');
          break;
      }
    };

    //util functions for styling

    const getBackgroundColor = () => {
      switch (gameState) {
        case 'idle':
          return '#3b82f6';  // blue
        case 'waiting':
          return '#ef4444';  // red
        case 'ready':
          return '#22c55e';  // green
        case 'result':
          return '#8b5cf6';  // purple
        case 'tooEarly':
          return '#f97316';  // orange
      }
    };

    const getMessage = () => {
      switch (gameState) {
        case 'idle':
          return '👆 Click to Start';
        case 'waiting':
          return '⏳ Wait for green...';
        case 'ready':
          return '🎯 CLICK NOW!';
        case 'result':

          return (
            <div>
              <div style={{ fontSize: '2.5rem', marginBottom: '20px' }}>⚡</div>
              <div style={{ fontSize: '1.5rem' }}>Your Time: {reactionTime}ms</div>
              {highScore && <div style={{ fontSize: '1.2rem', marginTop: '15px' }}>🏆 Best: {highScore}ms</div>}
              <div style={{ fontSize: '1rem', marginTop: '30px', opacity: 0.8 }}>Click to play again</div>
            </div>
          );
        case 'tooEarly':
          return '❌ Too Early! Click to try again';
      }
    };

  return (
    <div 
      onClick={handleClick}
      style={{
        backgroundColor: getBackgroundColor(),
        color: 'white',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '2rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'background-color 0.3s ease',
        textAlign: 'center',
        padding: '20px'
      }}
    >
      {getMessage()}
    </div>
  )
}

export default ReactionGame