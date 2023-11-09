import { GetServerSidePropsContext } from "next";
import CollegeEssayAssistPage from "../main-pages/CollegeEssayAssist/CollegeEssayAssistPage";

const EssayAssist = () => {
  return <CollegeEssayAssistPage/>
}

EssayAssist.requireAuth = true;
export default EssayAssist