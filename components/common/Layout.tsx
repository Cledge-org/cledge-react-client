import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "./Header";

export default function Layout({ children }) {
  const router = useRouter();
  const [header, setHeader] = useState(<Header key="initial" />);
  useEffect(() => {
    let numTimes = 1;
    Router.events.on("routeChangeComplete", () => {
      numTimes++;
      setHeader(<Header key={numTimes.toString()} />);
    });
  }, []);
  return (
    <div>
      {header}
      <main>{children}</main>
    </div>
  );
}
