/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import MCQQuestion from "src/common/components/Questions/MCQQuestion/MCQQuestion";
import SignUpMCQ, { SignUpMCQInput } from "src/main-pages/CheckInPage/Components/SignUpMCQ";

interface ActivitiesProps {
  activities: Activity[]
  submitData?: Function
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
    numberOfYears: 0,
    awardLevel: "",
    awardQuality: 0,
    leadership: 0,
    impact: 0
  })

  const MCQQuestionData: SignUpMCQInput[] = [
    {
      question: "How many hours per week do you spend on this activity?",
      options: [
        {
          optionText: "Under 3 hours per week",
          optionValue: 3
        }
      ]
    }
  ]

  const handleSubmit = () => {
    userResponses.activities.push(tempActivity);
    setTempActivity({
      activityName: "",
      activityType: "",
      description: "",
      hoursPerWeek: 0,
      weeksPerYear: 0,
      numberOfYears: 0,
      awardLevel: "",
      awardQuality: 0,
      leadership: 0,
      impact: 0
    })
    setIsAddingActivity(false);
    console.log(userResponses);
  }
  
  if (isAddingActivity) {
    
    return (
      <div>
        <div>
          <div>
            <input
              defaultValue={""}
              placeholder="Activity Name"
              onChange={(e) => {
                setTempActivity({
                  activityName: e.target.value,
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
          <div>
            <select 
              id="dropdown"
            >
              <option selected value="Clubs">Clubs</option>
              <option value="Sports">Sports</option>
            </select>
          </div>
          <div>
            <input
                defaultValue={""}
                placeholder="Please briefly describe the activity"
            />
          </div>
          <div>
            <SignUpMCQ questionData={MCQQuestionData[0]} />
          </div>
        </div>
        
        <button onClick={() => setIsAddingActivity(false)}>BACK</button>
        <button onClick={() => handleSubmit()}>Add Activity</button>
      </div>
    )
  }
  return (
    <div>
      <div className="d-flex flex-row justify-content-between">
        <h3>All Activities</h3>
        <button onClick={() => setIsAddingActivity(true)}>Add New</button>
      </div>
      <div>
        {userResponses.activities.map((activity) => {
          return (
            <ActivityCard 
              activityName={activity.activityName}
              activityType={activity.activityType}
              description={activity.description}
              hoursPerWeek={activity.hoursPerWeek}
              weeksPerYear={activity.weeksPerYear}
              numberOfYears={activity.numberOfYears}
              awardLevel={activity.awardLevel}
              awardQuality={activity.awardQuality}
              leadership={activity.leadership}
              impact={activity.impact}
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
