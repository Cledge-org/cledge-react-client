import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.scss";
import "../styles/components.scss";

import { SessionProvider as AuthProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/common/Layout";
import { store } from "../utils/store";
import { Provider } from "react-redux";
import ProtectedComponent from "../components/common/ProtectedComponent";

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
  return (
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
        <Layout>
          <Head>
            <title>Cledge</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="true"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
              rel="stylesheet"
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
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
