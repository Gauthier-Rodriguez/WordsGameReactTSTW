import { useState, useEffect } from 'react';
import Messages from '../../assets/Obj/Messages.json';



// Example usage:
const Countdown = () => {
  const [count, setCount] = useState(3); // Start countdown at 3
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (count > 1) {
      const timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);

      return () => clearInterval(timer); // Cleanup interval when component unmounts or `count` changes
    } else if (count === 1) {
      
    }

  }, [count]);

  useEffect(() => {
    messageGenerator();

  }
  ,[]);

  const messageGenerator = () => {
    const randomNum = Math.floor(Math.random() * 20)+1;
    const result = Messages.find((msg : { id: number; msg: string }) => msg.id === randomNum);
    if(result){
      +setMessage(result.msg)

    }
  }
    

  return (

    <div className='absolute h-screen w-screen bg-gray-900 flex items-center justify-center'>
      <div className='flex flex-col gap-32 items-center'>
        <div className='text-white text-center text-sm font-pixel'>{message}</div>
        <div className='animate-bounce text-white text-9xl font-pixel'>{count}</div>
      </div>
    </div>
  );
};

export default Countdown;