import { faChevronDown, faQuestion } from "@fortawesome/free-solid-svg-icons";
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
import { callGetChatbotResponse } from "src/utils/apiCalls";
import { useRouter } from "next/router";

const Chatbot = ({
  accountInfo,
  questionResponses,
}: {
  accountInfo: AccountInfo;
  questionResponses: UserResponse[];
}) => {
  const [messagesList, setMessagesList] = useState<
    {
      message: string | ReactElement;
      isOnLeft: boolean;
      isAnswer?: boolean;
      question?: string;
    }[]
  >([
    {
      isOnLeft: true,
      message: (
        <>
          <strong>
            Hello there! I’m XYZ, your AI college advisor. Before we get started
            here are a few things to help you get the most out of my
            capabilities.
          </strong>
          <ol type="1">
            <li>Try to ask only one question at a time.</li>
            <li>
              If you have issues getting a new answer, view the Best Practices
              on the left side of your screen.
            </li>
            <li>
              If issues continue and you are still not satisfied with your
              answer, click the “Ask a real counselor” button on the left side
              of your screen and you will receive an updated answer in your
              email within 48 hours.
            </li>
          </ol>
        </>
      ),
    },
  ]);
  const [currMessageText, setCurrMessageText] = useState("");
  const scrollRef = useRef(null);
  const [showingFirstScreen, setShowingFirstScreen] = useState(true);
  const size = useWindowSize();
  const isMobile = size.width < 900 || size.height < 740;
  const router = useRouter();

  useEffect(() => {
    //console.log(messagesList);
  }, [messagesList]);
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
      question: messageOriginal,
    });
    setMessagesList(copyOfMessages2);
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };
  if (accountInfo.checkIns.length > 0) {
    router.push({
      pathname: "/check-ins/[checkIn]",
      query: { checkIn: accountInfo.checkIns },
    });
  }
  if (isMobile && showingFirstScreen) {
    return (
      <LeftPannel
        onReturn={() => {
          setShowingFirstScreen(false);
        }}
        isFullScreen
      />
    );
  }
  return (
    <PageErrorBoundary>
      {isMobile ? (
        <button
          className="position-absolute cl-btn-blue center-child shadow"
          style={{
            width: "5vmax",
            height: "5vmax",
            borderRadius: "2.5vmax",
            right: "5%",
            top: "20%",
            zIndex: 1000,
          }}
          disabled={false}
          onClick={() => {
            setShowingFirstScreen(true);
          }}
        >
          <FontAwesomeIcon icon={faQuestion} style={{ fontSize: "1.4em" }} />
        </button>
      ) : null}
      <div
        style={{
          height: "93vh",
        }}
        className="w-100 d-flex flex-row position-relative"
      >
        {isMobile ? null : <LeftPannel />}
        <div
          className="d-flex flex-column container-fluid"
          style={{ minHeight: "100%", width: isMobile ? "100%" : "70%" }}
        >
          <div
            id="scrollableDiv"
            className={styles.messageScroll}
            style={{
              height: "100%",
              width: "100%",
              overflowY: "auto",
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
              {messagesList.map(
                ({ message, isOnLeft, isAnswer, question }, index) => (
                  <Message
                    key={index}
                    question={question}
                    message={message}
                    userName={accountInfo.name}
                    isOnLeft={isOnLeft}
                    isAnswer={isAnswer}
                  />
                )
              )}
              <div ref={scrollRef} />
            </InfiniteScroll>
          </div>
          <form
            onSubmit={handleMessageSubmit}
            id="messageInputContainer"
            className="position-sticky bottom-0 py-3 d-flex flex-row align-items-center justify-content-center"
            style={{
              flex: 0.1,
              // position: "fixed",
              bottom: 0,
              width: "100%",
              backgroundColor: "white",
            }} // https://github.com/adrianhajdin/chat_application/blob/main/src/components/ChatFeed.jsx for chat feed potentially
          >
            <input
              onChange={(e) => {
                setCurrMessageText(e.target.value);
              }}
              value={currMessageText}
              placeholder="Type something here"
              className="py-1 px-2"
              style={{
                height: size.height < 700 ? "5vmax" : "2.2vmax",
                width: size.width < 800 || size.height < 740 ? "55vw" : "35vw",
                minHeight: "12px",
                outline: "none",
                border: "2px solid #656565",
                borderRadius: "15px",
              }}
            />
            <input
              value="Send"
              type="submit"
              className="cl-btn-blue ms-3 py-2 px-2 center-child"
              style={{
                height: "4vh",
                minHeight: "36px",
                borderRadius: "20px",
                width: size.width < 800 || size.height < 740 ? "20vw" : "12vw",
              }}
            />
          </form>
        </div>
      </div>
    </PageErrorBoundary>
  );
};

Chatbot.requireAuth = true;
// export default connect((state) => ({
//   accountInfo: state.accountInfo,
// }))(Chatbot);
//export default Chatbot;
export default connect((state) => {
  return {
    accountInfo: state.accountInfo,
    questionResponses: state.questionResponses,
  };
})(Chatbot);
