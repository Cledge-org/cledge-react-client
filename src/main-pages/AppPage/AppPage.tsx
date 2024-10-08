import { SessionProvider as AuthProvider, useSession } from "next-auth/react";
import type { AppProps } from "next/app";
import { GetServerSidePropsContext, NextPage } from "next";
import { getAnalytics, logEvent } from "firebase/analytics";
import Head from "next/head";
import Layout from "./components/Layout/Layout";
import { store } from "../../utils/redux/store";
import { Provider } from "react-redux";
import ProtectedComponent from "../../common/components/ProtectedComponent/ProtectedComponent";
import { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import LoadingScreen from "../../common/components/Loading/Loading";
import { getFirebaseClientApp } from "src/utils/firebase/getFirebaseApp";
// import { initializeTagManager } from "src/utils/analytics/gtm";
import { initializeClarity } from "src/utils/analytics/clarity";

export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean;
};

function MyApp({
  Component,
  pageProps,
}: {
  Component: NextApplicationPage;
  pageProps: any;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Log page visit to analytics
    logEvent(getAnalytics(getFirebaseClientApp()), router.pathname);

    // Connect 3rd party data streaming services
    // initializeTagManager();
    initializeClarity();

    const endLoading = () => {
      setLoading(false);
    };
    const endLoadingShowNewHeader = () => {
      setLoading(false);
    };
    const startLoading = () => {
      if (router.pathname === "/" || router.pathname === "") {
        setLoading(true);
      }
    };
    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeError", endLoading);
    Router.events.on("routeChangeComplete", endLoadingShowNewHeader);
    return () => {
      Router.events.off("routeChangeComplete", endLoadingShowNewHeader);
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeError", endLoading);
    };
  }, [router]);
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
        <Layout>
          <Head>
            <title>Cledge</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1"
            />
            <meta name="description" content="Generated by create next app" />
          </Head>
          {Component.requireAuth ? (
            <ProtectedComponent>
              <Component {...pageProps} />
            </ProtectedComponent>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </Provider>
    </AuthProvider>
  );
}
export default MyApp;
