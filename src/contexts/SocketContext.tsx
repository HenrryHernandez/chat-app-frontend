import { createContext } from "react";

import { useSocket } from "../hooks";

export const SocketContext = createContext({} as any);

export const SocketProvider = ({ children }: any) => {
  const { socket, online } = useSocket("http://localhost:8000");

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
