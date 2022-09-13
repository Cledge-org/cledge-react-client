import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { callPutChatbotCounselorQuestion } from "src/utils/apiCalls";

const ChatbotCounselorQuestionsPage = ({
  questions,
}: {
  questions: ChatbotCounselorQuestionData[];
}) => {
  const [chatbotQuestions, setChatbotQuestions] = useState(questions);
  return (
    <div style={{ paddingTop: "50px" }}>
      {chatbotQuestions
        .sort((a, b) => {
          return (
            new Date(
              parseInt(b._id.toString().slice(0, 8), 16) * 1000
            ).getTime() -
            new Date(
              parseInt(a._id.toString().slice(0, 8), 16) * 1000
            ).getTime()
          );
        })
        .map(
          (
            { _id, email, question, answer, problem, name, resolved },
            index
          ) => (
            <div
              className="d-flex flex-row align-items-center"
              style={{
                marginLeft: "50px",
                paddingLeft: "10px",
                paddingTop: "10px",
                border: "1px solid black",
                width: "90%",
              }}
            >
              <div style={{ marginBottom: "20px" }}>
                <div>
                  Time created:{" "}
                  {new Date(
                    parseInt(_id.toString().slice(0, 8), 16) * 1000
                  ).toString()}
                </div>
                {name}: {email}
                <div style={{ marginLeft: "25px" }}>
                  <div>question: {question}</div>
                  <div>chatbot's answer: {answer}</div>
                  <div>
                    The problem the user had with this answer: {problem}
                  </div>
                </div>
                <div
                  style={{ width: "50%" }}
                  className="d-flex flex-row justify-content-between align-items-center"
                >
                  <span style={{ fontSize: "18px" }}>Resolved?</span>
                  <div
                    style={{
                      color: resolved ? "green" : "red",
                      fontSize: "28px",
                    }}
                  >
                    {(resolved && <FaCheck />) || <GiCancel />}
                  </div>
                </div>
              </div>
              {!resolved && (
                <button
                  onClick={() => {
                    setChatbotQuestions((questions) => {
                      questions[index].resolved = true;
                      return questions;
                    });
                    callPutChatbotCounselorQuestion({
                      chatbotDataId: _id,
                      chatbotData: {
                        email,
                        question,
                        answer,
                        problem,
                        name,
                        resolved: true,
                      },
                    });
                  }}
                  className="ms-5"
                  style={{
                    outline: "none",
                    height: "40px",
                    fontWeight: "bold",
                    borderRadius: "5px",
                  }}
                >
                  Mark as Resolved
                </button>
              )}
            </div>
          )
        )}
    </div>
  );
};
export default ChatbotCounselorQuestionsPage;
