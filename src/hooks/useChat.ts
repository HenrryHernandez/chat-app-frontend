import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SocketContext } from "../contexts";
import { useDebouncer, useRequestAndLoad } from "../hooks";
import { AppStore, Chat, Message } from "../models";
import { removeChat } from "../redux/states";
import { exitChat, getChats } from "../services";

export const useChat = () => {
  const dispatch = useDispatch();
  const { socket } = useContext(SocketContext);
  const { chats: userChats, _id: userId } = useSelector(
    (state: AppStore) => state.user
  );
  const { makeCallRequest, loading } = useRequestAndLoad();
  const [searchText, setSearchText] = useState("");
  const { debouncedText } = useDebouncer(searchText);

  const [chats, setChats] = useState<Chat[]>();
  const [selectedChat, setSelectedChat] = useState<Chat | null>(userChats[0]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const leaveGroup = async () => {
    if (!selectedChat) return;

    try {
      await makeCallRequest(exitChat(userId, selectedChat._id));
      dispatch(removeChat(selectedChat._id));
      setSelectedChat(null);
    } catch (error) {
      console.log(error);
    }
  };

  const selectChat = (id: string) => {
    const chat = userChats.find((chat) => chat._id === id);

    if (!chat) return;

    setSelectedChat(chat);
  };

  const selectMessages = (messages: Message[]) => {
    setMessages(messages);
  };

  const sendMessage = () => {
    if (!message.trim().length) return;

    socket.emit("set-new-message", selectedChat?._id, message);

    setMessage("");
  };

  useEffect(() => {
    setMessages([]);
  }, [selectedChat]);

  useEffect(() => {
    if (debouncedText.trim().length === 0) {
      setChats([]);
      return;
    }

    makeCallRequest(getChats(debouncedText))
      .then(({ data }) => setChats(data.chats))
      .catch((error) => console.log(error));
  }, [debouncedText, makeCallRequest]);

  return {
    loading,
    selectedChat,
    messages,
    message,
    setMessage,
    searchText,
    setSearchText,
    chats,
    addMessage,
    leaveGroup,
    selectChat,
    selectMessages,
    sendMessage,
  };
};
