import partyCat from '../../assets/cat.webp';

const WinAnim = () => {

  return (
      <div className="absolute h-screen w-screen flex flex-col gap-10 items-center justify-center bg-gray-900">
        <h1 className="text-4xl text-center text-white font-pixel animate-bounce">You Won!</h1>
        <img
          src={partyCat} 
          alt="Party Cat" 
          className="w-auto h-auto"
        />
      </div>
  );
};


export default WinAnim;