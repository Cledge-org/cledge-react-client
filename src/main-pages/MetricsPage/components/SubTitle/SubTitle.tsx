import { useRouter } from "next/router";
import React, { useState } from "react";
const SubTitle = ({
  title,
  isDivider,
  updatePage,
  updateChunk,
}: {
  title: string;
  isDivider?: boolean;
  updatePage: string;
  updateChunk: string;
}) => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="dropdown-container mt-2" style={{ width: "100%" }}>
      <div
        className={`d-flex flex-row align-items-center w-100 cl-dark-text ${
          isDivider ? "mb-2" : "mt-5 mb-2"
        }`}
      >
        <strong style={{ fontSize: "1.6em" }}>{title}</strong>
        <button
          style={{
            outline: "none",
            border: "none",
            backgroundColor: "transparent",
            fontSize: "1.7em",
            color: "black",
          }}
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
          className="center-child"
        >
          <img src="/images/info-circle.svg" />
        </button>
      </div>
      <div
        className={`dropdown-menu-${isExpanded ? "expanded" : "closed"} ${
          isDivider ? "mb-2" : ""
        }`}
        style={{ backgroundColor: "white" }}
      >
        <div
          className={`position-relative d-flex overflow-hidden flex-column align-items-center justify-content-around px-3 pt-3 shadow-sm soft-gray-border`}
          style={{
            height: "30vh",
            borderRadius: "10px",
            width: "50%",
            marginTop: 0,
          }}
        >
          <div
            style={{
              textAlign: "left",
              width: "100%",
              fontSize: "1.3em",
            }}
            className={``}
          >
            <strong style={{ fontSize: "1.3em" }}>
              Already tried some of our tips?
            </strong>
            <br />
            <br />
            Update your profile to help us reaccess your tier and provide more
            personalized tips.
          </div>

          <div
            className="position-absolute top-0 w-100"
            style={{ left: 0, backgroundColor: "#070452", height: "1vh" }}
          />
          <div className="d-flex flex-row py-3 align-items-cetner justify-content-end px-2 w-100">
            <button
              onClick={() => {
                router.push({
                  pathname: "/application-profile",
                  query: { page: updatePage, chunk: updateChunk },
                });
              }}
              className="cl-btn-clear"
            >
              Update my profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SubTitle;
