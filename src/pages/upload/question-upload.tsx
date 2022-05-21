import { GetServerSidePropsContext } from "next";
import { getAllQuestionLists } from "../api/get-all-questions";
import QuestionUploadPage from "../../main-pages/UploadPages/QuestionUploadPage/QuestionUploadPage";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    return {
      props: {
        questionMetadata: JSON.parse(
          JSON.stringify(await getAllQuestionLists())
        ),
      },
    };
  } catch (err) {
    console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};

// logged in landing page
const QuestionUpload = ({ questionMetadata }) => {
  return <QuestionUploadPage questionMetadata={questionMetadata} />;
};
export default QuestionUpload;
