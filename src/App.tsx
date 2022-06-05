import { Provider } from "react-redux";

import "./styles/index.scss";
import store from "./redux/store";
import { MainRouter } from "./routers/MainRouter";

export const App = () => {
  return (
    <Provider store={store}>
      <MainRouter />
    </Provider>
  );
};
