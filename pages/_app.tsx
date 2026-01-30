import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        html,
        body {
          margin: 0;
          padding: 0;
        }
        .notion-code {
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
}
