import type { NextPage } from "next";
import Welcome from "./welcome";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import LoadingScreen from "../common/components/Loading/Loading";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  console.log(session);
  if (status === "authenticated") {
    window.location.href = "/dashboard";
    return <LoadingScreen />;
  }
  return <Welcome></Welcome>;
};

export default Home;
