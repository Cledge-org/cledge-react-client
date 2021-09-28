import { useEffect } from "react";

interface TabButtonProps {
  onClick: Function;
  title: String;
  currTab: String;
}
const cledgeBlue = "#2651ed";
export default function TabButton({ onClick, title, currTab }: TabButtonProps) {
  const cledgeBlue = "#2651ed";
  const midGray = "#656565";
  const lowerCaseName = title.toLowerCase();
  return (
    <li
      className="resources-tab-nav-btn col-3 col-lg-2"
      id={lowerCaseName + "-tab"}
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
        <div
          style={{
            height: "3px",
            backgroundColor:
              currTab === lowerCaseName ? cledgeBlue : "transparent",
          }}
        />
      </div>
    </li>
  );
}
