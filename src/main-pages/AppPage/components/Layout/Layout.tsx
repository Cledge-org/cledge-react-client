import { useSession } from "next-auth/react";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { initialStateAction } from "../../../../utils/redux/actionFunctions";
import { store } from "../../../../utils/redux/store";
import Header from "../../../../common/components/Header/Header";
import LoadingScreen from "../../../../common/components/Loading/Loading";
import Footer from "../../../../common/components/Footer/Footer";
import {
  callGetAccount,
  callGetAllPathwayProgress,
  callGetQuestionResponses,
} from "src/utils/apiCalls";
import Modal from "react-modal";
import { useWindowSize } from "src/utils/hooks/useWindowSize";

export default function Layout({ children }) {
  const router = useRouter();
  const session = useSession();
  const { width, height } = useWindowSize();
  const [loading, setLoading] = useState(true);
  const [header, setHeader] = useState(<Header key_prop="initial" />);

  const [isMobileSignedIn, setIsMobileSignedIn] = useState(
    width < 800 && session.status === "authenticated"
  );
  useEffect(() => {
    setIsMobileSignedIn(width < 800 && session.status === "authenticated");
  }, [width, session]);
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
      {loading ? (
        <LoadingScreen />
      ) : (
        <div>
          {children}
          <Modal
            style={{
              overlay: { zIndex: 1000 },
              content: { height: "80%", bottom: "10%" },
            }}
            isOpen={isMobileSignedIn}
          >
            <div className="d-flex flex-column w-100 h-100 align-items-center">
              Please use cledge on a desktop or laptop. We highly recommend that
              you do not use cledge on mobile as it is not yet optimized for
              mobile views.
              <button
                onClick={() => {
                  setIsMobileSignedIn(false);
                }}
                className="cl-btn-blue"
              >
                I understand
              </button>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
}
