import { faChevronDown, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { minHeight } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fixControlledValue } from "antd/lib/input/Input";
import { connect } from "react-redux";
import { useWindowSize } from "src/utils/hooks/useWindowSize";
import LeftPannel from "src/main-pages/ChatbotPage/components/LeftPanel/LeftPanel";
import styles from "./chatbot-page.module.scss";
import Message from "src/main-pages/ChatbotPage/components/LeftPanel/components/Message/Message";
import PageErrorBoundary from "src/common/components/PageErrorBoundary/PageErrorBoundary";

const Chatbot = ({
  accountInfo,
  questionResponses,
}: {
  accountInfo: AccountInfo;
  questionResponses: UserResponse[];
}) => {
  const [messagesList, setMessagesList] = useState([]);
  const [currMessageText, setCurrMessageText] = useState("");
  const scrollRef = useRef(null);
  const [showingFirstScreen, setShowingFirstScreen] = useState(true);
  const [accessCode, setAccessCode] = useState("");
  const [isIncorrectAccessCode, setIsIncorrectAccessCode] = useState(false);
  const size = useWindowSize();
  const isMobile = size.width < 800;

  useEffect(() => {
    console.log(messagesList);
  }, [messagesList]);
  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const copyOfMessages = messagesList.slice();
    copyOfMessages.push({ message: currMessageText, isOnLeft: true });
    setMessagesList(copyOfMessages);
    copyOfMessages.push({
      message: <div className={styles.chatbotLoading}>...</div>,
      isOnLeft: false,
    });
    setMessagesList(copyOfMessages);
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
    setCurrMessageText("");
    const response = await rephraseSentence(
      currMessageText,
      "Judges Bot",
      questionResponses
    ).then((data) => data);
    const copyOfMessages2 = copyOfMessages.slice(0, -1);
    copyOfMessages2.push({ message: response, isOnLeft: false });
    setMessagesList(copyOfMessages2);
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };
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
            console.log("DADDY");
            setShowingFirstScreen(true);
          }}
        >
          <FontAwesomeIcon icon={faQuestion} style={{ fontSize: "1.4em" }} />
        </button>
      ) : null}
      <div
        style={{ minHeight: "100vh", height: "max-content" }}
        className="w-100 d-flex flex-row position-relative"
      >
        {isMobile ? null : <LeftPannel />}
        {/* https://www.youtube.com/watch?v=P6rNIDnejsg for expandable side pannel */}
        <div
          className="d-flex flex-column align-items-center container-fluid"
          style={{ minHeight: "100%" }}
        >
          {/* {isMobile ? : } */}
          {/* <div
          id="messages"
          className="d-flex flex-column justify-content-evenly overflow-auto px-2"
          style={{
            flex: 1,
            width: "90%",
          }}
        >
          {messagesList.map(({ message, isOnLeft }, index) => (
            <Message key={index} message={message} isOnLeft={isOnLeft} />
          ))}
        </div> */}
          <div
            id="scrollableDiv"
            style={{
              height: "100%",
              width: "100%",
              overflow: "auto",
              display: "flex",
              flexDirection: "column-reverse",
            }}
          >
            {messagesList.length === 0 ? (
              <p className="align-self-center mb-5 pb-5">No message history</p>
            ) : null}
            <InfiniteScroll
              className="pb-5"
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
              {messagesList.map(({ message, isOnLeft }, index) => (
                <Message key={index} message={message} isOnLeft={isOnLeft} />
              ))}
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
                height: size.height < 700 ? "5vh" : "4vh",
                width: size.width < 800 ? "55vw" : "35vw",
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
                width: size.width < 800 ? "20vw" : "12vw",
              }}
            />
          </form>
        </div>
      </div>
    </PageErrorBoundary>
  );
};

const rephraseSentence = async (
  message: string,
  username: string,
  questionResponses: UserResponse[]
) => {
  return await fetch(
    "https://pacific-lowlands-20884.herokuapp.com/questions/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: message,
        username: username,
        rating: "2.00",
        answer: "default post answer",
        student_info: questionResponses,
      }),
    }
  )
    .then((response) => response.json())
    .then(
      (data) =>
        // console.log(data);
        data.answer
    )
    .catch((error) => {
      console.log(error);
      return "Sorry, no server is currently running";
    });
};

Chatbot.requireAuth = false;
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
