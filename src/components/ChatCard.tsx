import { useContext, useEffect, useRef, useState } from "react";

import { SocketContext } from "../contexts";
import { Chat, Message } from "../models";

interface Props {
  chat: Chat;
  isSelected: boolean;
  selectChat: (id: string) => void;
}

export const ChatCard = ({ chat, isSelected, selectChat }: Props) => {
  const chatSocket = useRef<any>();
  const { socket } = useContext(SocketContext);
  const [accumulatedMessages, setAccumulatedMessages] = useState(0);

  useEffect(() => {
    socket.emit("get-current-messages", chat._id, (messages: Message[]) => {});
  }, [socket, chat._id]);

  useEffect(() => {
    chatSocket.current = socket.on(chat._id, (message: Message) => {
      console.log("new message to ", chat._id);
      setAccumulatedMessages((prev) => prev + 1);
    });

    return () => {
      chatSocket.current?.off();
    };
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
