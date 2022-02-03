import { useSession } from "next-auth/react";
import { isLocalURL } from "next/dist/shared/lib/router/router";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ORIGIN_URL } from "../../config";
import { initialStateAction } from "../../utils/actionFunctions";
import { store } from "../../utils/store";
import Header from "./Header";
import LoadingScreen from "./loading";

export default function Layout({ children }) {
  const router = useRouter();
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const [header, setHeader] = useState(<Header key="initial" />);
  const asyncUseEffect = async () => {
    setLoading(true);
    if (session.data?.user?.uid && !store.getState()) {
      const [accountInfoRes, pathwaysProgressRes, questionResponsesRes] =
        await Promise.all([
          fetch(`${ORIGIN_URL}/api/get-account`, {
            method: "POST",
            body: JSON.stringify({ userId: session.data.user.uid }),
          }),
          fetch(`${ORIGIN_URL}/api/get-all-pathway-progress`, {
            method: "POST",
            body: JSON.stringify({ userId: session.data.user.uid }),
          }),
          fetch(`${ORIGIN_URL}/api/get-question-responses`, {
            method: "POST",
            body: JSON.stringify({ userId: session.data.user.uid }),
          }),
        ]);
      const [accountInfoJSON, pathwaysProgressJSON, questionResponsesJSON] =
        await Promise.all([
          accountInfoRes.json(),
          pathwaysProgressRes.json(),
          questionResponsesRes.json(),
        ]);
      store.dispatch(
        initialStateAction({
          accountInfo: accountInfoJSON,
          pathwaysProgress: pathwaysProgressJSON,
          questionResponses: questionResponsesJSON,
        })
      );
    }
    setLoading(false);
  };
  useEffect(() => {
    asyncUseEffect();
  }, [session]);
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
