import { useSession } from "next-auth/react";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { initialStateAction } from "../../../../utils/redux/actionFunctions";
import { store } from "../../../../utils/redux/store";
import Header from "../../../../common/components/Header/Header";
import LoadingScreen from "../../../../common/components/Loading/Loading";
import {
  callGetAccount,
  callGetAllPathwayProgress,
  callGetQuestionResponses,
} from "src/utils/apiCalls";

export default function Layout({ children }) {
  const router = useRouter();
  const session = useSession();
  const [loading, setLoading] = useState(true);
  const [header, setHeader] = useState(<Header key_prop="initial" />);
  const asyncUseEffect = async () => {
    if (session.data?.user?.uid && !store.getState()) {
      const [accountInfoRes, pathwaysProgressRes, questionResponsesRes] =
        await Promise.all([
          callGetAccount(session.data.user.uid),
          callGetAllPathwayProgress(session.data.user.uid),
          callGetQuestionResponses(session.data.user.uid),
        ]);
      const [accountInfoJSON, pathwaysProgressJSON, questionResponsesJSON] =
        await Promise.all([
          accountInfoRes.json(),
          pathwaysProgressRes.json(),
          questionResponsesRes.json(),
        ]);
      await store.dispatch(
        initialStateAction({
          accountInfo: accountInfoJSON,
          pathwaysProgress: pathwaysProgressJSON,
          questionResponses: questionResponsesJSON,
        })
      );
    }
    if (session.status !== "loading") {
      setLoading(false);
    }
  };
  useEffect(() => {
    //console.log(session);
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
