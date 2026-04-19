import { useRef } from "react";
import { useSocket } from "./hooks/useSocket";

const App = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { socket, isConnected, messages } = useSocket("ws://localhost:8000");

  function sendMessage() {
    const input = inputRef.current;
    if (input && socket?.readyState === WebSocket.OPEN) {
      const message = input.value;

      if (message.trim() !== "") {
        socket.send(
          JSON.stringify({
            type: "chat",
            payload: { message },
          })
        );
        input.value = "";
      }
    }
  }

  return (
    <div className="h-dvh bg-black pl-20 pr-20">
      {/* curr wss status */}
      <div className="text-md text-offwhite p-10">
        Status: {isConnected ? "🟢 Connected" : "🔴 Disconnected"}
      </div>

      {/* all the messages */}
      <div className="h-[75dvh] text-offwhite overflow-y-auto pl-25 pr-25 ">
        {messages.length > 0 ? (
          <div className="p-4 bg-black m-4 flex flex-col items-end gap-3 ">
            {messages.map((message, index) => (
              <span
                key={index}
                className="bg-offwhite text-black p-3 text-center rounded-md"
              >
                {message}
              </span>
            ))}
          </div>
        ) : (
          <div className="text-yellow-light text-2xl flex items-center justify-center relative w-full h-full">
            <h1>There are no chat messages currently</h1>
          </div>
        )}
      </div>

      {/* message input feild */}
      <div className="flex gap-4 items-center justify-center">
        <input
          type="text"
          ref={inputRef}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="w-[60vw] border border-offwhite text-offwhite rounded-md p-3 
             outline-none transition-all
             focus:border-yellow-light focus:ring-1 focus:ring-yellow-light"
          placeholder="Chat here..."
        />

        {/* send button */}
        <button
          className="bg-offwhite p-3 w-[10vw] text-xl font-bold rounded-md cursor-pointer hover:bg-yellow-light transition-all duration-600"
          onClick={() => {sendMessage()}}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default App;
