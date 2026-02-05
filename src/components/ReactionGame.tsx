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

    const getLightStates = () => {
      switch (gameState) {
        case 'idle':
          return { red: false, yellow: false, green: false };
        case 'waiting':
          return { red: true, yellow: false, green: false };
        case 'ready':
          return { red: false, yellow: false, green: true };
        case 'result':
          return { red: false, yellow: true, green: false };
        case 'tooEarly':
          return { red: true, yellow: false, green: false };
        default:
          return { red: false, yellow: false, green: false };
      }
    };

    const getTopMessage = () => {
      switch (gameState) {
        case 'idle':
          return 'Click to Start';
        case 'waiting':
          return 'Wait for green light...';
        case 'ready':
          return 'CLICK NOW!';
        case 'result':
          return 'Result';
        case 'tooEarly':
          return 'Too Early!';
      }
    };

    const getBottomMessage = () => {
      if (gameState === 'result') {
        return (
          <div>
            <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>⚡ {reactionTime}ms</div>
            {highScore && <div style={{ fontSize: '1.2rem' }}>🏆 Best: {highScore}ms</div>}
          </div>
        );
      }
      return null;
    };

  const lights = getLightStates();

  return (
    <div 
      onClick={handleClick}
      style={{
        backgroundColor: '#1e293b',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      {/* Top Message */}
      <div style={{
        color: 'white',
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: '40px',
        textAlign: 'center'
      }}>
        {getTopMessage()}
      </div>

      {/* Traffic Light Housing */}
      <div style={{
        backgroundColor: '#0f172a',
        borderRadius: '30px',
        padding: '30px 50px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
        border: '4px solid #334155'
      }}>
        {/* Red Light */}
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          backgroundColor: lights.red ? '#ef4444' : '#450a0a',
          marginBottom: '25px',
          transition: 'all 0.3s ease',
          boxShadow: lights.red ? '0 0 40px #ef4444, 0 0 80px #ef4444' : 'inset 0 4px 10px rgba(0,0,0,0.5)',
          border: '3px solid #1e293b'
        }} />

        {/* Yellow Light */}
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          backgroundColor: lights.yellow ? '#fbbf24' : '#451a03',
          marginBottom: '25px',
          transition: 'all 0.3s ease',
          boxShadow: lights.yellow ? '0 0 40px #fbbf24, 0 0 80px #fbbf24' : 'inset 0 4px 10px rgba(0,0,0,0.5)',
          border: '3px solid #1e293b'
        }} />

        {/* Green Light */}
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          backgroundColor: lights.green ? '#22c55e' : '#052e16',
          transition: 'all 0.3s ease',
          boxShadow: lights.green ? '0 0 40px #22c55e, 0 0 80px #22c55e' : 'inset 0 4px 10px rgba(0,0,0,0.5)',
          border: '3px solid #1e293b'
        }} />
      </div>

      {/* Bottom Message/Results */}
      <div style={{
        color: 'white',
        fontSize: '1.5rem',
        marginTop: '40px',
        textAlign: 'center',
        minHeight: '80px'
      }}>
        {getBottomMessage()}
      </div>
    </div>
  )
}

export default ReactionGame