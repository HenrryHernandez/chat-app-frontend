import { useContext, useEffect, useRef, useState } from "react";
import { Badge } from "@mui/material";
import { Group } from "@mui/icons-material";

import { SocketContext } from "../contexts";
import { Chat, Message } from "../models";

interface Props {
  chat: Chat;
  isSelected: boolean;
  selectChat: (id: string) => void;
  addMessage: (message: Message) => void;
  selectMessages: (messages: Message[]) => void;
}

export const ChatCard = ({
  chat,
  isSelected,
  selectChat,
  addMessage,
  selectMessages,
}: Props) => {
  const chatSocket = useRef<any>();
  const { socket } = useContext(SocketContext);
  const [accumulatedMessages, setAccumulatedMessages] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.emit("get-current-messages", chat._id, (messages: Message[]) => {
      setMessages(messages);
    });
  }, [socket, chat._id]);

  useEffect(() => {
    chatSocket.current = socket.on(chat._id, (message: Message) => {
      setAccumulatedMessages((prev) => prev + 1);
      setMessages((prev) => [...prev, message]);
      addMessage(message);
    });

    return () => {
      chatSocket.current?.off();
    };
  }, [socket, chat._id, addMessage]);

  useEffect(() => {
    if (isSelected) selectMessages(messages);
  }, [isSelected, selectMessages, messages]);

  useEffect(() => {
    setAccumulatedMessages(0);
  }, [isSelected]);

  return (
    <div
      className="chat-card"
      style={{ backgroundColor: isSelected ? "rgb(224, 224, 224)" : "" }}
      onClick={() => selectChat(chat._id)}
    >
      <div className="information__name">
        <Group />
        <p>{chat.name}</p>
      </div>
      <div className="chat-card__accumulated-messages">
        {!isSelected && accumulatedMessages > 0 ? (
          <Badge color="error" badgeContent={accumulatedMessages} showZero />
        ) : null}
      </div>
    </div>
  );
};
