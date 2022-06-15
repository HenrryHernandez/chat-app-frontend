import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AccountCircle, Group } from "@mui/icons-material";

import { ChatCard, InputText, SearchedChatCard } from "../components";
import { SocketContext } from "../contexts";
import { useDebouncer, useRequestAndLoad } from "../hooks";
import { AppStore, Chat, Message } from "../models";
import { logoutAction, removeChat, removeUserAction } from "../redux/states";
import { exitChat, getChats } from "../services";

export const Main = () => {
  const { socket } = useContext(SocketContext);
  const {
    username,
    chats: userChats,
    _id: userId,
  } = useSelector((state: AppStore) => state.user);
  const dispatch = useDispatch();
  const { makeCallRequest, loading } = useRequestAndLoad();
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [showChatOptions, setShowChatOptions] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [chats, setChats] = useState<Chat[]>();
  const [selectedChat, setSelectedChat] = useState<Chat | null>(userChats[0]);
  const [searchText, setSearchText] = useState("");
  const { debouncedText } = useDebouncer(searchText);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const logout = () => {
    dispatch(logoutAction());
    dispatch(removeUserAction());

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  const toggleUserOptions = () => {
    setShowUserOptions((prev) => !prev);
  };

  const toggleChatOptions = () => {
    setShowChatOptions((prev) => !prev);
  };

  const toggleSearchBar = () => {
    setShowSearchBar((prev) => !prev);
    setSearchText("");
  };

  const selectChat = (id: string) => {
    const chat = userChats.find((chat) => chat._id === id);

    if (!chat) return;

    setSelectedChat(chat);
  };

  const sendMessage = () => {
    if (!message.trim().length) return;

    socket.emit("set-new-message", selectedChat?._id, message);
  };

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const selectMessages = (messages: Message[]) => {
    setMessages(messages);
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

  useEffect(() => {
    if (debouncedText.trim().length === 0) {
      setChats([]);
      return;
    }

    makeCallRequest(getChats(debouncedText))
      .then(({ data }) => setChats(data.chats))
      .catch((error) => console.log(error));
  }, [debouncedText, makeCallRequest]);

  return (
    <div className="main">
      <div style={{ backgroundColor: "blue" }} className="main__information">
        <AccountCircle />
        {username}
        <button onClick={toggleUserOptions}>Display options</button>
        {showUserOptions ? (
          <>
            <button onClick={toggleSearchBar}>Search</button>
            <button onClick={logout}>Logout</button>
          </>
        ) : null}
      </div>

      <div style={{ backgroundColor: "green" }} className="main__chats">
        {showSearchBar ? (
          loading ? (
            <div>loading...</div>
          ) : (
            <div>
              <button onClick={toggleSearchBar}>X</button>
              <InputText setText={setSearchText} text={searchText} />
              {chats?.map((chat) => (
                <SearchedChatCard key={chat._id} chat={chat} />
              ))}
            </div>
          )
        ) : (
          <div>
            {userChats.map((chat) => (
              <ChatCard
                key={chat._id}
                chat={chat}
                selectChat={selectChat}
                isSelected={selectedChat?._id === chat._id}
                addMessage={addMessage}
                selectMessages={selectMessages}
              />
            ))}
          </div>
        )}
      </div>

      <div
        style={{ backgroundColor: "yellow" }}
        className="main__chat-information"
      >
        <Group />
        {selectedChat?.name}
        <button onClick={toggleChatOptions} disabled={!selectedChat}>
          Display options
        </button>
        {showChatOptions ? (
          <div>
            <button onClick={leaveGroup} disabled={loading}>
              Leave group
            </button>
          </div>
        ) : null}
      </div>

      <div style={{ backgroundColor: "orange" }} className="main__chat-screen">
        {messages?.map(({ id, message }) => (
          <p key={id}>{message}</p>
        ))}
      </div>

      <div style={{ backgroundColor: "pink" }} className="main__keyboard">
        <InputText setText={setMessage} text={message} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};
