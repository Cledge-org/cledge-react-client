import { isLocalURL } from "next/dist/shared/lib/router/router";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "./Header";
import LoadingScreen from "./loading";

export default function Layout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [header, setHeader] = useState(<Header key="initial" />);
  useEffect(() => {
    let numTimes = 1;
    const endLoading = () => {
      setLoading(false);
    };
    const endLoadingShowNewHeader = () => {
      setLoading(false);
      numTimes++;
      setHeader(<Header key={numTimes.toString()} />);
    };
    const startLoading = () => {
      setLoading(true);
    };
    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeError", endLoading);
    Router.events.on("routeChangeComplete", endLoadingShowNewHeader);
    return () => {
      Router.events.off("routeChangeComplete", endLoadingShowNewHeader);
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeError", endLoading);
    };
  }, []);
  return (
    <div>
      {router.pathname === "/[questionnaire]" ? null : header}
      {loading ? <LoadingScreen /> : <main>{children}</main>}
    </div>
  );
}
