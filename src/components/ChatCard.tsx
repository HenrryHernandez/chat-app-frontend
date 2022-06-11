import { useContext, useEffect } from "react";

import { SocketContext } from "../contexts";
import { Chat } from "../models";

interface Props {
  chat: Chat;
  isSelected: boolean;
  selectChat: (id: string) => void;
}

export const ChatCard = ({ chat, isSelected, selectChat }: Props) => {
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.emit("get-current-messages", chat._id, (messages: any) => {
      console.log(messages);
    });
  }, [socket, chat._id]);

  useEffect(() => {
    socket.on(chat._id, (message: string) => {
      console.log("new message = ", message);
    });
  }, [socket, chat._id]);

  return (
    <div onClick={() => selectChat(chat._id)}>
      <p style={{ color: isSelected ? "greenyellow" : "black" }}>{chat.name}</p>
    </div>
  );
};
