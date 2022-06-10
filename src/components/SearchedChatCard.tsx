import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { AppStore } from "../models";

interface Props {
  id: string;
  name: string;
}

export const SearchedChatCard = ({ id, name }: Props) => {
  const { chats } = useSelector((state: AppStore) => state.user);
  const [showOptions, setShowOptions] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const joinChat = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    setAlreadyJoined(chats.includes(id));
  }, [id, chats]);

  return (
    <div onClick={toggleOptions}>
      {name}

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
