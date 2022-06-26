import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { string } from "prop-types";
import { useState } from "react";
import { callChatbotVote } from "src/utils/apiCalls";
import { useWindowSize } from "src/utils/hooks/useWindowSize";
import styles from "./message.module.scss";

const Message = ({
  isOnLeft,
  message,
  question,
  isAnswer,
  userName,
}: {
  isOnLeft?: boolean;
  message: string | JSX.Element;
  isAnswer?: boolean;
  question?: string;
  userName: string;
}) => {
  const size = useWindowSize();
  const isMobile = size.width < 800;
  const [vote, setVote] = useState("none");
  return (
    <div
      className={`d-flex flex-row w-100 ${
        !isOnLeft ? "justify-content-end" : ""
      } my-3`}
    >
      {isOnLeft ? (
        <img
          src="/images/chatbot_picture.svg"
          className="me-2"
          style={{ width: size.width < 800 ? "4vmax" : "2.5vmax" }}
        />
      ) : null}
      <div
        style={{
          border: "1px solid gray",
          borderRadius: "10px",
          minWidth: "15vw",
          // width: "fit-content",
          overflowWrap: "break-word",
          // https://css-tricks.com/almanac/properties/o/overflow-wrap/
          maxWidth: size.width < 800 ? "60vw" : "45vw",
        }}
        className="p-2 position-relative"
      >
        {message}
        {isAnswer && (
          <div
            className="position-absolute d-flex flex-row bg-light-gray"
            style={{
              width: isMobile ? "10vw" : "3vw",
              right: "5px",
              bottom: "-10px",
              borderRadius: "5px",
            }}
          >
            <div
              style={{
                borderRight: "1px solid #E0DFE8",
                borderTopLeftRadius: "5px",
                borderBottomLeftRadius: "5px",
              }}
              onClick={() => {
                if (vote === "upvote") {
                  setVote("none");
                } else {
                  setVote("upvote");
                  callChatbotVote(question, message as string, true, userName);
                }
              }}
              className={classNames(
                "w-50 center-child py-1",
                vote === "upvote" ? styles.voteBtnSelected : styles.voteBtn
              )}
            >
              <FontAwesomeIcon icon={faArrowUp} />
            </div>
            <div
              style={{
                borderLeft: "1px solid #E0DFE8",
                borderTopRightRadius: "5px",
                borderBottomRightRadius: "5px",
              }}
              onClick={() => {
                if (vote === "downvote") {
                  setVote("none");
                } else {
                  callChatbotVote(question, message as string, false, userName);
                  setVote("downvote");
                }
              }}
              className={classNames(
                "w-50 center-child py-1",
                vote === "downvote" ? styles.voteBtnSelected : styles.voteBtn
              )}
            >
              <FontAwesomeIcon icon={faArrowDown} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Message;
