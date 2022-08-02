import {
  faArrowDown,
  faArrowUp,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
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
  dontShowPicture,
}: {
  isOnLeft?: boolean;
  message: string | JSX.Element;
  isAnswer?: boolean;
  question?: string;
  userName: string;
  dontShowPicture?: boolean;
}) => {
  const size = useWindowSize();
  const isMobile = size.width < 800;
  const [vote, setVote] = useState("none");
  return (
    <div
      className={`d-flex flex-row w-100 ${
        !isOnLeft ? "justify-content-end" : ""
      } my-3 align-items-end`}
    >
      {isOnLeft && !dontShowPicture ? (
        <img
          src="/images/chatbot_picture.svg"
          className="me-2"
          style={{ width: size.width < 800 ? "4vmax" : "2.5vmax" }}
        />
      ) : (
        dontShowPicture && (
          <div
            className="me-2"
            style={{ width: size.width < 800 ? "4vmax" : "2.5vmax" }}
          />
        )
      )}
      <div
        style={{
          border: "1px solid #C1C0CE",
          borderRadius: "20px",
          backgroundColor: isOnLeft ? "#F2F1FA" : "white",
          borderBottomLeftRadius: isOnLeft ? 0 : "20px",
          borderBottomRightRadius: isOnLeft ? "20px" : 0,
          minWidth: "15vw",
          overflowWrap: "break-word",
          maxWidth: size.width < 800 ? "60vw" : "45vw",
        }}
        className="p-3 position-relative cl-dark-text"
      >
        {message}
        {isAnswer && (
          <div
            className="position-absolute d-flex flex-row justify-content-between"
            style={{
              width: isMobile ? "10vw" : "3vw",
              right: "5px",
              bottom: "-10px",
              borderRadius: "5px",
              background: "transparent",
            }}
          >
            <div
              style={{
                borderTopLeftRadius: "15px",
                borderBottomLeftRadius: "15px",
                border: "2px solid #506BED",
                color: vote === "upvote" ? "white" : "#506BED",
                backgroundColor: vote === "upvote" ? "#506BED" : "white",
                width: "48%",
                fontSize: "12px",
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
                "center-child py-1",
                vote === "upvote" ? styles.voteBtnSelected : styles.voteBtn
              )}
            >
              <FontAwesomeIcon icon={faThumbsUp} />
            </div>
            <div
              style={{
                borderTopRightRadius: "15px",
                borderBottomRightRadius: "15px",
                border: "2px solid #506BED",
                color: vote === "downvote" ? "white" : "#506BED",
                backgroundColor: vote === "downvote" ? "#506BED" : "white",
                width: "48%",
                fontSize: "12px",
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
                "center-child py-1",
                vote === "downvote" ? styles.voteBtnSelected : styles.voteBtn
              )}
            >
              <FontAwesomeIcon
                style={{ transform: "scale(-1, 1)" }}
                icon={faThumbsDown}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Message;
