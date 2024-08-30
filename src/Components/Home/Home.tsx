import { useState } from 'react';
import Room from '../Room/Room';


const Home = () => {
  const [userName, setUserName] = useState<string>('');
  const [nameChoosed, setNameChoosed] = useState<boolean>(false);
  const [wantToPlay, setWantToPlay] = useState<boolean>(false);
  const [dontWantToPlay, setDontWantToPlay] = useState<boolean>(false);

  const handelUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  } 
  const handelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNameChoosed(true);
  }
  const handelPlay = () => {
    if (dontWantToPlay) {
      setTimeout(() => {
      setNameChoosed(false)
      setDontWantToPlay(false)
      setUserName('')
    }, 3000);

        return (
          <div className='absolute h-screen w-screen bg-gray-900'>
            <div className='flex flex-col items-center'>
              <div className='fixed top-1/3'>
                <h1 className='text-xl text-gray-300 font-pixel text-center top-0'>Goodbye {userName}</h1>
              </div>
              <div className='fixed top-1/2'>
                <p className='text-l text-gray-300 font-pixel text-center'>With all due respect</p>
                <h1 className='text-xl text-gray-300 font-pixel text-center pt-6'>YOU SUCK LOSER!</h1>
              </div>
            </div>
          </div>
        )
    }
  }



    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className='h-10 text-5xl text-gray-200 pt-6 px-5 font-pixel text-center fixed top-10'>Guess My Word</h1>
        {!nameChoosed ? (
        <form className='flex flex-col items-center' onSubmit={(e) => handelSubmit(e)}>
          <h1 className='text-sm text-gray-500 font-pixel text-center'>Choose your name</h1>
          <input type="text"
                value={userName} 
                placeholder="Your Name" 
                className="fixed bottom-5 bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:gray-500 font-pixel" required
                onChange={(e) => {handelUserName(e);}}
          />

          </form>
        ):(
          <>
            {!wantToPlay ? (
              <div className='pt-10 flex flex-col items-center'>
                <h1 className='text-xl text-gray-300 font-pixel text-center'>Hello {userName}</h1>
                <p className='text-l text-gray-300 font-pixel text-center pt-24'>Do you want to play a little game?</p>
                <span className='text-l text-gray-300 font-pixel pt-10 animate-pulse'>
                  <button onClick={() => setWantToPlay(true)}>Y</button> / <button onClick={() => {setDontWantToPlay(true)}}>n</button> ?
                </span>
              </div>
            ):(
              <>
                <Room userName={userName as string}/>
              </>
            )}
          </>
          )
        }
        {handelPlay()}
      </div>
    )

}

export default Home