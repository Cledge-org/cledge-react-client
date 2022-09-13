import Link from "next/link";
import React from "react";
import styles from "./componentStyles.module.scss";
import { Draggable } from "react-beautiful-dnd";
import { MdOutlineCancel } from "react-icons/md";
interface Props {
  name: string;
  location: string;
  type: "Public" | "Private";
  college_id: string;
  index: number;
  RemoveCollegeFromListFunction: Function;
}
function CollegeListCard({
  name,
  location,
  type,
  college_id,
  index,
  RemoveCollegeFromListFunction,
}: Props) {
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
            <div className={styles.titleContainer}>
              <p className={styles.collegeName}>{name}</p>
              <MdOutlineCancel
                onClick={() => {
                  RemoveCollegeFromListFunction(college_id);
                }}
              />
            </div>

            <div>
              <div>
                <span>{location}</span>
              </div>
              <div>
                <span>{type}</span>
              </div>
              <Link href="/my-learning">
                <u color="#0B1142">See details</u>
              </Link>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}

export default CollegeListCard;
