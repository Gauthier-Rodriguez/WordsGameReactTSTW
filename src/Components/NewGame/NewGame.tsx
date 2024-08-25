

type NewGameProps = {
  setGame: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewGame = ({ setGame }: NewGameProps) => {

  return (
    <>
      <div className="h-screen flex items-center justify-center">

          <button
            onClick={() => {setGame(true)}}
            className="py-2.5 px-5 me-2 mb-2 text-3xl font-pixel text-gray-900 active:scale-90 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            NEW GAME
          </button>

      </div> 
    </>
  );
};

export default NewGame;