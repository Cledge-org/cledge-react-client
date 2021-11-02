import { useEffect } from "react";
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

interface CardTaskProps extends CardProps {
  subtasks: any;
}

export default function CardTask({
  title,
  url,
  subtasks,
  onClick,
  textGradient,
}: CardTaskProps) {
  useEffect(() => {}, []);
  var subtasksList = Object.keys(subtasks).map(function (subtask, index) {
    let checkIcon: IconLookup | [IconPrefix, IconName];
    let boxColor: string;
    if (subtasks[subtask]) checkIcon = faCheckSquare;
    else checkIcon = faSquare;

    if (index % 3 === 0) boxColor = "cl-blue";
    else if (index % 3 === 1) boxColor = "cl-yellow";
    else boxColor = "cl-red";

    return (
      <div className="row">
        <div className="col-1">
          <FontAwesomeIcon
            icon={checkIcon}
            style={{ height: "1.6em", margin: "5%" }}
            className={boxColor}
          />
        </div>
        <div className="col-11 cl-mid-gray">{subtask}</div>
      </div>
    );
  });
  return (
    <Card
      textGradient={textGradient}
      title={title}
      child={
        <div className="d-flex flex-column justify-content-evenly ms-3">
          {subtasksList}
          <button className="article-btn">View all</button>
        </div>
      }
      url={url}
      onClick={onClick}
    />
  );
}
