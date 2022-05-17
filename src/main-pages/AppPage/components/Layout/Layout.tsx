import { useSession } from "next-auth/react";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { initialStateAction } from "../../../../utils/redux/actionFunctions";
import { store } from "../../../../utils/redux/store";
import Header from "../../../../common/components/Header/Header";
import LoadingScreen from "../../../../common/components/Loading/Loading";

export default function Layout({ children }) {
  console.error("I EXIST");
  const router = useRouter();
  const session = useSession();
  const [loading, setLoading] = useState(true);
  const [header, setHeader] = useState(<Header key_prop="initial" />);
  const asyncUseEffect = async () => {
    // setLoading(true);
    console.error(window.origin);
    console.log("WERE IN");
    console.log(session?.data?.user?.uid);
    if (session.data?.user?.uid && !store.getState()) {
      console.log("THERE'S A USER");
      const [accountInfoRes, pathwaysProgressRes, questionResponsesRes] =
        await Promise.all([
          fetch(`/api/get-account`, {
            method: "POST",
            body: JSON.stringify({ userId: session.data.user.uid }),
          }),
          fetch(`/api/get-all-pathway-progress`, {
            method: "POST",
            body: JSON.stringify({ userId: session.data.user.uid }),
          }),
          fetch(`/api/get-question-responses`, {
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
      console.log(pathwaysProgressJSON);
      await store.dispatch(
        initialStateAction({
          accountInfo: accountInfoJSON,
          pathwaysProgress: pathwaysProgressJSON,
          questionResponses: questionResponsesJSON,
        })
      );
    }
    if (session.status !== "loading") {
      console.log("WERE NOT LOADING");
      console.log(session);
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log(session);
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
      setHeader(<Header key_prop={numTimes.toString()} />);
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
      {router.pathname === "/check-ins/[checkIn]" ? null : header}
      {loading ? <LoadingScreen /> : <div>{children}</div>}
    </div>
  );
}
