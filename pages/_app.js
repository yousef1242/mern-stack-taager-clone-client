import { store } from "@/store";
import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
          <Component {...pageProps} />
          <Toaster position="top-left" />
      </Provider>
    </>
  );
}
