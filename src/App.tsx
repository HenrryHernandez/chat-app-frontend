import { Provider } from "react-redux";

import "./styles/index.scss";
import store from "./redux/store";
import { SocketProvider } from "./contexts";
import { MainRouter } from "./routers/MainRouter";

export const App = () => {
  return (
    <Provider store={store}>
      <SocketProvider>
        <MainRouter />
      </SocketProvider>
    </Provider>
  );
};
