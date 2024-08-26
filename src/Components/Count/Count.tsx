import { useState, useEffect } from 'react';

const startGame = () => {
  console.log('Game Started!');
  // Add your game logic here
}


// Example usage:
const Countdown = () => {
  const [count, setCount] = useState(3); // Start countdown at 3

  useEffect(() => {
    if (count > 1) {
      const timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);

      return () => clearInterval(timer); // Cleanup interval when component unmounts or `count` changes
    } else if (count === 1) {
      setTimeout(() => {
        startGame()
      }, 1000);
    }

  }, [count, startGame]);

  return (

    <div className='absolute flex justify-center items-center h-screen w-screen bg-gray-900'>
      <div className='animate-bounce text-white text-9xl font-pixel'>{count}</div>         
    </div>
  );
};

export default Countdown;