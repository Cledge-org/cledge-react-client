import React, { useEffect } from "react";
import Card from "./Card";
import { CardProps } from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faSquare,
  faCheckSquare,
  IconLookup,
  IconName,
  IconPrefix,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface CardTaskProps extends CardProps {
  subtasks: any;
  correctUrl: string;
}

export default function CardTask({
  title,
  url,
  subtasks,
  textGradient,
  correctUrl,
}: CardTaskProps) {
  useEffect(() => {}, []);
  var subtasksList = Object.keys(subtasks).map(function (subtask, index) {
    let checkIcon: IconLookup | [IconPrefix, IconName];
    let boxColor: string;
    if (subtasks[subtask]) checkIcon = faCheckSquare;
    else checkIcon = faSquare;

    if (subtasks[subtask]) boxColor = "cl-blue";
    // else if (index % 3 === 1) boxColor = "cl-yellow";
    else boxColor = "cl-red";

    return (
      <div className="d-flex flex-row align-items-center">
        <FontAwesomeIcon
          style={{ fontSize: "1.75em" }}
          icon={checkIcon}
          className={boxColor}
        />
        <div className="col-11 ps-3 cl-mid-gray" style={{ fontSize: "1.4em" }}>
          {subtask}
        </div>
      </div>
    );
  });
  return (
    <Link href={url} as={correctUrl}>
      <span className="col-lg-4 col-md-6 col-xs-12">
        <Card
          isCardTask
          textGradient={textGradient}
          classNames="col-12 p-3 px-4"
          title={title}
          child={
            <div className="d-flex flex-column h-100 justify-content-start">
              {subtasksList}
            </div>
          }
        />
      </span>
    </Link>
  );
}
