import type { GetServerSidePropsContext, NextPage } from "next";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import LoadingScreen from "../common/components/Loading/Loading";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import WelcomePage from "src/main-pages/WelcomePage/WelcomePage";

const Home:NextPage = () => {
  const { data: session, status } = useSession();
  console.log(session);
  const router = useRouter()
  if (status === "authenticated") {
    router.replace('/dashboard')
    return <LoadingScreen />
  }
  return <WelcomePage/>
};


export default Home;
