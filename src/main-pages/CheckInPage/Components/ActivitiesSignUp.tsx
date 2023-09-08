/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import MCQQuestion from "src/common/components/Questions/MCQQuestion/MCQQuestion";
import SignUpMCQ, { SignUpMCQInput } from "src/main-pages/CheckInPage/Components/SignUpMCQ";
import SignUpText from "src/main-pages/CheckInPage/Components/SignUpLongText";
import SignUpShortText from "src/main-pages/CheckInPage/Components/SignUpShortText";
import SignUpLongText from "src/main-pages/CheckInPage/Components/SignUpLongText";
import DropDownQuestion from "src/common/components/Questions/DropdownQuestion/DropdownQuestion";
import SignUpDropdown from "src/main-pages/CheckInPage/Components/SignUpDropdown";
import ActivitySummaryCard from "src/main-pages/CheckInPage/Components/ActivitySummaryCard";

interface ActivitiesProps {
  activities: Activity[]
  submitData?: Function
  noRenderButtons?: Function
}

interface Activity {
  activityName: string;
  activityType: string;
  description: string;
  hoursPerWeek: number;
  weeksPerYear: number;
  numberOfYears: number;
  awardLevel: string;
  awardQuality: number;
  leadership: number;
  impact: number;
}

function ActivitiesSignUp(props: ActivitiesProps) {
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [userResponses, setUserResponses] = useState(props);
  const [tempActivity, setTempActivity] = useState({
    activityName: "",
    activityType: "",
    description: "",
    hoursPerWeek: 0,
    weeksPerYear: 0,
    numberOfYears: 2,
    awardLevel: "",
    awardQuality: 0,
    leadership: 0,
    impact: 0
  })

  const toggleEditing = () => {
    setIsAddingActivity(!isAddingActivity);
    props.noRenderButtons();
  }

  const MCQQuestionData: SignUpMCQInput[] = [
    {
      question: "How many hours per week do you spend on this activity?",
      options: [
        {
          optionText: "Under 3 hours per week",
          optionValue: 3
        },
        {
          optionText: "3-5 hours per week",
          optionValue: 5
        },
        {
          optionText: "6-10 hours per week",
          optionValue: 10
        },
        {
          optionText: "11-15 hours per week",
          optionValue: 15
        },
        {
          optionText: "16-25 hours per week",
          optionValue: 25
        },
        {
          optionText: "Over 25 hours per week",
          optionValue: 40
        }
      ]
    },
    {
      question: "How many weeks each year are you engaged in this activity?",
      options: [
        {
          optionText: "Less than 10 weeks per year",
          optionValue: 10
        },
        {
          optionText: "10-25 weeks per year",
          optionValue: 25
        },
        {
          optionText: "26 weeks per year",
          optionValue: 40
        },
        {
          optionText: "Over 40 weeks per year",
          optionValue: 52
        }
      ]
    },
    {
      question: "What is the largest scale award or recognition received through this activity?",
      options: [
        {
          optionText: "Non-Applicable",
          optionValue: "NA"
        },
        {
          optionText: "School / Local",
          optionValue: "school"
        },
        {
          optionText: "State",
          optionValue: "state/regional"
        },
        {
          optionText: "National",
          optionValue: "national"
        },
        {
          optionText: "International",
          optionValue: "international"
        }
      ]
    },
    {
      question: "Please rank the quality of the best award you received in this activity on a scale form 0 (none) - 4 (most).",
      options : [
        {
          optionText: "0",
          optionValue: 1
        },
        {
          optionText: "1",
          optionValue: 2
        },
        {
          optionText: "2",
          optionValue: 3
        },
        {
          optionText: "3",
          optionValue: 4
        },
        {
          optionText: "4",
          optionValue: 5
        },
      ]
    },
    {
      question: "Please rank the amount of leadership involved in this activity on a scale from 0 (least) - 4 (most).",
      options : [
        {
          optionText: "0",
          optionValue: 1
        },
        {
          optionText: "1",
          optionValue: 2
        },
        {
          optionText: "2",
          optionValue: 3
        },
        {
          optionText: "3",
          optionValue: 4
        },
        {
          optionText: "4",
          optionValue: 5
        },
      ]
    },
    {
      question: "Please rank the amount of leadership involved in this activity on a scale from 0 (least) - 4 (most).",
      options : [
        {
          optionText: "1",
          optionValue: 1
        },
        {
          optionText: "2",
          optionValue: 2
        },
        {
          optionText: "3",
          optionValue: 3
        },
        {
          optionText: "4",
          optionValue: 4
        },
      ]
    }
  
  ]

  const handleSubmit = () => {
    console.log(tempActivity);
    if (tempActivity.activityName.length > 0 && tempActivity.activityType.length > 0 &&
        tempActivity.awardLevel.length > 0 && tempActivity.awardQuality > 0 &&
        tempActivity.description.length > 0 && tempActivity.hoursPerWeek > 0 &&
        tempActivity.impact > 0 && tempActivity.leadership > 0 && 
        tempActivity.numberOfYears > 0 && tempActivity.weeksPerYear > 0) {
      userResponses.activities.push(tempActivity);
      toggleEditing();
      setTempActivity({
        activityName: "",
        activityType: "",
        description: "",
        hoursPerWeek: 0,
        weeksPerYear: 0,
        numberOfYears: 2,
        awardLevel: "",
        awardQuality: 0,
        leadership: 0,
        impact: 0
      })
    }
  }
  
  const handleOnDelete = (activityName) => {
    const activityToDelete = userResponses.activities.find((activity) => {
      activity.activityName === activityName;
    })

    userResponses.activities.splice(userResponses.activities.indexOf(activityToDelete), 1);
    const newUserResponses = Object.assign({}, userResponses);
    setUserResponses(newUserResponses);
  }
  
  if (isAddingActivity) {
    return (
      <div className="mb-5">
        <div>
          <div>
            <SignUpShortText
              question="Activity Name"
              onChange={(e) => {
                setTempActivity({
                  activityName: e,
                  activityType: tempActivity.activityType,
                  description: tempActivity.description,
                  hoursPerWeek: tempActivity.hoursPerWeek,
                  weeksPerYear: tempActivity.weeksPerYear,
                  numberOfYears: tempActivity.numberOfYears,
                  awardLevel: tempActivity.awardLevel,
                  awardQuality: tempActivity.awardQuality,
                  leadership: tempActivity.leadership,
                  impact: tempActivity.impact
                })
              }}
              value={tempActivity.activityName}
            />
          </div>
          <div className="d-flex justify-content-center">
            <SignUpDropdown 
              title="" 
              key={undefined} 
              placeholder={"Activity Tag"} 
              valuesList={["Club", "Community Engagement", "Hobbies",
                     "Sports/Athletics", "Work", "Volunteering", "Leadership Ability", 
                     "Research", "Other"]} 
              questionTitle={""} 
              onChange={(e) => {
                setTempActivity({
                  activityName: tempActivity.activityName,
                  activityType: e,
                  description: tempActivity.description,
                  hoursPerWeek: tempActivity.hoursPerWeek,
                  weeksPerYear: tempActivity.weeksPerYear,
                  numberOfYears: tempActivity.numberOfYears,
                  awardLevel: tempActivity.awardLevel,
                  awardQuality: tempActivity.awardQuality,
                  leadership: tempActivity.leadership,
                  impact: tempActivity.impact
                })
              }} 
              defaultValue={tempActivity.activityType}
              />
          </div>
          <div>
            <SignUpLongText
                value={""}
                onChange={(e) => {
                  setTempActivity({
                    activityName: tempActivity.activityName,
                    activityType: tempActivity.activityType,
                    description: e,
                    hoursPerWeek: tempActivity.hoursPerWeek,
                    weeksPerYear: tempActivity.weeksPerYear,
                    numberOfYears: tempActivity.numberOfYears,
                    awardLevel: tempActivity.awardLevel,
                    awardQuality: tempActivity.awardQuality,
                    leadership: tempActivity.leadership,
                    impact: tempActivity.impact
                  })
                }}
                question="Please briefly describe the activity"
            />
          </div>
          <div>
            <SignUpMCQ questionData={MCQQuestionData[0]} 
            onChange={(e) => {
              setTempActivity({
                activityName: tempActivity.activityName,
                activityType: tempActivity.activityType,
                description: tempActivity.description,
                hoursPerWeek: e,
                weeksPerYear: tempActivity.weeksPerYear,
                numberOfYears: tempActivity.numberOfYears,
                awardLevel: tempActivity.awardLevel,
                awardQuality: tempActivity.awardQuality,
                leadership: tempActivity.leadership,
                impact: tempActivity.impact
              })
            }}
            selected={tempActivity.hoursPerWeek} 
            />
          </div>
          <div>
            <SignUpMCQ questionData={MCQQuestionData[1]} onChange={(e) => {
              setTempActivity({
                activityName: tempActivity.activityName,
                activityType: tempActivity.activityType,
                description: tempActivity.description,
                hoursPerWeek: tempActivity.hoursPerWeek,
                weeksPerYear: e,
                numberOfYears: tempActivity.numberOfYears,
                awardLevel: tempActivity.awardLevel,
                awardQuality: tempActivity.awardQuality,
                leadership: tempActivity.leadership,
                impact: tempActivity.impact
              })
            }} 
            selected={tempActivity.weeksPerYear} 
            />
          </div>
          {/* insert multiselect */}
          <div>
            <SignUpMCQ questionData={MCQQuestionData[2]} onChange={(e) => {
              setTempActivity({
                activityName: tempActivity.activityName,
                activityType: tempActivity.activityType,
                description: tempActivity.description,
                hoursPerWeek: tempActivity.hoursPerWeek,
                weeksPerYear: tempActivity.weeksPerYear,
                numberOfYears: tempActivity.numberOfYears,
                awardLevel: e,
                awardQuality: tempActivity.awardQuality,
                leadership: tempActivity.leadership,
                impact: tempActivity.impact
              })
            }}
            selected={tempActivity.awardLevel}  
            />
          </div>
          <div>
            <SignUpMCQ questionData={MCQQuestionData[3]} onChange={(e) => {
              setTempActivity({
                activityName: tempActivity.activityName,
                activityType: tempActivity.activityType,
                description: tempActivity.description,
                hoursPerWeek: tempActivity.hoursPerWeek,
                weeksPerYear: tempActivity.weeksPerYear,
                numberOfYears: tempActivity.numberOfYears,
                awardLevel: tempActivity.awardLevel,
                awardQuality: e,
                leadership: tempActivity.leadership,
                impact: tempActivity.impact
              })
            }}
            selected={tempActivity.awardQuality}  
            />
          </div>
          <div>
            <SignUpMCQ questionData={MCQQuestionData[4]} onChange={(e) => {
              setTempActivity({
                activityName: tempActivity.activityName,
                activityType: tempActivity.activityType,
                description: tempActivity.description,
                hoursPerWeek: tempActivity.hoursPerWeek,
                weeksPerYear: tempActivity.weeksPerYear,
                numberOfYears: tempActivity.numberOfYears,
                awardLevel: tempActivity.awardLevel,
                awardQuality: tempActivity.awardQuality,
                leadership: e,
                impact: tempActivity.impact
              })
            }}
            selected={tempActivity.leadership}  
            />
          </div>
          <div>
            <SignUpMCQ questionData={MCQQuestionData[5]} onChange={(e) => {
              setTempActivity({
                activityName: tempActivity.activityName,
                activityType: tempActivity.activityType,
                description: tempActivity.description,
                hoursPerWeek: tempActivity.hoursPerWeek,
                weeksPerYear: tempActivity.weeksPerYear,
                numberOfYears: tempActivity.numberOfYears,
                awardLevel: tempActivity.awardLevel,
                awardQuality: tempActivity.awardQuality,
                leadership: tempActivity.leadership,
                impact: e
              })
            }} 
            selected={tempActivity.impact} 
            />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn cl-btn-clear mx-2" onClick={() => toggleEditing()}>BACK</button>
          <button className="btn cl-btn-blue mx-2" onClick={() => handleSubmit()}>Add Activity</button>
        </div>
      </div>
    )
  }
  return (
    <div className="">
      <div className="d-flex flex-row justify-content-between">
        <h3>All Activities</h3>
        <button className="btn cl-btn-blue" onClick={() => toggleEditing()}>Add New</button>
      </div>
      <div className="d-flex center-child flex-column">
        {userResponses.activities.map((activity) => {
          return (
            <ActivitySummaryCard 
                activity={activity} 
                question={"test"} 
                onClick={() => {
                  setTempActivity(activity)
                  toggleEditing();
                }}            
                onDelete={(e) => handleOnDelete(e)}
              />
          )
        })}
      </div>
    </div>
  );
}

function ActivityCard(props: Activity) {
  return (
    <div>
      <p>{props.activityName}</p>
    </div>
  )
}

export default ActivitiesSignUp;
