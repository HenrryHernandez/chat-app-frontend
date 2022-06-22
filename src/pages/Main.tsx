import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, List, ListItem, Menu, MenuItem, styled } from "@mui/material";
import { AccountCircle, Group, MoreVert, Send } from "@mui/icons-material";

import { ChatCard, InputText, Message, SearchedChatCard } from "../components";
import { useChat } from "../hooks";
import { AppStore } from "../models";
import { logoutAction, removeUserAction } from "../redux/states";

const StyledButton = styled(Button)({
  height: "100%",
  minWidth: "0px",
  borderRadius: "0px",
  color: `rgb(${125},${125},${125})`,
  backgroundColor: `rgb(${215},${215},${215})`,
  "&:hover": {
    backgroundColor: `rgb(${200},${200},${200})`,
  },
});

const StyledSendButton = styled(Button)({
  height: "50%",
  minWidth: "0px",
  borderRadius: "4px",
  color: `rgb(${125},${125},${125})`,
  backgroundColor: `rgb(${215},${215},${215})`,
  "&:hover": {
    backgroundColor: `rgb(${200},${200},${200})`,
  },
});

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
  const [showSearchBar, setShowSearchBar] = useState(false);

  const logout = () => {
    dispatch(logoutAction());
    dispatch(removeUserAction());

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  const toggleSearchBar = () => {
    setShowSearchBar((prev) => !prev);
    setSearchText("");
  };

  const [userDropdown, setUserDropdown] = useState<null | HTMLElement>(null);
  const isUserDropdownOpen = Boolean(userDropdown);
  const openUserDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    setUserDropdown(event.currentTarget);
  };
  const closeUserDropdown = () => {
    setUserDropdown(null);
  };

  const [chatDropdown, setChatDropdown] = useState<null | HTMLElement>(null);
  const isChatDropdownOpen = Boolean(chatDropdown);
  const openChatDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    setChatDropdown(event.currentTarget);
  };
  const closeChatDropdown = () => {
    setChatDropdown(null);
  };

  return (
    <div className="main">
      <div className="main__user-information">
        <div className="information__name">
          <AccountCircle />
          {username}
        </div>
        <div className="information__btn-container">
          <StyledButton
            id="user-dropdown-button"
            className="test"
            aria-controls={
              isUserDropdownOpen ? "user-dropdown-menu" : undefined
            }
            aria-haspopup="true"
            aria-expanded={isUserDropdownOpen ? "true" : undefined}
            onClick={openUserDropdown}
            fullWidth={true}
          >
            <MoreVert />
          </StyledButton>
        </div>
        <Menu
          id="user-dropdown-menu"
          anchorEl={userDropdown}
          open={isUserDropdownOpen}
          onClose={closeUserDropdown}
          MenuListProps={{
            "aria-labelledby": "user-dropdown-button",
          }}
        >
          <MenuItem onClick={toggleSearchBar}>Search</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </div>

      <div className="main__chats">
        {showSearchBar ? (
          loading ? (
            <div>loading...</div>
          ) : (
            <div>
              <button onClick={toggleSearchBar}>X</button>
              <InputText
                setText={setSearchText}
                text={searchText}
                placeholder={"Search"}
              />
              {chats?.map((chat) => (
                <SearchedChatCard key={chat._id} chat={chat} />
              ))}
            </div>
          )
        ) : (
          <div>
            <List disablePadding>
              {userChats.map((chat) => {
                return (
                  <div key={chat._id}>
                    <ListItem disablePadding divider>
                      <ChatCard
                        chat={chat}
                        selectChat={selectChat}
                        isSelected={selectedChat?._id === chat._id}
                        addMessage={addMessage}
                        selectMessages={selectMessages}
                      />
                    </ListItem>
                  </div>
                );
              })}
            </List>
          </div>
        )}
      </div>

      <div className="main__chat-information">
        <div className="information__name">
          <Group />
          {selectedChat?.name}
        </div>
        <div className="information__btn-container">
          <StyledButton
            id="chat-dropdown-button"
            aria-controls={
              isChatDropdownOpen ? "chat-dropdown-menu" : undefined
            }
            aria-haspopup="true"
            aria-expanded={isChatDropdownOpen ? "true" : undefined}
            onClick={openChatDropdown}
            disabled={!selectedChat}
            style={{
              width: "60px",
            }}
          >
            <MoreVert />
          </StyledButton>
        </div>
        <Menu
          id="chat-dropdown-menu"
          anchorEl={chatDropdown}
          open={isChatDropdownOpen}
          onClose={closeChatDropdown}
          MenuListProps={{
            "aria-labelledby": "chat-dropdown-button",
          }}
        >
          <MenuItem onClick={leaveGroup}>Leave group</MenuItem>
        </Menu>
      </div>

      <div className="main__chat-screen">
        {messages?.map(({ id, message }) => (
          <Message key={id} message={message} />
        ))}
      </div>

      <div className="main__keyboard">
        <InputText
          setText={setMessage}
          text={message}
          placeholder={"Message"}
        />
        <StyledSendButton onClick={sendMessage}>
          <Send />
        </StyledSendButton>
      </div>
    </div>
  );
};
