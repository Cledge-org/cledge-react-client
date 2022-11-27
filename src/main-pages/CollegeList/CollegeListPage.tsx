import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { NextApplicationPage } from "src/main-pages/AppPage/AppPage";
import styles from "./college-list-page.module.scss";
import TierCard from "src/main-pages/CollegeList/components/TierCard";
import {
  collegeListIndividualInfo,
} from "src/@types/types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";

const CollegeListPage: NextApplicationPage<{
  accountInfo: AccountInfo;
  collegeList: collegeListIndividualInfo[];
  setCollegeList;
}> = ({ collegeList, setCollegeList }) => {
  let targetList = [];
  let fitList = [];
  let reachList = [];
  const [targetSchools, setTargetSchools] = useState(targetList);
  const [fitSchools, setFitSchools] = useState(fitList);
  const [reachSchools, setReachSchools] = useState(reachList);

  const [reloadCounter, setReloadCounter] = useState<number>(0);
  const { data: session } = useSession();
  const handleSubmit = async () => {
    const response = await fetch(`/api/cst/replace-college-list`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        user_id: session.user.uid,
        college_list: collegeList,
      }),
    });
    const responseJson = await response.json();
    alert(responseJson.message);
  };

  const handleRemoveCollege = (college_id: string) => {
    const temporaryList = collegeList.filter(
      (college) => college.college_id != college_id
    );
    setReloadCounter(reloadCounter + 1);
  };

  const handleOnDragEnd = (result) => {
    const temporaryList = collegeList;
    if (result.destination.droppableId == result.source.droppableId) {
      const temporaryElement = temporaryList[result.source.index];
      temporaryList.splice(result.source.index, 1);
      temporaryList.splice(result.destination.index, 0, temporaryElement);
      setReloadCounter(reloadCounter + 1);
    }
    if (result.destination.droppableId != result.source.droppableId) {
      if (result.destination.droppableId == "Target Schools") {
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
    <div style={{ marginLeft: "80px", marginRight: "80px" }}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className={styles.myFavDiv}>
          <p className={styles.myFavHeader}>My favorites</p>
          <Button
            variant="contained"
            style={{ textTransform: "none" }}
            onClick={handleSubmit}
          >
            Save Changes
          </Button>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TierCard
            name="Target Schools"
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
  );
};

export default connect((state) => ({
  accountInfo: state.accountInfo,
}))(CollegeListPage);
