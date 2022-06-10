import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AccountCircle } from "@mui/icons-material";

import { InputText } from "../components/InputText";
import { useDebouncer, useRequestAndLoad } from "../hooks";
import { AppStore, Chat } from "../models";
import { logoutAction, removeUserAction } from "../redux/states";
import { getChats } from "../services";
import { SearchedChatCard } from "../components/SearchedChatCard";

export const Main = () => {
  const { username } = useSelector((state: AppStore) => state.user);
  const dispatch = useDispatch();
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [text, setText] = useState("");
  const { debouncedText } = useDebouncer(text);
  const { makeCallRequest, loading } = useRequestAndLoad();
  const [chats, setChats] = useState<Chat[]>();

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
    setText("");
  };

  const openSearch = () => {
    setShowSearch(true);
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
        {showSearch &&
          (loading ? (
            <div>loading...</div>
          ) : (
            <div>
              <button onClick={closeSearch}>X</button>
              <InputText setText={setText} text={text} />
              {chats?.map((chat) => (
                <SearchedChatCard
                  key={chat._id}
                  id={chat._id}
                  name={chat.name}
                />
              ))}
            </div>
          ))}
      </div>

      <div
        style={{ backgroundColor: "yellow" }}
        className="main__chat-information"
      ></div>

      <div
        style={{ backgroundColor: "orange" }}
        className="main__chat-screen"
      ></div>

      <div style={{ backgroundColor: "pink" }} className="main__keyboard"></div>
    </div>
  );
};
