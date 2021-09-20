import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Footer from "../components/common/Footer";
import styles from "../styles/Home.module.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    return <p>Signed in as {session.user.email}</p>;
  }
  return <a href="/api/auth/signin">Sign in</a>;
};

export default Home;
