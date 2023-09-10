import React from "react";
import { collegeListIndividualInfo } from "src/@types/types";
import CollegeListCard from "src/main-pages/CollegeList/components/CollegeListCard";
import styles from "./componentStyles.module.scss";
import { Divider } from "antd";
import { Droppable } from "react-beautiful-dnd";
interface props {
  name: string;
  collegeList: collegeListIndividualInfo[];
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
            <Divider />
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={styles.innerDroppableDiv}
            >
              <div>
                {collegeList.map((college, index) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <CollegeListCard
                      name={college.college_name}
                      location={college.location}
                      img={college.img_url}
                      type={college.college_type}
                      college_id={college.college_id}
                      college_title={college.college_name}
                      index={index}
                      RemoveCollegeFromListFunction={
                        (college_title) => RemoveCollegeFromListFunction(college_title)
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
