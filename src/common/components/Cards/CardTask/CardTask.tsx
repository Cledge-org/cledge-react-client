import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import styles from "./card-task.module.scss";
import classNames from "classnames";
interface CardTaskProps {
  subtasks: any;
  correctUrl: string;
  coverImage: string;
  title: string;
  url: string;
  isPremium: boolean
}

export default function CardTask({
  title,
  url,
  subtasks,
  coverImage,
  correctUrl,
  isPremium
}: CardTaskProps) {
  useEffect(() => {}, []);
  const [isHovering, setIsHovering] = useState(false);
  useEffect(() => {}, [isHovering]);
  let numSubtasks = Object.keys(subtasks).length;
  return (
    <Link href={isPremium ? url : "/auth/premium"} as={isPremium ? correctUrl : "/auth/premium"}>
      <div
        key={title}
        onMouseOver={() => {
          if (!isHovering) {
            setIsHovering((prevIsHovering) => {
              return prevIsHovering ? false : true;
            });
          }
        }}
        onMouseOut={() => {
          setIsHovering(false);
        }}
      >
        <Card
          className={classNames("my-3 mx-4", styles.newCardTaskContainer)}
          style={{
            border: "thin solid #d3d3d3",
            borderRadius: "15px",
            width: "18rem",
            opacity: isPremium ? "100%" : "50%"
          }}
        > 
          <div
            className="position-relative"
            style={{ aspectRatio: "16/9", width: "100%", borderRadius: "15px" }}
          >
            {coverImage ? (
              <Card.Img
                style={{
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                }}
                variant="top"
                src={coverImage}
              />
            ) : (
              <div
                style={{
                  backgroundColor: "lightgray",
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                }}
                className="center-child h-100 w-100"
              >
                Thumbnail couldn't load :|
              </div>
            )}
          </div>

          <Card.Body>
            <div
              className="d-flex flex-column justify-content-between"
              style={{ height: "6rem" }}
            >
              <Card.Title style={{ fontSize: "1.1rem" }}>{title}</Card.Title>
              <div className="d-flex justify-content-between align-items-end">
                {numSubtasks > 1 ? (
                  <text className="text-secondary">{numSubtasks} Sections</text>
                ) : (
                  <text className="text-secondary">{numSubtasks} Section</text>
                )}
                <button
                  style={{
                    backgroundColor: "transparent",
                    border: "0px",
                    color: "#2651ed",
                  }}
                >
                  View all
                </button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Link>
  );
}
