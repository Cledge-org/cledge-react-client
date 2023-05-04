import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { NextApplicationPage } from "src/main-pages/AppPage/AppPage";
import styles from "./college-list-page.module.scss";
import TierCard from "src/main-pages/CollegeList/components/TierCard";
import { collegeListIndividualInfo } from "src/@types/types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";

const CollegeListPage: NextApplicationPage<{
  accountInfo: AccountInfo;
  collegeList: collegeListIndividualInfo[];
}> = ({ collegeList }) => {
  console.log("COLLEGE LIST!!: " + collegeList);
  const [targetSchools, setTargetSchools] = useState([]);
  const [fitSchools, setFitSchools] = useState([]);
  const [reachSchools, setReachSchools] = useState([]);

  const [reloadCounter, setReloadCounter] = useState(0);
  console.log(reloadCounter);
  console.log(targetSchools);
  console.log(fitSchools);
  console.log(reachSchools);
  const { data: session } = useSession();
  const handleSubmit = async () => {
    const response = await fetch(`/api/CST/replace-college-list`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        user_id: session.user.uid,
        college_list: targetSchools.concat(fitSchools).concat(reachSchools),
      }),
    });
    const responseJson = await response.json();
    alert(responseJson.message);
  };

  const handleRemoveCollege = async (college_title: string) => {
    console.log(college_title);
    setTargetSchools(
      collegeList
        .filter((colleges) => colleges.fit_type == 0)
        .filter((colleges) => colleges.college_name != college_title)    
    );
    setFitSchools(
      collegeList
        .filter((colleges) => colleges.fit_type == 1)
        .filter((colleges) => colleges.college_name != college_title)
    );
    setReachSchools(
      collegeList
        .filter((colleges) => colleges.fit_type == 2)
        .filter((colleges) => colleges.college_name != college_title)
    );
    // remove from college list
    const response = await fetch(`/api/CST/remove-college-from-list`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        user_id: session.user.uid,
        college_title: college_title,
      }),
    });
    // const responseJson = await response.json();
    // const temporaryList = collegeList.filter(
    //   (college) => college.college_name != college_title
    // );
  };

  const handleOnDragEnd = (result) => {
    const temporaryList = collegeList;
    if (
      result.destination &&
      result.source && result.destination.droppableId == result.source.droppableId
    ) {
      const temporaryElement = temporaryList[result.source.index];
      temporaryList.splice(result.source.index, 1);
      temporaryList.splice(result.destination.index, 0, temporaryElement);
      setReloadCounter(reloadCounter + 1);
    }
    if (
      result.destination &&
      result.source &&
      result.destination.droppableId != result.source.droppableId
    ) {
      if (result.destination.droppableId == "Safety Schools") {
        temporaryList.map((college) => {
          if (college.college_id == result.draggableId) {
            college.fit_type = 0;
          }
        });
      }
      if (result.destination.droppableId == "Fit Schools") {
        temporaryList.map((college) => {
          if (college.college_id == result.draggableId) {
            college.fit_type = 1;
          }
        });
      }
      if (result.destination.droppableId == "Reach Schools") {
        temporaryList.map((college) => {
          if (college.college_id == result.draggableId) {
            college.fit_type = 2;
          }
        });
      }

      setReloadCounter(reloadCounter + 1);
    }
  };

  useEffect(() => {
    if (collegeList?.length > 0) {
      setTargetSchools(
        collegeList.filter((colleges) => colleges.fit_type == 0)
      );
      setFitSchools(collegeList.filter((colleges) => colleges.fit_type == 1));
      setReachSchools(collegeList.filter((colleges) => colleges.fit_type == 2));
    } else {
      setTargetSchools([]);
      setFitSchools([]);
      setReachSchools([]);
    }
  }, [collegeList, reloadCounter]);
  return (
    <div
      style={{
        minHeight: "calc(100vh - 62px)",
        backgroundColor: "#f0f2f5",
        position: "relative",
      }}
    >
      <div style={{ width: "100%", paddingBottom: "50px" }}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className={styles.myFavDiv}>
            <div className={styles.myFavContent}>
              <p className={styles.myFavHeader}>My College List</p>
              <Button
                variant="contained"
                style={{ textTransform: "none" }}
                onClick={handleSubmit}
              >
                Save Changes
              </Button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              maxWidth: "1500px",
              minHeight: "70vh",
              margin: "auto",
            }}
          >
            <TierCard
              name="Safety Schools"
              collegeList={targetSchools}
              RemoveCollegeFromListFunction={handleRemoveCollege}
            />
            <TierCard
              name="Fit Schools"
              collegeList={fitSchools}
              RemoveCollegeFromListFunction={handleRemoveCollege}
            />
            <TierCard
              name="Reach Schools"
              collegeList={reachSchools}
              RemoveCollegeFromListFunction={handleRemoveCollege}
            />
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default connect((state) => ({
  accountInfo: state.accountInfo,
}))(CollegeListPage);
