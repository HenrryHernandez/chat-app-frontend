import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AccountCircle } from "@mui/icons-material";

import { ChatCard, InputText, SearchedChatCard } from "../components";
import { SocketContext } from "../contexts";
import { useDebouncer, useRequestAndLoad } from "../hooks";
import { AppStore, Chat } from "../models";
import { logoutAction, removeUserAction } from "../redux/states";
import { getChats } from "../services";

export const Main = () => {
  const { socket } = useContext(SocketContext);
  const { username, chats: userChats } = useSelector(
    (state: AppStore) => state.user
  );
  const dispatch = useDispatch();
  const { makeCallRequest, loading } = useRequestAndLoad();
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [chats, setChats] = useState<Chat[]>();
  const [selectedChat, setSelectedChat] = useState(userChats[0] || "");
  const [searchText, setSearchText] = useState("");
  const { debouncedText } = useDebouncer(searchText);
  const [message, setMessage] = useState("");

  const logout = () => {
    dispatch(logoutAction());
    dispatch(removeUserAction());

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  const toggleUserOptions = () => {
    setShowUserOptions((prev) => !prev);
  };

  const closeSearch = () => {
    setShowSearch(false);
    setSearchText("");
  };

  const openSearch = () => {
    setShowSearch(true);
  };

  const selectChat = (id: string) => {
    const chat = userChats.find((chat) => chat._id === id);

    if (!chat) return;

    setSelectedChat(chat);
  };

  const sendMessage = () => {
    socket.emit("set-new-message", selectedChat._id, message);
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
            <button onClick={openSearch}>Search</button>
            <button onClick={logout}>Logout</button>
          </>
        ) : null}
      </div>

      <div style={{ backgroundColor: "green" }} className="main__chats">
        {showSearch ? (
          loading ? (
            <div>loading...</div>
          ) : (
            <div>
              <button onClick={closeSearch}>X</button>
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
                isSelected={selectedChat._id === chat._id}
              />
            ))}
          </div>
        )}
      </div>

      <div
        style={{ backgroundColor: "yellow" }}
        className="main__chat-information"
      ></div>

      <div
        style={{ backgroundColor: "orange" }}
        className="main__chat-screen"
      ></div>

      <div style={{ backgroundColor: "pink" }} className="main__keyboard">
        <InputText setText={setMessage} text={message} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};
