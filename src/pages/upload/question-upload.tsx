import { GetServerSidePropsContext } from "next";
import { getAllQuestionLists } from "../api/get-all-questions";
import QuestionUploadPage from "../../MainPages/UploadPages/QuestionUploadPage/QuestionUploadPage";

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
const QuestionUpload = () => {
  return <QuestionUploadPage />;
};
export default QuestionUpload;
