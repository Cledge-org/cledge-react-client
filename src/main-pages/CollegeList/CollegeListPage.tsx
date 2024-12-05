import { connect } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { NextApplicationPage } from "src/main-pages/AppPage/AppPage";
import styles from "./college-list-page.module.scss";
import TierCard from "src/main-pages/CollegeList/components/TierCard";
import { collegeListIndividualInfo } from "src/@types/types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import CollegeListSubTitle from "src/main-pages/CollegeList/components/CollegeListSubTitle";
import { notification } from "antd";
import Footer from "src/common/components/Footer/Footer";


const CollegeListPage: NextApplicationPage<{
  accountInfo: AccountInfo;
  collegeList: collegeListIndividualInfo[]
}> = ({ collegeList }) => {
  const [safetySchools, setSafetySchools] = useState([]);
  const [fitSchools, setFitSchools] = useState([]);
  const [reachSchools, setReachSchools] = useState([]);
  const [reloadCounter, setReloadCounter] = useState(0);
  const [changesMade, setChangesMade] = useState(false);
  const firstRender = useRef(false);
  const { data: session } = useSession();
  const openNotification = () => {
    notification.open({
      message: "Success",
      description: "Successfully saved changes to your list",
      duration: 4,
      placement: "bottomRight"
    });
  };
  const handleSubmit = async () => {
    if (changesMade) {
      openNotification();
      setChangesMade(false);
      const response = await fetch(`/api/CST/replace-college-list`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          user_id: session.user.uid,
          college_list: safetySchools.concat(fitSchools).concat(reachSchools),
        }),
      });
      const responseJson = await response.json();
    }
  };


  const handleRemoveCollege = async (college_title: string, fit_type) => {
    if (fit_type == 0) {
      const collegeToDelete = safetySchools.find((college) => {
        return college.college_name == college_title;
      })
  
      if (collegeToDelete != null) {
        safetySchools.splice(safetySchools.indexOf(collegeToDelete), 1);
        const newSchools = Object.assign([], safetySchools);
        setSafetySchools(newSchools);
      }
    } else if (fit_type == 1) {
      const collegeToDelete = fitSchools.find((college) => {
        return college.college_name == college_title;
      })
  
      if (collegeToDelete != null) {
        fitSchools.splice(fitSchools.indexOf(collegeToDelete), 1);
        const newSchools = Object.assign([], fitSchools);
        setFitSchools(newSchools);
      }
    } else {
      const collegeToDelete = reachSchools.find((college) => {
        return college.college_name == college_title;
      })
      if (collegeToDelete != null) {
        reachSchools.splice(reachSchools.indexOf(collegeToDelete), 1);
        const newSchools = Object.assign([], reachSchools);
        setReachSchools(newSchools);
      }
    }

    // setSafetySchools(
    //   collegeList
    //     .filter((colleges) => colleges.fit_type == 0)
    //     .filter((colleges) => colleges.college_name != college_title)    
    // );
    // setFitSchools(
    //   collegeList
    //     .filter((colleges) => colleges.fit_type == 1)
    //     .filter((colleges) => colleges.college_name != college_title)
    // );
    // setReachSchools(
    //   collegeList
    //     .filter((colleges) => colleges.fit_type == 2)
    //     .filter((colleges) => colleges.college_name != college_title)
    // );
    
    // remove from college list
    // const response = await fetch(`/api/CST/remove-college-from-list`, {
    //   method: "PUT",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     user_id: session.user.uid,
    //     college_title: college_title,
    //   }),
    // });
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
      setSafetySchools(collegeList.filter((colleges) => colleges.fit_type == 0));
      setFitSchools(collegeList.filter((colleges) => colleges.fit_type == 1));
      setReachSchools(collegeList.filter((colleges) => colleges.fit_type == 2));
      if (firstRender.current === true) {
        setChangesMade(true);
      }
      firstRender.current = true;
    } else {
      setSafetySchools([]);
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
                variant={changesMade ? "contained" : "outlined"}
                style={{ textTransform: "none" }}
                onClick={handleSubmit}
              >
                Save Changes
              </Button>
            </div>
          </div>
          
          <div>
            <CollegeListSubTitle/>
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
              collegeList={safetySchools}
              RemoveCollegeFromListFunction={(title) => handleRemoveCollege(title, 0)}
            />
            <TierCard
              name="Fit Schools"
              collegeList={fitSchools}
              RemoveCollegeFromListFunction={(title) => handleRemoveCollege(title, 1)}
            />
            <TierCard
              name="Reach Schools"
              collegeList={reachSchools}
              RemoveCollegeFromListFunction={(title) => handleRemoveCollege(title, 2)}
            />
          </div>
        </DragDropContext>
      </div>
      <Footer />
    </div>
  );
};

export default connect((state) => ({
  accountInfo: state.accountInfo,
}))(CollegeListPage);
