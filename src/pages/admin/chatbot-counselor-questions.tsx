import { GetServerSidePropsContext } from "next";
import ChatbotCounselorQuestionsPage from "src/main-pages/AdminPages/ChatbotCounselorQuestionsPage/ChatbotCounselorQuestiontsPage";
import { getChatbotCounselorQuestions } from "src/pages/api/admin/get-chatbot-counselor-questions";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    return {
      props: {
        questions: JSON.parse(
          JSON.stringify(await getChatbotCounselorQuestions())
        ),
      },
    };
  } catch (err) {
    console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};

const ChatbotCounselorQuestions = ({
  questions,
}: {
  questions: ChatbotCounselorQuestionData[];
}) => {
  return <ChatbotCounselorQuestionsPage questions={questions} />;
};
export default ChatbotCounselorQuestions;
