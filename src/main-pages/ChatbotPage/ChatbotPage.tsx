import {
  faArrowUp,
  faChevronDown,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { minHeight } from "@mui/system";
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import { NextApplicationPage } from "src/main-pages/AppPage/AppPage";
import { ChatbotHistory } from "src/@types/types";
import { useSession } from "next-auth/react";
import CircularProgress from "@mui/material/CircularProgress";

interface MessageProps {
  message: string | ReactElement;
  messageId?: string;
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

const Chatbot: NextApplicationPage<{
  accountInfo: AccountInfo;
  questionResponses: UserResponse[];
}> = ({ accountInfo, questionResponses }) => {
  //State
  const [currWorkflow, setCurrWorkflow] = useState(
    !accountInfo.introducedToChatbot ? "intro" : "none"
  );
  const [isLoading, setIsLoading] = useState(true);
  const [messageList, setMessageList] = useState<ChatbotHistory[]>([]);
  const [sendPostOnNextQuestion, setSendPostOnNextQuestion] = useState(true);
  const [currOptions, setCurrOptions] = useState({});
  const [awaitingChatbotResponse, setAwaitingChatbotResponse] = useState(false);
  const [currMessageText, setCurrMessageText] = useState("");
  const [pickedOptions, setPickedOptions] = useState<any[][]>([]);
  const [currProblematicMessage, setCurrProblematicMessage] = useState<{
    question: string;
    answer: string;
  }>({ question: "", answer: "" });
  const [shouldUpdateBackend, setShouldUpdateBackend] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  //General Hooks
  const session = useSession();
  const scrollRef = useRef(null);
  const size = useWindowSize();
  const isMobile = useMemo(() => size.width < 900 || size.height < 740, [size]);
  const router = useRouter();

  const asyncUseEffect = async () => {
    const history = await (
      await fetch(`/api/chatbot/get-chatbot-history`, {
        method: "POST",
        body: JSON.stringify({
          userId: session.data.user.uid,
          offset: accountInfo.chatbotHistoryLength,
          numIndecies: 1,
        }),
      })
    ).json();
    console.log(history);
    if (history.length > 0) {
      setMessageList(history);
    }
    setIsLoading(false);
  };

  const loadMoreHistory = useCallback(async () => {
    setIsLoadingMore(true);
    const newHistory = (await (
      await fetch(`/api/chatbot/get-chatbot-history`, {
        method: "POST",
        body: JSON.stringify({
          userId: session.data.user.uid,
          offset: accountInfo.chatbotHistoryLength - messageList.length,
          numIndecies: 2,
        }),
      })
    ).json()) as ChatbotHistory[];
    setMessageList(newHistory.concat(messageList));
  }, [messageList]);

  useEffect(() => {
    asyncUseEffect();
  }, []);

  useEffect(() => {
    console.log(messageList);
  }, [messageList]);

  useEffect(() => {
    if (shouldUpdateBackend) {
      fetch(`/api/chatbot/put-chatbot-history`, {
        method: "POST",
        body: JSON.stringify({
          history: messageList,
        }),
      });
      let numAddedDocs = 0;
      setMessageList(
        messageList.map((list) => {
          if (!list._id) numAddedDocs++;
          return {
            ...list,
            _id: "DEFINED",
          };
        })
      );
      if (numAddedDocs > 0)
        callUpdateUser({
          ...accountInfo,
          chatbotHistoryLength: accountInfo.chatbotHistoryLength + numAddedDocs,
        });
      setShouldUpdateBackend(false);
    }
  }, [shouldUpdateBackend]);

  const addMessages = useCallback(
    (newMessages: (MessageProps | CoupledOptions)[]) => {
      const lastIndex = messageList.length - 1;
      if (lastIndex < 0) {
        messageList.push({
          _id: null,
          firebaseId: session.data.user.uid,
          index: 0,
          messages: newMessages,
        });
        setMessageList([...messageList]);
      } else if (
        newMessages.length + messageList[lastIndex].messages.length >
        30
      ) {
        messageList[lastIndex].messages = messageList[
          lastIndex
        ].messages.concat(
          newMessages.slice(0, 30 - messageList[lastIndex].messages.length)
        );
        messageList.push({
          _id: null,
          firebaseId: session.data.user.uid,
          index: messageList[lastIndex].index + 1,
          messages: newMessages.slice(
            30 - messageList[lastIndex].messages.length
          ),
        });
        setMessageList([...messageList]);
      } else {
        messageList[lastIndex].messages =
          messageList[lastIndex].messages.concat(newMessages);
        setMessageList([...messageList]);
      }
    },
    [messageList]
  );

  const handleMessageSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!currMessageText) {
        return;
      }
      setAwaitingChatbotResponse(true);
      const messageOriginal = currMessageText;
      addMessages([
        { message: currMessageText, isOnLeft: false },
        {
          message: <div className={styles.chatbotLoading}>...</div>,
          isOnLeft: true,
        },
      ]);
      setCurrMessageText("");
      document.getElementById("chatbot-input").innerHTML = "";
      const { response, responseId } = await callGetChatbotResponse(
        currMessageText,
        accountInfo.name,
        accountInfo.email,
        questionResponses.filter(({ questionId }) => {
          return (
            questionId === "627e8fe7e97c3c14537dc7f5" ||
            questionId === "61c6b6f2d3054b6dd0f1fc40" ||
            questionId === "61c6b6f2d3054b6dd0f1fc4b"
          );
        })
      ).then((data) => data);
      messageList[messageList.length - 1].messages = messageList[
        messageList.length - 1
      ].messages.slice(0, -1);
      setMessageList([...messageList]);
      addMessages([
        {
          message: response,
          messageId: responseId,
          isOnLeft: true,
          isAnswer: true,
          onDownVote: onDownVote,
          question: messageOriginal,
        },
      ]);
      if (sendPostOnNextQuestion) {
        addMessages([
          {
            message:
              "If you do not like the answer, feel free to give it a thumb down 👎 and we will have a real counselor reply back to you.",
            isOnLeft: true,
          },
        ]);
      }
      setShouldUpdateBackend(true);
      setAwaitingChatbotResponse(false);
      setSendPostOnNextQuestion(false);
    },
    [currMessageText, messageList, sendPostOnNextQuestion]
  );

  const endIntroWorkflow = useCallback(() => {
    setCurrWorkflow("none");
    callUpdateUser({ ...accountInfo, introducedToChatbot: true });
    store.dispatch(
      updateAccountAction({
        ...accountInfo,
        introducedToChatbot: true,
      })
    );
  }, [accountInfo, currWorkflow]);

  const onDownVote = useCallback(
    (message: string, answer: string) => {
      setCurrWorkflow("downvote");
      setPickedOptions((pickedOptions) => [...pickedOptions, []]);
      addMessages(
        getChatbotMessagesFormatted(downvoteWorkflow.e1.chatbotMessages)
      );
      setCurrProblematicMessage({ question: message, answer });
      setCurrOptions(downvoteWorkflow.e1.possibleChoices);
      setShouldUpdateBackend(true);
    },
    [currWorkflow, downvoteWorkflow, currOptions, pickedOptions]
  );

  const onOptionClick = async (option: string) => {
    const workflow =
      currWorkflow === "downvote" ? downvoteWorkflow : introductionWorkflow;
    if (workflow[currOptions[option]]?.backgroundAction) {
      workflow[currOptions[option]].backgroundAction(
        accountInfo,
        currProblematicMessage.question,
        currProblematicMessage.answer,
        pickedOptions[pickedOptions.length - 1][
          pickedOptions[pickedOptions.length - 1].length - 1
        ]
      );
      alertSlackChatbotQuestion({
        email: accountInfo.email,
        name: accountInfo.name,
        resolved: false,
        question: currProblematicMessage.question,
        answer: currProblematicMessage.answer,
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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    messageList[messageList.length - 1].messages = messageList[
      messageList.length - 1
    ].messages.slice(0, -1);
    setMessageList([...messageList]);
    addMessages(
      getChatbotMessagesFormatted(workflow[currOptions[option]].chatbotMessages)
    );
    setCurrOptions(workflow[currOptions[option]].possibleChoices);
    if (!workflow[currOptions[option]]?.possibleChoices) {
      if (currWorkflow === "downvote") {
        setCurrWorkflow("none");
      } else {
        endIntroWorkflow();
      }
    }
    setShouldUpdateBackend(true);
  };

  useEffect(() => {
    if (scrollRef?.current && !isLoadingMore)
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    else setIsLoadingMore(false);
  }, [messageList, currOptions, isLoading]);

  useEffect(() => {
    if (currWorkflow === "intro") {
      setPickedOptions((pickedOptions) => [...pickedOptions, []]);
      addMessages(
        getChatbotMessagesFormatted(introductionWorkflow.e1.chatbotMessages)
      );
      setCurrOptions(introductionWorkflow.e1.possibleChoices);
      setShouldUpdateBackend(true);
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
          id="chatbot-history-div"
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
            overflowY: "auto",
          }}
        >
          <div
            className={classNames("pt-3")}
            style={{
              height: "fit-content",
              width: "100%",
              flex: 1,
              display: "flex",
              flexDirection: "column-reverse",
            }}
          >
            {(isLoading && (
              <div className="w-100 h-100 center-child">
                <CircularProgress className="cl-blue" />
              </div>
            )) || (
              <>
                {messageList.length === 0 ? (
                  <p className="align-self-center mb-5 pb-5">
                    No message history
                  </p>
                ) : null}
                <InfiniteScroll
                  scrollableTarget="chatbot-history-div"
                  className="pb-5 pe-1"
                  inverse={true}
                  dataLength={messageList.length} //This is important field to render the next data
                  next={() => {
                    loadMoreHistory();
                  }}
                  hasMore={true}
                  loader={<CircularProgress className="cl-blue" />}
                  endMessage={
                    <p style={{ textAlign: "center" }}>
                      <b>Yay! You have seen it all</b>
                    </p>
                  } // https://www.npmjs.com/package/react-infinite-scroll-component for infinite scroll
                >
                  {messageList.length < accountInfo.chatbotHistoryLength && (
                    <div className="w-100 center-child">
                      <a
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          loadMoreHistory();
                        }}
                        style={{ alignSelf: "center" }}
                        className="cl-blue"
                      >
                        Load More
                      </a>
                    </div>
                  )}
                  {messageList.reduce(
                    (prevHistory, history, historyIndex) =>
                      prevHistory.concat(
                        history.messages.map((object, index) => {
                          if ((object as CoupledOptions).areOptions) {
                            const { options, pickedIndex } =
                              object as CoupledOptions;
                            return (
                              <div
                                key={index}
                                className={`d-flex flex-row w-100 my-3 justify-content-end align-items-end`}
                              >
                                <div className="d-flex flex-row align-items-center justify-content-end flex-wrap w-50">
                                  {Object.keys(options).map((option, idx) => (
                                    <ChatOption
                                      isChosen={idx === pickedIndex}
                                      onClick={() => {}}
                                      option={option}
                                      key={idx}
                                    />
                                  ))}
                                </div>
                              </div>
                            );
                          }
                          const {
                            message,
                            messageId,
                            isOnLeft,
                            isAnswer,
                            question,
                            onDownVote,
                          } = object as MessageProps;
                          return (
                            <Message
                              key={index}
                              dontShowPicture={
                                isOnLeft &&
                                index < messageList.length - 1 &&
                                (
                                  messageList[historyIndex].messages[
                                    index + 1
                                  ] as MessageProps
                                ).isOnLeft
                              }
                              question={question}
                              message={message}
                              messageId={messageId}
                              userName={accountInfo.name}
                              isOnLeft={isOnLeft}
                              isAnswer={isAnswer}
                              onDownVote={onDownVote}
                            />
                          );
                        })
                      ),
                    []
                  )}
                  {currOptions && (
                    <div
                      className={`d-flex flex-row w-100 my-3 justify-content-end align-items-end`}
                    >
                      <div className="d-flex flex-row align-items-center justify-content-end flex-wrap w-50">
                        {Object.keys(currOptions).map((option, idx) => (
                          <ChatOption
                            onClick={onOptionClick}
                            option={option}
                            key={idx}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <div ref={scrollRef} />
                </InfiniteScroll>
              </>
            )}
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
              <span
                contentEditable={
                  currWorkflow === "none" && !awaitingChatbotResponse
                }
                role="textbox"
                id="chatbot-input"
                onInput={(e) => {
                  setCurrMessageText(e.currentTarget.textContent);
                }}
                placeholder="Ask anything here"
                className={classNames("py-2 px-3", isMobile ? "ms-1" : "")}
                style={{
                  resize: "vertical",
                  height: "max-content",
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

export default connect((state) => {
  return {
    accountInfo: state.accountInfo,
    questionResponses: state.questionResponses || [],
  };
})(Chatbot);
