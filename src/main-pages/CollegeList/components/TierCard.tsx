import React from "react";
import { collegeListIndivudialInfo } from "src/@types/types";
import CollegeListCard from "src/main-pages/CollegeList/components/CollegeListCard";
import styles from "./componentStyles.module.scss";

import { Droppable } from "react-beautiful-dnd";
interface props {
  name: string;
  collegeList: collegeListIndivudialInfo[];
  RemoveCollegeFromListFunction: Function;
}
const TierCard = ({
  name,
  collegeList,
  RemoveCollegeFromListFunction,
}: props) => {
  return (
    <Droppable droppableId={name}>
      {(provided) => {
        return (
          <div className={styles.mainTierContainer}>
            <p
              className={styles.tierHeader}
            >{`${name} (${collegeList.length})`}</p>
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={styles.innerDroppableDiv}
            >
              <div>
                {collegeList.map((college, index) => {
                  return (
                    <CollegeListCard
                      name={college.college_name}
                      location={college.location}
                      type={college.college_type}
                      college_id={college.college_id}
                      index={index}
                      RemoveCollegeFromListFunction={
                        RemoveCollegeFromListFunction
                      }
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            </div>
          </div>
        );
      }}
    </Droppable>
  );
};

export default TierCard;
