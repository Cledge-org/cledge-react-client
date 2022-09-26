import React from "react";
interface DashboardTabButtonProps {
  onClick: Function;
  title: String;
  currTab: String;
}
function DashboardTabButton({
  onClick,
  title,
  currTab,
}: DashboardTabButtonProps) {
  const cledgeBlue = "#2651ed";
  const midGray = "#656565";
  const lowerCaseName = title.toLowerCase();
  return (
    <li
      className="general-tab-nav-btn flex-column"
      id={lowerCaseName + "-tab"}
      style={{ border: "none", width: "12rem" }}
      onClick={() => {
        onClick(lowerCaseName);
      }}
    >
      <div
        style={{
          width: "fit-content",
          color: currTab === lowerCaseName ? cledgeBlue : midGray,
          fontWeight: currTab === lowerCaseName ? 700 : 500,
        }}
      >
        {title}
      </div>
      {/* <div
        style={{
          height: "3px",
          width: "100%",
          backgroundColor: currTab === lowerCaseName ? cledgeBlue : midGray,
        }}
      /> */}
    </li>
  );
}
export default DashboardTabButton;
