import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import router from "next/router";
import React, { useState, useEffect } from "react";
import CardTask from "src/common/components/Cards/CardTask/CardTask";
import styles from "./part-dropdown.module.scss";
import LockIcon from "@mui/icons-material/Lock";

function PartDropDown({
  pathwayCheckinList,
  title,
  progressRatio,
  isPremium
}: {
  pathwayCheckinList: Array<any>;
  title: string;
  progressRatio: number;
  isPremium?: boolean
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [initialized, setInitialized] = useState(false);
  //console.log(pathwayCheckinList);
  useEffect(() => {
    setInitialized(true);
  }, []);
  return (
    <div
      className={`dropdown-container w-100 d-flex flex-row align-items-stretch`}
    >
      <div className="align-items-center">
        <div
          style={{
            marginTop: "2em",
            width: "2em",
            height: "2em",
            border: "1px solid transparent",
            borderRadius: "1em",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: `${progressRatio * 100}%`,
              backgroundColor: "#2651ed",
            }}
          />
          <div
            style={{
              height: `${(1 - progressRatio) * 100}%`,
              backgroundColor: "#f2f2f7",
            }}
          />
        </div>
        <div
          style={{
            height: "90%",
            width: "2px",
            marginTop: "5px",
            marginLeft: "calc(1em - 1px)",
            borderLeft: "2px dashed #656565",
            backgroundColor: "transparent",
          }}
        />
      </div>
      <div className="d-flex flex-column">
        <button
          className={`dropdown-btn justify-content-start ${styles.dashboardDropdownHover} mb-2 ms-2 px-1 py-2 mt-3`}
          style={{
            width: "20rem",
          }}
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          <div className="text ms-3 cl-dark-text" style={{ fontSize: "1.3em" }}>
            {title}
          </div>
          {!isPremium ? <LockIcon /> : null}
          <div
            className={`${
              isExpanded ? "center-child icon-open" : "center-child icon-close"
            } ms-3 me-2`}
            style={{ width: "12px", height: "12px" }}
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </button>
        <div
          className={`${
            // initialized
            //   ? "dropdown-menu-closed-no-animation"
            isExpanded ? "dropdown-menu-expanded" : "dropdown-menu-closed"
          } flex-row flex-wrap`}
          style={{
            backgroundColor: "transparent"
          }}
        >
          {pathwayCheckinList.map(
            (
              { name, pathwayId, subtasks, coverImage, isCheckin, chunks },
              index
            ) =>
              isCheckin ? (
                <button
                  className="cl-btn-blue align-self-center"
                  style={{ height: "6vh" }}
                  onClick={() => {
                    router.push({
                      pathname: "/ApplicationProfilePage",
                      query: { page: name, chunk: chunks[0].name },
                    });
                  }}
                >
                  {name} Check-in
                </button>
              ) : (
                <CardTask
                  url={"/pathways/[id]"}
                  correctUrl={`/pathways/${pathwayId}`}
                  title={name}
                  subtasks={subtasks}
                  coverImage={coverImage}
                  isPremium={isPremium}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
}
export default PartDropDown;
