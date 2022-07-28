import type { NextPage } from "next";
import Welcome from "./welcome";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import LoadingScreen from "../common/components/Loading/Loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  console.log(session);
  const router = useRouter()
  if (status === "authenticated") {
    router.replace('/dashboard')
    return<LoadingScreen/>
  }
  return <Welcome></Welcome>;
};

export default Home;
