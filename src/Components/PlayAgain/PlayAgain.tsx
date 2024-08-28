import React, { Dispatch, SetStateAction } from "react";


interface PlayAgainProps {
  roomNumber: number;
  userName: string;
  togglePlay: Dispatch<SetStateAction<boolean>>;
}

const PlayAgain = ({roomNumber, userName, togglePlay} : PlayAgainProps) => {

  const leaveRoom = async (roomNumber : number) => {
    const url = `https://wgservernodejs.onrender.com/rooms/leave/${roomNumber}`;
    console.log('roomNumber:', roomNumber);
    console.log('userName:', userName);
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

  const handlePlayAgain = (e: React.MouseEvent<HTMLButtonElement>) => {
    const response = e.currentTarget.value;
    if(response === 'Yes'){
      togglePlay(false);
     
    }
    else{
      leaveRoom(roomNumber);
      setTimeout(() => {
        window.location.reload();}, 1000);
    }
  }

  return (
      <div className="absolute top-20 left-0 h-screen w-screen flex flex-col items-center bg-gray-900">
        <h1 className="text-4xl text-center text-white font-pixel pt-52 ">Wanna Play Again ?</h1>
        <span className="text-4xl text-center text-white font-pixel pt-52 animate-pulse">
          <button value="Yes" onClick={(e) => handlePlayAgain(e)}>Y</button> / <button value="No" onClick={(e) => handlePlayAgain(e)}>n</button> ?
        </span>
      </div>
  );
};

export default PlayAgain;