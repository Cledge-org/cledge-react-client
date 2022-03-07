import React, { useEffect, useRef, useState } from "react";
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
import { CSSTransition } from "react-transition-group";

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
  console.log(subtasks);
  let [height, setHeight] = useState(0);
  const innerRef = useRef();
  const [isHovering, setIsHovering] = useState(false);
  var subtasksRatio = () => {
    let finished = 0;
    Object.keys(subtasks).forEach((subtask, index) => {
      if (subtasks[subtask].finished) {
        finished++;
      }
    });
    return finished / Object.keys(subtasks).length;
  };
  const finishedContentRatio = (contentProgress) => {
    let finished = 0;
    contentProgress.forEach((isFinished) => {
      if (isFinished) {
        finished++;
      }
    });
    return finished / contentProgress.length;
  };
  useEffect(() => {
    if (height === 0 && innerRef?.current) {
      //!THIS WORKS
      setHeight(innerRef.current.clientHeight);
    }
  }, [innerRef]);
  return (
    <Link href={url} as={correctUrl}>
      <span
        style={innerRef?.current && isHovering ? { height: height } : {}}
        className="d-flex flex-column align-items-center col-lg-3 col-3 col-md-3 col-xs-8 position-relative"
      >
        <span
          ref={innerRef}
          onMouseOver={() => {
            setIsHovering(true);
          }}
          onMouseOut={() => {
            setIsHovering(false);
          }}
          style={{ width: "100%" }}
          className={`d-flex flex-column align-items-center px-2 hover-pointer card-task-container`}
        >
          <div className="w-100">
            <div
              className="position-relative"
              style={{ maxHeight: "25vh", aspectRatio: "16/9", width: "100%" }}
            >
              {videoId?.length === 11 ? (
                <img
                  src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                />
              ) : (
                <div
                  style={{ backgroundColor: "lightgray" }}
                  className="center-child h-100"
                >
                  Thumbnail couldn't load :|
                </div>
              )}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: `${subtasksRatio() * 100}%`,
                  height: "1.5vh",
                  backgroundColor: "#F7BC76",
                  zIndex: 100,
                }}
              />
            </div>
            <div
              className={`cl-dark-text fw-bold ${isHovering ? "py-2" : ""}`}
              style={{
                width: "100%",
                fontSize: "1.3em",
                borderBottom: isHovering ? "1px solid gray" : "none",
              }}
            >
              {title}
            </div>
            {isHovering ? (
              <div>
                {Object.keys(subtasks).map((subtask) => {
                  return (
                    <div className="d-flex flex-row align-items-center py-2 cl-dark-text">
                      {subtask}
                      <div
                        className="cl-mid-gray ms-2"
                        style={{ fontSize: "0.9em" }}
                      >
                        {subtasks[subtask].finished
                          ? "100%"
                          : `${Math.round(
                              finishedContentRatio(
                                subtasks[subtask].contentProgress
                              ) * 100
                            )}%`}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </span>
      </span>
    </Link>
  );
}
