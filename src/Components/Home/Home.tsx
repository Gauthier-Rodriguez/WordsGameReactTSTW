import { useState } from 'react';
import Game from '../Game/Game';
import NewGame from '../NewGame/NewGame';


const Home = () => {
  const [game, setGame] = useState<boolean>(false);


  return (
    
    <div className="h-screen flex flex-col items-center ">
      {game ? <Game /> :
      <>
      <h1 className='h-10 text-5xl text-gray-200 pt-6 font-pixel text-center'>Guess My Word</h1>
      <NewGame setGame={setGame} />
      </>
      }
      
    </div>
  )

}

export default Home