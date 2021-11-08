import { Router } from "next/router";
import { useEffect, useState } from "react";
import Header from "./Header";

export default function Layout({ children }) {
  const [header, setHeader] = useState(<Header />);
  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      setHeader(null);
    });
    Router.events.on("routeChangeComplete", () => {
      setHeader(<Header />);
    });
  }, []);
  return (
    <div>
      {header}
      <main>{children}</main>
    </div>
  );
}
