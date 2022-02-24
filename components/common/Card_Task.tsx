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

interface CardTaskProps {
  subtasks: any;
  correctUrl: string;
  videoId: string;
  title: string;
  url: string;
}

export default function CardTask({
  title,
  url,
  subtasks,
  videoId,
  correctUrl,
}: CardTaskProps) {
  useEffect(() => {}, []);
  const classNames = "p-3 px-4";
  var subtasksRatio = () => {
    let finished = 0;
    Object.keys(subtasks).forEach((subtask, index) => {
      if (subtasks[subtask]) {
        finished++;
      }
    });
    return finished / Object.keys(subtasks).length;
  };
  return (
    <Link href={url} as={correctUrl}>
      <span className="col-lg-4 col-md-6 col-xs-12">
        <div
          className={classNames}
          onClick={() => {
            location.href = url;
          }}
        >
          <div
            className="position-relative"
            style={{ minHeight: "30vh", aspectRatio: "16/9" }}
          >
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: `${subtasksRatio() * 100}%`,
                height: "1.5vh",
                backgroundColor: "goldenrod",
                zIndex: 100,
              }}
            />
          </div>
          <div
            className="cl-dark-text fw-bold"
            style={{ width: "100%", fontSize: "1.3em" }}
          >
            {title}
          </div>
        </div>
      </span>
    </Link>
  );
}
