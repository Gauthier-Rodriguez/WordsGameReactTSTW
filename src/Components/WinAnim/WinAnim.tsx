import partyCat from '../../assets/cat.webp';

const WinAnim = () => {

  return (
      <div className="absolute h-screen w-screen flex flex-col items-center bg-gray-900">
        <h1 className="text-4xl text-center text-white font-pixel p-20 animate-bounce">You Win!</h1>
        <img
          src={partyCat} 
          alt="Party Cat" 
          className="w-full max-w-md mx-auto"
        />
      </div>
  );
};


export default WinAnim;