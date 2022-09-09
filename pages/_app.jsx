import { Toaster } from "react-hot-toast";
import { Router } from "next/router";
import ReactDOM from "react-dom";

import PageChange from "../components/pageChange/PageChange.js";
import "../styles/globals.css";

Router.events.on("routeChangeStart", () => {
  ReactDOM.render(<PageChange />, document.getElementById("page-transition"));
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
});

function MyApp({ Component, pageProps }) {
  const Layout = Component.layout || ((page) => page);

  return (
    <Layout>
      <Component {...pageProps} />
      <Toaster />
    </Layout>
  );
}

export default MyApp;
