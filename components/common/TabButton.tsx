
import { useEffect } from "react";

interface TabButtonProps{
  onClick: Function,
  title: String,
  currTab: String,
}
const cledgeBlue = "#2651ed";
export default function TabButton({onClick, title, currTab}:TabButtonProps) {

  useEffect(() => {}, []);
  return (
    <button
          onClick={()=>onClick()}
          className="resources-tab-nav-btn col-4  col-lg-2"
        >
          <div>
            {title}
            <div
              style={{
                height: "3px",
                backgroundColor:
                  currTab.toLowerCase() === title.toLowerCase() ? cledgeBlue : "transparent",
              }}
            />
          </div>
        </button>
  );
}
