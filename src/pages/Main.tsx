import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AccountCircle, Group } from "@mui/icons-material";

import { ChatCard, InputText, SearchedChatCard } from "../components";
import { useChat } from "../hooks";
import { AppStore } from "../models";
import { logoutAction, removeUserAction } from "../redux/states";

export const Main = () => {
  const dispatch = useDispatch();
  const { username, chats: userChats } = useSelector(
    (state: AppStore) => state.user
  );
  const {
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
  } = useChat();
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [showChatOptions, setShowChatOptions] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

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

  return (
    <div className="main">
      <div style={{ backgroundColor: "blue" }} className="main__information">
        <AccountCircle />
        {username}
        <button onClick={toggleUserOptions}>Display options</button>
        {showUserOptions ? (
          <div>
            <button onClick={toggleSearchBar}>Search</button>
            <button onClick={logout}>Logout</button>
          </div>
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
