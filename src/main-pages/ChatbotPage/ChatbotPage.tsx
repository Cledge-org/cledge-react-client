import {
  faArrowUp,
  faChevronDown,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { minHeight } from "@mui/system";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fixControlledValue } from "antd/lib/input/Input";
import { connect } from "react-redux";
import { useWindowSize } from "src/utils/hooks/useWindowSize";
import LeftPannel from "src/main-pages/ChatbotPage/components/LeftPanel/LeftPanel";
import styles from "./chatbot-page.module.scss";
import Message from "src/main-pages/ChatbotPage/components/Message/Message";
import PageErrorBoundary from "src/common/components/PageErrorBoundary/PageErrorBoundary";
import {
  alertSlackChatbotQuestion,
  callGetChatbotResponse,
  callUpdateUser,
} from "src/utils/apiCalls";
import { useRouter } from "next/router";
import classNames from "classnames";
import { FaQuestion } from "react-icons/fa";
import {
  downvoteWorkflow,
  getChatbotMessagesFormatted,
  introductionWorkflow,
} from "src/main-pages/ChatbotPage/utils";
import ChatOption from "src/main-pages/ChatbotPage/components/ChatOption/ChatOption";
import { updateAccountAction } from "src/utils/redux/actionFunctions";
import { store } from "src/utils/redux/store";

interface MessageProps {
  message: string | ReactElement;
  isOnLeft: boolean;
  isAnswer?: boolean;
  question?: string;
  onDownVote?: (message: string, answer: string) => void;
}

interface CoupledOptions {
  areOptions: boolean;
  pickedIndex: number;
  options: { [option: string]: string };
}

const Chatbot = ({
  accountInfo,
  questionResponses,
}: {
  accountInfo: AccountInfo;
  questionResponses: UserResponse[];
}) => {
  const [currWorkflow, setCurrWorkflow] = useState(
    !accountInfo.introducedToChatbot ? "intro" : "none"
  );
  const [messagesList, setMessagesList] = useState<
    (MessageProps | CoupledOptions)[]
  >([]);
  const [sendPostOnNextQuestion, setSendPostOnNextQuestion] = useState(true);
  const [currOptions, setCurrOptions] = useState({});
  const [currMessageText, setCurrMessageText] = useState("");
  const [pickedOptions, setPickedOptions] = useState<any[][]>([]);
  const scrollRef = useRef(null);
  const size = useWindowSize();
  const isMobile = size.width < 900 || size.height < 740;
  const router = useRouter();
  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const copyOfMessages = messagesList.slice();
    const messageOriginal = currMessageText;
    copyOfMessages.push({ message: currMessageText, isOnLeft: false });
    setMessagesList(copyOfMessages);
    setCurrMessageText("");
    copyOfMessages.push({
      message: <div className={styles.chatbotLoading}>...</div>,
      isOnLeft: true,
    });
    setMessagesList(copyOfMessages);
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
    const response = await callGetChatbotResponse(
      currMessageText,
      accountInfo.name,
      questionResponses.filter(({ questionId }) => {
        return (
          questionId === "627e8fe7e97c3c14537dc7f5" ||
          questionId === "61c6b6f2d3054b6dd0f1fc40" ||
          questionId === "61c6b6f2d3054b6dd0f1fc4b"
        );
      })
    ).then((data) => data);
    const copyOfMessages2 = copyOfMessages.slice(0, -1);
    copyOfMessages2.push({
      message: response,
      isOnLeft: true,
      isAnswer: true,
      onDownVote: onDownVote,
      question: messageOriginal,
    });
    if (sendPostOnNextQuestion) {
      copyOfMessages2.push({
        message:
          "If you do not like the answer, feel free to give it a thumb down 👎 and we will have a real counselor to reply back to you.",
        isOnLeft: true,
      });
    }
    setMessagesList(copyOfMessages2);
    setSendPostOnNextQuestion(false);
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const addMessages = (newMessages) => {
    setMessagesList((messageList) => messageList.concat(newMessages));
  };
  const endIntroWorkflow = () => {
    setCurrWorkflow("none");
    callUpdateUser({ ...accountInfo, introducedToChatbot: true });
    store.dispatch(
      updateAccountAction({
        ...accountInfo,
        introducedToChatbot: true,
      })
    );
  };

  const onDownVote = (message: string, answer: string) => {
    setCurrWorkflow("downvote");
    setPickedOptions((pickedOptions) => [...pickedOptions, []]);
    addMessages(
      getChatbotMessagesFormatted(downvoteWorkflow.e1.chatbotMessages)
    );
    setCurrOptions(downvoteWorkflow.e1.possibleChoices);
  };

  const onOptionClick = (option: string) => {
    const workflow =
      currWorkflow === "downvote" ? downvoteWorkflow : introductionWorkflow;
    if (workflow[currOptions[option]].backgroundAction) {
      const answerMsg: MessageProps = messagesList
        .slice()
        .reverse()
        .find(({ isAnswer }: MessageProps) => isAnswer) as MessageProps;
      workflow[currOptions[option]].backgroundAction(
        accountInfo,
        answerMsg.question,
        answerMsg.message,
        pickedOptions[pickedOptions.length - 1][
          pickedOptions[pickedOptions.length - 1].length - 1
        ]
      );
      alertSlackChatbotQuestion({
        email: accountInfo.email,
        name: accountInfo.name,
        resolved: false,
        question: answerMsg.question,
        answer: answerMsg.message as string,
        problem:
          pickedOptions[pickedOptions.length - 1][
            pickedOptions[pickedOptions.length - 1].length - 1
          ],
      });
    }
    setPickedOptions((currPicked) => {
      currPicked[currPicked.length - 1].push(option);
      return currPicked;
    });
    addMessages([
      {
        areOptions: true,
        options: currOptions,
        pickedIndex: pickedOptions.length - 1,
      },
      {
        message: <div className={styles.chatbotLoading}>...</div>,
        isOnLeft: true,
      },
    ]);
    setCurrOptions([]);
    setTimeout(() => {
      setMessagesList((messageList) =>
        messageList.slice(0, messageList.length - 1)
      );
      addMessages(
        getChatbotMessagesFormatted(
          workflow[currOptions[option]].chatbotMessages
        )
      );
      setCurrOptions(workflow[currOptions[option]].possibleChoices);
      if (!workflow[currOptions[option]].possibleChoices) {
        if (currWorkflow === "downvote") {
          setCurrWorkflow("none");
        } else {
          endIntroWorkflow();
        }
      }
    }, 1000);
  };

  useEffect(() => {
    if (currWorkflow === "intro") {
      setPickedOptions((pickedOptions) => [...pickedOptions, []]);
      addMessages(
        getChatbotMessagesFormatted(introductionWorkflow.e1.chatbotMessages)
      );
      setCurrOptions(introductionWorkflow.e1.possibleChoices);
    }
  }, [currWorkflow]);

  if (accountInfo.checkIns.length > 0) {
    router.push({
      pathname: "/check-ins/[checkIn]",
      query: { checkIn: accountInfo.checkIns },
    });
  }
  return (
    <PageErrorBoundary>
      <div
        style={{
          height: "93vh",
          backgroundColor: "#FAFAFC",
        }}
        className="w-100 d-flex flex-row align-items-center justify-content-center"
      >
        <div
          className={classNames(
            styles.messageScroll,
            "d-flex flex-column position-relative container-fluid"
          )}
          style={{
            backgroundColor: "white",
            height: "95%",
            width: isMobile ? "100%" : "70%",
            border: "1px solid #E0DFE8",
            borderRadius: "8px",
            overflow: "auto",
          }}
        >
          <div
            id="scrollableDiv"
            className={classNames("pt-3")}
            style={{
              height: "fit-content",
              width: "100%",
              flex: 1,
              display: "flex",
              flexDirection: "column-reverse",
            }}
          >
            {messagesList.length === 0 ? (
              <p className="align-self-center mb-5 pb-5">No message history</p>
            ) : null}
            <InfiniteScroll
              className="pb-5 pe-1"
              dataLength={messagesList.length} //This is important field to render the next data
              next={null}
              hasMore={true}
              loader={<p></p>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              } // https://www.npmjs.com/package/react-infinite-scroll-component for infinite scroll
            >
              {messagesList.map((object, index) => {
                if ((object as CoupledOptions).areOptions) {
                  const { options, pickedIndex } = object as CoupledOptions;
                  return (
                    <div
                      key={index}
                      className={`d-flex flex-row w-100 my-3 justify-content-end align-items-end`}
                    >
                      <div className="d-flex flex-row align-items-center justify-content-end flex-wrap w-50">
                        {Object.keys(options).map((option) => (
                          <ChatOption
                            isChosen={pickedOptions[pickedIndex].includes(
                              option
                            )}
                            onClick={() => {}}
                            option={option}
                          />
                        ))}
                      </div>
                    </div>
                  );
                }
                const { message, isOnLeft, isAnswer, question, onDownVote } =
                  object as MessageProps;
                return (
                  <Message
                    key={index}
                    dontShowPicture={
                      isOnLeft &&
                      index < messagesList.length - 1 &&
                      (messagesList[index + 1] as MessageProps).isOnLeft
                    }
                    question={question}
                    message={message}
                    userName={accountInfo.name}
                    isOnLeft={isOnLeft}
                    isAnswer={isAnswer}
                    onDownVote={onDownVote}
                  />
                );
              })}
              {currOptions && (
                <div
                  className={`d-flex flex-row w-100 my-3 justify-content-end align-items-end`}
                >
                  <div className="d-flex flex-row align-items-center justify-content-end flex-wrap w-50">
                    {Object.keys(currOptions).map((option) => (
                      <ChatOption onClick={onOptionClick} option={option} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </InfiniteScroll>
          </div>
          <form
            onSubmit={handleMessageSubmit}
            id="messageInputContainer"
            className="bottom-0 py-3 d-flex flex-row align-items-center justify-content-center"
            style={{
              flex: 0.1,
              position: "sticky",
              bottom: 0,
              left: 0,
              width: "100%",
              backgroundColor: "white",
            }} // https://github.com/adrianhajdin/chat_application/blob/main/src/components/ChatFeed.jsx for chat feed potentially
          >
            <div
              style={{
                border: isMobile ? "2px solid lightgray" : "none",
                borderRadius: isMobile ? "20px" : 0,
              }}
              className="d-flex flex-row align-items-center justify-content-center"
            >
              <input
                onChange={(e) => {
                  setCurrMessageText(e.target.value);
                }}
                disabled={currWorkflow !== "none"}
                value={currMessageText}
                placeholder="Ask anything here"
                className={classNames("py-1 px-3", isMobile ? "ms-1" : "")}
                style={{
                  height: size.height < 700 ? "5vmax" : "2.2vmax",
                  width:
                    size.width < 800 || size.height < 740 ? "55vw" : "35vw",
                  minHeight: "30px",
                  outline: "none",
                  border: isMobile ? "none" : "1px solid #B2B0C4",
                  borderRadius: "26px",
                }}
              />
              <button
                className={`cl-btn-${
                  isMobile ? "gray" : "blue"
                } ms-3 py-2 px-2 center-child ${isMobile ? "cl-blue" : ""}`}
                style={{
                  height: "4vh",
                  minHeight: "36px",
                  borderRadius: "20px",
                  width:
                    size.width < 800 || size.height < 740 ? "10vw" : "12vw",
                }}
                type="submit"
              >
                {isMobile ? <FontAwesomeIcon icon={faArrowUp} /> : "Send"}
              </button>
            </div>
          </form>
        </div>
        <button
          onClick={() => {
            setCurrWorkflow("intro");
          }}
          style={{
            outline: "none",
            border: "none",
            backgroundColor: "#DEDEFF",
            width: "54px",
            height: "54px",
            position: "absolute",
            right: "3%",
            borderRadius: "8px",
            bottom: "5%",
          }}
        >
          <FaQuestion className="cl-dark-text" size={20} />
        </button>
      </div>
    </PageErrorBoundary>
  );
};

Chatbot.requireAuth = true;

export default connect((state) => {
  return {
    accountInfo: state.accountInfo,
    questionResponses: state.questionResponses,
  };
})(Chatbot);
