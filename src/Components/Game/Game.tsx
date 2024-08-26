import io from 'socket.io-client';
const socket = io('https://wgservernodejs.onrender.com');
import { useEffect } from 'react';
import { useState } from 'react';
import Count from '../Count/Count';
import WinAnim from '../WinAnim/WinAnim';
import { useRef } from 'react';


const Game = () => {
  const [word, setWord] = useState('');
  const [p2word, setP2word] = useState<string[]>([]);
  const [p2wordToDisplay, setp2wordToDisplay] = useState<string[]>([]);
  const [p1word, setP1word] = useState<string[]>([]);
  const [winner, setWinner] = useState(true);
  const [gameWon, setGameWon] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const compareWords = (word1: string, word2: string) => {

    if (word1.toUpperCase() === word2.toUpperCase()) {
      return true;
    }
    return false;
  }
  const deleteSpace = (word: string) => {
    let newWord = word;
    while (newWord.charAt(newWord.length - 1) === ' ') {
      newWord = newWord.slice(0, newWord.length - 1);
    }
    return newWord;
  }
  
  const errorAlert = (code : string) => {
    if (code === 'wait') {
      setErrorMessage('Wait for your opponent');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
    }
  }

  const submitWord = (e : React.FormEvent) => {
    e.preventDefault();
    if ( p1word.length <= p2word.length) {
      socket.emit('word', word);
      if(p1word.length > 0){
        setP1word((prev) => [...prev, word]);
      }
      else{
        setP1word([word]);
      }
      setWord('');
    }
    else {
      errorAlert('wait');
      setWord('');
    }
  }

  const startCountdown = () => {  
    if(!winner){
      setTimeout(() => {
        setWinner(true);
        if(inputRef.current){
          inputRef.current.focus();
        }
      }, 3000);
      if(inputRef.current) {
        inputRef.current.blur();
      }
      return <Count/>;

    }
    return null;
  };
  
  const setWinAnim = () => {
    if(gameWon) {
      setTimeout(() => {
        window.location.reload();
      }, 5000);
      return <WinAnim/>
    }
    return null;
  }

    const handleGameLogic = () => {
      if (p1word.length > 0 && p2word.length > 0 && p1word.length === p2word.length) {
        if (compareWords(deleteSpace(p2word[p2word.length-1]), deleteSpace(p1word[p1word.length - 1]))) {
          if (inputRef.current) {
            inputRef.current.blur();
          }
          setGameWon(true);
          
        } else {
          setp2wordToDisplay(p2word);
          setWinner(false);
        }
      }
    };
    useEffect(() => {
      console.log(gameWon);
      WinAnim();
    }, [gameWon]);

    useEffect(() => {
      startCountdown();
    }, [winner]);

    useEffect(() => {
      handleGameLogic();
    }, [p1word, p2word]);
    

  useEffect(() => {
    socket.on('p2_word', (word) => {
      setP2word((prev) => [...prev, word]);
    });
  }, [socket]);

    return (
    
      <>
         
          <div className='flex flex-col justify-around h-4/6 font-pixel'> 
            
            <div className='w-screen flex justify-center gap-10 text-gray-200 fixed inset-x-0 bottom-1/3'>
              <div className='w-6/12 pl-5'>
                <h1 className='text-4xl text-center'> You </h1>
                <ul className='text-xs mt-6 text-left'>
                {p2wordToDisplay[p2wordToDisplay.length - 1] && <li>{p2wordToDisplay[p2wordToDisplay.length - 1]}</li>}
                </ul>
              </div>

              <div className='w-6/12 pr-5'>
                <h1 className='text-4xl text-center'> Me </h1>
                <ul className='text-xs mt-6 text-right'>
                  {p1word[p1word.length - 1] && <li>{p1word[p1word.length - 1]}</li>}
                </ul>
              </div>
            </div>

            <form className='flex flex-col items-center gap-5'>
              <input type="text"
              ref={inputRef} 
              value={word} 
              placeholder="My word..." 
              className="fixed bottom-5 bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:gray-500" required
              onChange={(e) => {
                setWord(e.target.value);
              }}/>

              <button className="hidden py-2.5 px-5 me-2 mb-2 text-2xl font-medium text-gray-900 active:scale-90 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
               onClick={(e) => {submitWord(e)}}
               type="submit">
                Submit
              </button>
            </form>
          
          </div>
          {errorMessage != '' && 
            <div className='absolute flex justify-center items-end h-screen w-screen bg-gray-900'>
              <h1 className='text-white text-center text-xl font-pixel py-32'>{errorMessage}</h1>
            </div>}
          
          
          {startCountdown()}
          {setWinAnim()}
          
          
      </>  
    )
   
}

export default Game