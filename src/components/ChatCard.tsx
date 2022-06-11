import { useContext, useEffect, useState } from "react";

import { SocketContext } from "../contexts";
import { Chat } from "../models";

interface Props {
  chat: Chat;
  isSelected: boolean;
  selectChat: (id: string) => void;
}

export const ChatCard = ({ chat, isSelected, selectChat }: Props) => {
  const { socket } = useContext(SocketContext);
  const [accumulatedMessages, setAccumulatedMessages] = useState(0);

  useEffect(() => {
    socket.emit("get-current-messages", chat._id, (messages: string[]) => {
      console.log(messages);
    });
  }, [socket, chat._id]);

  useEffect(() => {
    socket.on(chat._id, (message: string) => {
      setAccumulatedMessages((prev) => prev + 1);
      console.log("new message = ", message);
    });
  }, [socket, chat._id]);

  useEffect(() => {
    setAccumulatedMessages(0);
  }, [isSelected]);

  return (
    <div onClick={() => selectChat(chat._id)}>
      <p style={{ color: isSelected ? "greenyellow" : "black" }}>{chat.name}</p>
      <span style={{ color: "red" }}>
        {!isSelected && accumulatedMessages > 0 ? accumulatedMessages : ""}
      </span>
    </div>
  );
};
