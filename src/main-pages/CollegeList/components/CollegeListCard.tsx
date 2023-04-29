import Link from "next/link";
import React, { useState } from "react";
import styles from "./componentStyles.module.scss";
import { Draggable } from "react-beautiful-dnd";
import { BiTrash } from "react-icons/bi";
interface Props {
  name: string;
  location: string;
  type: string;
  college_id: string;
  college_title: string;
  img: string;
  index: number;
  RemoveCollegeFromListFunction: Function;
}
function CollegeListCard({
  name,
  location,
  type,
  img,
  college_id,
  college_title,
  index,
  RemoveCollegeFromListFunction,
}: Props) {
    const [imageHasLoaded, setImageHasLoaded] = useState(false);
    if (type == "Private for-profit" || type == "Private non-profit")
      type = "Private";
  return (
    <Draggable key={college_id} draggableId={college_id} index={index}>
      {(provided) => {
        return (
          <div
            className={styles.cardContainer}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {!img ? (
              <div
                style={{ backgroundColor: "lightgray", height: "100%", width: "90px" }}
                className="center-child w-100"
              >
                No Image for this college
              </div>
            ) : (
              <img
                src={img}
                style={{
                  height: imageHasLoaded ? "auto" : "0",
                  width: "90px",
                  objectFit: "cover",
                }}
                onLoad={() => {
                  setImageHasLoaded(true);
                }}
                alt={name + " Image"}
              />
            )}
            {!imageHasLoaded && img && (
              <div
                className={styles.gradient}
                style={{ height: "100%" }}
              />
            )}
            <div className={styles.contentContainer}>
              <div className={styles.titleContainer}>
                <p className={styles.collegeName}>{name}</p>
                <div
                  style={{ cursor: "pointer", border: "none" }}
                  onClick={() => {
                    RemoveCollegeFromListFunction(college_title);
                  }}
                >
                  <BiTrash />
                </div>
              </div>
              <div className={styles.info}>
                <div>
                  <span>{location + " "}</span>
                  |  
                  <span>{" " + type}</span>
                </div>
                <Link href={`/collegeDetail/${college_id}`}>
                  <u color="#0B1142" style={{ cursor: "pointer" }}>
                    See details
                  </u>
                </Link>
              </div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}

export default CollegeListCard;
