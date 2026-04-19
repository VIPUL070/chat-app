// useSocket.tsx
import { useEffect, useRef, useState } from "react";

export const useSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let cancelled = false; // ← tracks if this effect instance was cleaned up
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      if (cancelled) {
        ws.close();
        return;
      } // ← stale effect, don't use this socket
      setSocket(ws);
      setIsConnected(true);
      ws.send(
        JSON.stringify({
          type: "join",
          payload: { roomId: "red" },
        })
      );
    };

    ws.onmessage = (event) => {
      if (cancelled) return;
      try {
        const data = JSON.parse(event.data);
        const msgText = data.payload?.message || event.data;
        setMessages((prev) => [...prev, msgText]);
      } catch {
        setMessages((prev) => [...prev, event.data]);
      }
    };

    ws.onclose = () => {
      if (cancelled) return;
      setSocket(null);
      setIsConnected(false);
    };

    return () => {
      cancelled = true;
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CLOSING) {
        ws.close();
      }
    };
  }, [url]);

  return { socket, isConnected, messages };
};
