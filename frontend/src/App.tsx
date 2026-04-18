const App = () => {

  
  return (
    <div className="h-dvh bg-black pl-20 pr-20">
      <div className="h-[90dvh]"></div>
      <div className="flex gap-4 items-center justify-center">
        <input
          type="text"
          className="w-[60vw] border border-offwhite rounded-md p-3 
             outline-none transition-all
             focus:border-yellow-light focus:ring-1 focus:ring-yellow-light"
          placeholder="Modern input..."
        />
        <button className="bg-offwhite p-3 w-[10vw] text-xl font-bold rounded-md cursor-pointer hover:bg-yellow-light transition-all duration-600">
          Send
        </button>
      </div>
    </div>
  );
};

export default App;
