import { useState } from "react";
import io from 'socket.io-client';
/* const socket = io('https://wgservernodejs.onrender.com'); */
const socket = io('localhost:3000');
import Game from "../Game/Game";

const Room = () => {
  const [roomNumber, setRoomNumber] = useState<number>();
  const [roomChoosed, setRoomChoosed] = useState<boolean>(false);

  const handelRoomSelection = (number : number) => {

    setRoomNumber(number);
    setRoomChoosed(true);
  }


  return (
    <div>
      {!roomChoosed ? (
        <>
          <h1 className='text-xl text-gray-300 font-pixel text-center pt-80'>Choose a Room</h1>
          <div className="flex flex-col gap-10 text-xl text-gray-300 font-pixel text-center pt-10 animate-pulse">
            <div onClick={() => handelRoomSelection(1)}>1</div>
            <div onClick={() => handelRoomSelection(2)}>2</div>
            <div onClick={() => handelRoomSelection(3)}>3</div>
            <div onClick={() => handelRoomSelection(4)}>4</div>
            <div onClick={() => handelRoomSelection(5)}>5</div>
          </div>
        </>
      ) : (
        <>
          <Game roomNumber={roomNumber as number}/>
        </>
      )}
    </div>
  );
}

export default Room;