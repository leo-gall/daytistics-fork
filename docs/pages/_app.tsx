import React from "react";
import "../globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="font-nunito">
      <Component {...pageProps} />
    </div>
  );
}
