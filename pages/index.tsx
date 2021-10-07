import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Welcome from "./welcome";
import Dashboard from "./dashboard";
import resources from "./resources";
import Footer from "../components/common/Footer";
import styles from "../styles/Home.module.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    return (
      <Dashboard name={session.user.name}>
      <p>Signed in as {session.user.email}</p>
      </Dashboard>
    );
  }
  return (
    <Welcome>
    </Welcome>
  );
};

export default Home;
