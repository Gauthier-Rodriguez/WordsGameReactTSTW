import { useEffect, useState } from "react";
import Game from "../Game/Game";

interface RoomProps  {
  userName: string;
}

const Room = ({userName} : RoomProps) => {
  const [roomNumber, setRoomNumber] = useState<number>();
  const [roomChoosed, setRoomChoosed] = useState<boolean>(false);
  const [rooms, setRooms] = useState<number[]>([]);

  const handelRoomSelection = (room : number) => {

    setRoomNumber(room);
    setRoomChoosed(true);
    joinRoom(room);
  }

  const availableRooms = async () => {
    const url = 'https://wgservernodejs.onrender.com/rooms/available';
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const rooms = await response.json();
      setRooms(rooms);

    } catch (error) {
      console.error('Error fetching the room:', error);
    }
  };

  const joinRoom = async (roomNumber : number) => {
    const url = `https://wgservernodejs.onrender.com/rooms/join/${roomNumber}`;
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
      console.error('Error joining the room:', error);
    }
  }

  
  useEffect(() => {
    availableRooms();
  }
  ,[]);


  return (
    <div>
      {!roomChoosed ? (
        <>
          <h1 className='text-xl text-gray-300 font-pixel text-center pt-80'>Choose a Room</h1>
          <div className="flex flex-col gap-10 text-xl text-gray-300 font-pixel text-center pt-10 animate-pulse">
            {rooms.map((room) => {
              return <button onClick={() => handelRoomSelection(room)}>{room}</button>
            })}
            
          </div>
        </>
      ) : (
        <>
          <Game roomNumber={roomNumber as number} userName={userName as string}/>
        </>
      )}
    </div>
  );
}

export default Room;