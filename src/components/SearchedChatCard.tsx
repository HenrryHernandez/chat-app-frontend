import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRequestAndLoad } from "../hooks";
import { AppStore, Chat } from "../models";
import { addChat } from "../redux/states";
import { joinUserToChat } from "../services";

interface Props {
  chat: Chat;
}

export const SearchedChatCard = ({ chat }: Props) => {
  const dispatch = useDispatch();
  const user = useSelector((state: AppStore) => state.user);
  const { makeCallRequest } = useRequestAndLoad();
  const [showOptions, setShowOptions] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const joinChat = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    try {
      const { success } = await makeCallRequest(
        joinUserToChat(user._id, chat._id)
      );

      if (success) dispatch(addChat(chat));
    } catch (error) {
      // TODO: handle error
    }
  };

  useEffect(() => {
    setAlreadyJoined(user.chats.map((chat) => chat._id).includes(chat._id));
  }, [chat._id, user]);

  return (
    <div onClick={toggleOptions}>
      {chat.name}

      {showOptions && (
        <div>
          <button
            disabled={alreadyJoined}
            onClick={(e) => {
              joinChat(e);
            }}
          >
            add to chat
          </button>
        </div>
      )}
    </div>
  );
};
