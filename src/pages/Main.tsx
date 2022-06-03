import { ChatCard } from "../components/ChatCard";
import { InformationCard } from "../components/InformationCard";
import { InputText } from "../components/InputText";

export const Main = () => {
  return (
    <div className="main">
      <div style={{ backgroundColor: "blue" }} className="main__information">
        <InformationCard />
      </div>
      <div style={{ backgroundColor: "green" }} className="main__chats">
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
      </div>
      <div
        style={{ backgroundColor: "yellow" }}
        className="main__chat-information"
      >
        <InformationCard />
      </div>
      <div
        style={{ backgroundColor: "orange" }}
        className="main__chat-screen"
      ></div>
      <div style={{ backgroundColor: "pink" }} className="main__keyboard">
        <InputText />
      </div>
    </div>
  );
};
