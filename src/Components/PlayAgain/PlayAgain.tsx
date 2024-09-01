import { Dispatch, SetStateAction, useState } from "react";

interface PlayAgainProps {
  roomNumber: number;
  userName: string;
  togglePlay: Dispatch<SetStateAction<boolean>>;
}

export const leaveRoom = async (roomNumber : number, userName : string) => {
  const url = `https://wgservernodejs.onrender.com/rooms/leave/${roomNumber}`;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name : userName}),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
  catch (error) {
    console.error('Error leaving the room:', error);
  }
}

const PlayAgain = ({roomNumber, userName, togglePlay} : PlayAgainProps) => {
  const [dontWantToPlay, setDontWantToPlay] = useState<boolean>(false);

  const handlePlayAgain = (e: React.MouseEvent<HTMLButtonElement>) => {
    const response = e.currentTarget.value;
    if(response === 'Yes'){
      togglePlay(false);
    }
    else{
      leaveRoom(roomNumber, userName);
      setDontWantToPlay(true);
      setTimeout(() => {
        window.location.reload();}, 3000);
      }
  }

  return (
      <div className="absolute h-screen w-screen bg-gray-900 flex items-center justify-center">
        {dontWantToPlay ? (
          <div className="flex flex-col items-center justify-center gap-2">
              <h1 className="text-5xl text-gray-300 font-pixel text-center">Goodbye {userName}</h1>
              <h2 className="text-5xl text-gray-300 font-pixel text-center">See You later</h2>
              <h3 className="text-4xl text-gray-300 font-pixel text-center">Aligator</h3>
              <h4 className="text-3xl text-gray-300 font-pixel text-center"> I'm Sorry</h4>
              <h5 className="text-2xl text-gray-300 font-pixel text-center">You Suck</h5>
              <h6 className="text-xl text-gray-300 font-pixel text-center">I Hate You</h6>
              <h6 className="text-base text-gray-300 font-pixel text-center">No I Dont</h6>
              <h6 className="text-sm text-gray-300 font-pixel text-center">I'm Sorry</h6>
              <h6 className="text-xs text-gray-300 font-pixel text-center">I Love You {userName}</h6>
              <h6 className="text-2xs text-gray-300 font-pixel text-center">Please Come Back</h6>


          </div>
        ) : (
          <div className="flex flex-col gap-10">
            <h1 className="text-4xl text-center text-white font-pixel ">Wanna Play Again ?</h1>
            <span className="text-4xl text-center text-white font-pixel animate-pulse">
              <button value="Yes" onClick={(e) => handlePlayAgain(e)}>Y</button> / <button value="No" onClick={(e) => handlePlayAgain(e)}>n</button> ?
            </span>
          </div>
        )}
          
        
      </div>
  );
};

export default PlayAgain;