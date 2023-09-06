import React, { useState } from "react";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";

Modal.defaultStyles.overlay.backgroundColor = "rgba(177, 176, 176, 0.6)";
import styles from "./ec-question-summary-card.module.scss";
import classNames from "classnames";

interface Activity {
  activityName: string;
  activityType: string;
  description: string;
  hoursPerWeek: number;
  weeksPerYear: number;
  numberOfYears: number;
  awardLevel: string;
  awardQuality: number;
  leadership: number;
  impact: number;
}

interface ECQuestionSummaryCardProps {
  activity: Activity;
  question: string
  onClick: Function;
  altText?: string;
  onDelete?: Function
}

export default function ECQuestionSummaryCard({
  activity,
  onClick,
  altText,
  onDelete
}: ECQuestionSummaryCardProps) {
  return (
    <div
      className={classNames(
        "w-100 d-flex flex-column justify-content-evenly",
        styles.qsummaryCardContainer,
        "mt-3"
      )}
      style={{ maxWidth: "40rem" }}
    >
      <div className="d-flex justify-content-between align-items-center px-4 pt-3 question-text">
        <button
          onClick={() => onDelete(activity.activityName)}
          className={classNames(styles.iconBtn, "center-child")}
        >
          <div
            onClick={() => {
              onDelete(activity.activityName)
            }}
            style={{ width: "40%" }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </button>
      </div>
      <div
        className={classNames(
          "w-100 d-flex flex-row align-items-center justify-content-between border-top border-2",
          styles.ecsummaryInfoContainer
        )}
      >
        <div className="mx-5 my-2">
          <p>Activity Name:</p>
        </div>
        <div className="mx-5 my-2">
          <p>{activity.activityName}</p>
        </div>
      </div>

      <div
        className={classNames(
          "w-100 d-flex flex-row align-items-center justify-content-between border-top border-2",
          styles.ecsummaryInfoContainer
        )}
      >
        <div className="mx-5 my-2">
          <p>Type:</p>
        </div>
        <div className="mx-5 my-2">
          <p>{activity.activityType}</p>
        </div>
      </div>

      <div
        className={classNames(
          "w-100 d-flex flex-row align-items-center justify-content-between border-top border-2",
          styles.ecsummaryInfoContainer
        )}
      >
        <div className="mx-5 my-2">
          <p>Description:</p>
        </div>
        <div className="mx-5 my-2">
          <p>{activity.description}</p>
        </div>
      </div>

    </div>
  );
}
