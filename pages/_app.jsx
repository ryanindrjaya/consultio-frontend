import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { Router } from "next/router";
import ReactDOM from "react-dom";

// persist store
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";

import PageChange from "../components/pageChange/PageChange.js";
import "../styles/globals.css";

Router.events.on("routeChangeStart", () => {
  ReactDOM.render(<PageChange />, document.getElementById("page-transition"));
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
});

function MyApp({ Component, pageProps }) {
  const Layout = Component.layout || ((page) => page);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
