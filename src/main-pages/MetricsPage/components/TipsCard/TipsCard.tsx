import { useRouter } from "next/router";
import React from "react";
const TipsCard = ({
  title,
  tips,
  isOverall,
}: {
  title: string;
  tips: string[];
  isOverall?: boolean;
}) => {
  const router = useRouter();
  return (
    <div
      className={`position-relative d-flex overflow-hidden flex-${
        isOverall ? "row" : "column"
      } align-items-center justify-content-${
        isOverall ? "between" : "around"
      } w-100 px-3 pt-3 shadow-sm soft-gray-border`}
      style={{
        height: "30vh",
        borderRadius: "10px",
        marginTop: isOverall ? "10vh" : 0,
      }}
    >
      <div
        style={{
          textAlign: "left",
          width: isOverall ? "40%" : "100%",
          height: isOverall ? "100%" : "auto",
        }}
        className={``}
      >
        <strong style={{ fontSize: "1.3em" }}>Tips</strong>
        <br />
        {title}
      </div>
      <div
        className={`d-flex flex-column align-items-center justify-content-evenly`}
        style={{ height: "95%", width: isOverall ? "40%" : "100%" }}
      >
        {tips.map((tip) => (
          <div
            className="py-2 w-100 px-2 center-child soft-gray-border justify-content-start"
            style={{
              height: "5vh",
              borderRadius: "10px",
            }}
          >
            {tip}
          </div>
        ))}
        <div
          className="position-absolute top-0 w-100"
          style={{ left: 0, backgroundColor: "#F2F2F7", height: "1vh" }}
        />
      </div>
      {!isOverall ? (
        <div className="d-flex flex-row py-3 align-items-cetner justify-content-end px-2 w-100">
          <button
            onClick={() => {
              router.push({
                pathname: "/progress",
                query: { page: "Extracurriculars", chunk: "All Activities" },
              });
            }}
            className="cl-btn-clear"
          >
            Update my profile
          </button>
        </div>
      ) : null}
    </div>
  );
};
export default TipsCard;
