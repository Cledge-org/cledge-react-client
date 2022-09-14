import React, { useEffect, useRef, useState } from "react";
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
import Card from 'react-bootstrap/Card'
import { CSSTransition } from "react-transition-group";
import classNames from "classnames";
import styles from "./card-task.module.scss";
import { auto } from "@popperjs/core";
interface CardTaskProps {
  subtasks: any;
  correctUrl: string;
  coverImage: string;
  title: string;
  url: string;
}

export default function CardTask({
  title,
  url,
  subtasks,
  coverImage,
  correctUrl,
}: CardTaskProps) {
  useEffect(() => {}, []);
  //console.log(coverImage);
  const [isHovering, setIsHovering] = useState(false);
  useEffect(() => {
    //console.log(isHovering);
  }, [isHovering]);
  let numSubtasks = Object.keys(subtasks).length;
  return (
    <Link href={url} as={correctUrl}>
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
          //console.log("MOUSE OUT");
          setIsHovering(false);
        }}
      > 
        <Card 
          className="my-3 mx-4 overflow-hidden" 
          style={{ 
            border: "thin solid #d3d3d3",
            borderRadius: "15px",
            width: '21rem',
            boxShadow: isHovering ? "rgba(0, 0, 0, 0.24) 0px 10px 10px" : "rgba(0, 0, 0, 0.24) 0px 3px 6px",
            cursor: isHovering ? "pointer" : "auto"
          }}
        >
          <div className="position-relative" style={{ aspectRatio: "16/9", width: "100%" }}>
            {coverImage ? 
              (
                <Card.Img variant="top" src={coverImage} />
              )
              :
              (
                <div
                  style={{ backgroundColor: "lightgray" }}
                  className="center-child h-100 w-100"
                >
                  Thumbnail couldn't load :|
                </div>
              )
            }
          </div>
          
          <Card.Body>
            <div className="d-flex flex-column justify-content-between" style={{ height: "8rem"}}>
              <Card.Title>{title}</Card.Title>
              <div className="d-flex justify-content-between align-items-end">
                {numSubtasks > 1 ? 
                  (
                    <text className="text-secondary">{numSubtasks} Sections</text>
                  ) :
                  (
                    <text className="text-secondary">{numSubtasks} Section</text>
                  )
                }
                <button style={{backgroundColor: "transparent", border: "0px", color: "#2651ed"}}>View all</button>
              </div>
              
            </div>
          </Card.Body>
        </Card>
      </div>
    </Link>
  );
}
