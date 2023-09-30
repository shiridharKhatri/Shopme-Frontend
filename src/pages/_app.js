import State from "@/context/State";
import "@/styles/globals.css";
import "@/styles/Mobile.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <State>
        <Component {...pageProps} />
      </State>
    </>
  );
}
