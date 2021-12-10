import React from "react";
import ReactDOM from "react-dom";
import createSagaMiddleware from "redux-saga";
import { applyMiddleware } from "redux";
import App from "./App";
import { Provider } from "react-redux";
import rootReducer from "./reducers/rootReducer";
import rootSaga from "./sagas/rootSaga";
import { createStore, compose } from "redux";

const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  enhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
