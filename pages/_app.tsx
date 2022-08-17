import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./store";
import { Router } from "next/router";
import ReactDOM from "react-dom";

import PageChange from "../components/pageChange/PageChange.js";

Router.events.on("routeChangeStart", () => {
  ReactDOM.render(<PageChange />, document.getElementById("page-transition"));
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition")!);
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Toaster />
    </Provider>
  );
}

export default MyApp;
