/* eslint-disable react/jsx-key */
import React, { useMemo, useState} from "react";
import { NextApplicationPage } from "../AppPage/AppPage";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { connect } from "react-redux";
import { ProgressBar } from "react-bootstrap";
import CheckBoxQuestion from "../../common/components/Questions/CheckboxQuestion/CheckboxQuestion";
import MCQQuestion from "../../common/components/Questions/MCQQuestion/MCQQuestion";
import RankingQuestion from "../../common/components/Questions/RankingQuestion/RankingQuestion";
import TextInputQuestion from "../../common/components/Questions/TextInputQuestion/TextInputQuestion";
import LinearProgress from '@mui/material/LinearProgress';

import {
  updateAccountAction,
  updateTagsAndCheckInsAction,
  updateQuestionResponsesAction,
} from "../../utils/redux/actionFunctions";
import { store } from "../../utils/redux/store";
import styles from "./check-in-page.module.scss";
import { callPutAcademics, callPutQuestionResponses } from "src/utils/apiCalls";
import classNames from "classnames";
import { useWindowSize } from "src/utils/hooks/useWindowSize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import CompositeQuestion from "src/common/components/Questions/CompositeQuestion/CompositeQuestion";
import DoubleTextInputQuestion from "src/common/components/Questions/DoubleTextInputQuestion/DoubleTextInputQuestion";
import DoubleDropdownQuestion from "src/common/components/Questions/DoubleDropdownQuestion/DoubleDropdownQuestion";
import DropdownQuestion from "src/common/components/Questions/DropdownQuestion/DropdownQuestion";
import AcademicsSignUp, { AcademicsProps } from "src/main-pages/CheckInPage/Components/AcademicsSignUp";
import ActivitiesSignUp from "src/main-pages/CheckInPage/Components/ActivitiesSignUp";
import { calculateECTier, calculateGPATier, calculateOverallECTier } from "src/utils/student-metrics/metricsCalculations";
import { collegeListIndividualInfo } from "src/@types/types";

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

const CheckIn: NextApplicationPage<{
  checkInData: QuestionList;
  userResponses: UserResponse[];
  userTags: string[];
  grade: number;
}> = ({ checkInData, userResponses, userTags, grade }) => {
  const [isShowingStart, setIsShowingStart] = useState(true);
  const [isShowingCollegeListGeneration, setIsShowingCollegeListGeneration] = useState(false);
  const [isEditingACEC, setIsEditingACEC] = useState(false);
  const [progress, changeProgress] = useState(0);
  const [page, changePage] = useState(0);
  const [ACECPage, setACECPage] = useState(0);
  const [newTags, setNewTags] = useState([]);
  const [newUserResponses, setNewUserResponses] = useState(userResponses);
  const [noRenderButtons, setNoRenderButtons] = useState(false);
  const data: AcademicsProps = {
    years: [
    {
      title: "9th Grade",
      grade: 9,
      terms: [
        {
          title: "Term 1",
          id: 1,
          courses: []
        },
        {
          title: "Term 2",
          id: 2,
          courses: []
        },
        {
          title: "Term 3",
          id: 3,
          courses: []
        },
        {
          title: "Term 4",
          id: 4,
          courses: []
        },
      ]
    },
    {
      title: "10th Grade",
      grade: 10,
      terms: [
        {
          title: "Term 1",
          id: 1,
          courses: []
        },
        {
          title: "Term 2",
          id: 2,
          courses: []
        },
        {
          title: "Term 3",
          id: 3,
          courses: []
        },
        {
          title: "Term 4",
          id: 4,
          courses: []
        }
      ]
    },
    {
      title: "11th Grade",
      grade: 11,
      terms: [
        {
          title: "Term 1",
          id: 1,
          courses: []
        },
        {
          title: "Term 2",
          id: 2,
          courses: []
        },
        {
          title: "Term 3",
          id: 3,
          courses: []
        },
        {
          title: "Term 4",
          id: 4,
          courses: []
        }
      ]
    },
    {
      title: "12th Grade",
      grade: 12,
      terms: [
        {
          title: "Term 1",
          id: 1,
          courses: []
        },
        {
          title: "Term 2",
          id: 2,
          courses: []
        },
        {
          title: "Term 3",
          id: 3,
          courses: []
        },
        {
          title: "Term 4",
          id: 4,
          courses: []
        }
      ]
    },
  ],
  satScore: 0,
  actScore: 0
}
  const preferenceQuestions: QuestionChunk = 
    {
        _id: null,
        name: "College Fit",
        questions: [
            {
                _id: "schoolSize",
                data: [
                    {
                        op: "Less than 5,000 students",
                        tag: "a",
                    },
                    {
                        op: "5,000 - 15,000 students",
                        tag: "b",
                    },
                    {
                        op: "More than 15,000 students",
                        tag: "c",
                    },
                ],
                isConcatenable: false,
                isRequired: true,
                question: "What is your preferred college size?",
                type: "MCQ"
            },
            {
                _id: "costOfAttendance",
                data: [
                    {
                        op: "Less than $30,000/year",
                        tag: "a",
                    },
                    {
                        op: "$30,000 - $50,000/year",
                        tag: "b",
                    },
                    {
                        op: "Greater than $70,000/year",
                        tag: "c",
                    },
                ],
                isConcatenable: false,
                isRequired: true,
                question: "What is your expected spending amount per year?",
                type: "MCQ"
            },
            {
                _id: "schoolPreference",
                data: [
                    {
                        op: "Public",
                        tag: "a",
                    },
                    {
                        op: "Private",
                        tag: "b",
                    },
                ],
                isConcatenable: false,
                isRequired: true,
                question: "What type of college do you want to get into",
                type: "MCQ"
            },
            {
                _id: "localePreference",
                data: [
                    {
                        op: "Urban",
                        tag: "a",
                    },
                    {
                        op: "Suburban",
                        tag: "b",
                    },
                    {
                        op: "Rural",
                        tag: "c",
                    },
                ],
                isConcatenable: false,
                isRequired: true,
                question: "What is your preference for the college's location in general?",
                type: "MCQ"
            },
            // {
            //     _id: "state",
            //     isConcatenable: false,
            //     isRequired: false,
            //     question: "What state are you currently living in?",
            //     type: "TextInput"
            // },
            // {
            //     _id: "statePreference",
            //     data: [
            //         {
            //             op: "In-state",
            //             tag: "a",
            //         },
            //         {
            //             op: "Out-of-state",
            //             tag: "b",
            //         },
            //     ],
            //     isConcatenable: false,
            //     isRequired: true,
            //     question: "Do you want to attend an in-state college or out-of-state college?",
            //     type: "MCQ"
            // },
            {
                _id: "finAidNeed",
                data: [
                    {
                        op: "Cover less than 30% of your annual cost of college attendance",
                        tag: "a",
                    },
                    {
                        op: "Cover 30 - 60% of your annual cost of college attendance",
                        tag: "b",
                    },
                    {
                        op: "Cover more than 60% of your annual cost of college attendance",
                        tag: "c",
                    },
                ],
                isConcatenable: false,
                isRequired: true,
                question: "What is your expected amount of financial aid (need based)?",
                type: "MCQ"
            },
            {
                _id: "finAidMerit",
                data: [
                    {
                        op: "Cover less than 10% of your annual cost of college attendance",
                        tag: "a",
                    },
                    {
                        op: "Cover 10 - 20% of your annual cost of college attendance",
                        tag: "b",
                    },
                    {
                        op: "Cover more than 20% of your annual cost of college attendance",
                        tag: "c",
                    },
                ],
                isConcatenable: false,
                isRequired: true,
                question: "What is your expected amount of financial aid (merit-based)?",
                type: "MCQ"
            },
        ]
    };

  if (!checkInData.chunks.includes(preferenceQuestions)) {
    checkInData.chunks.push(preferenceQuestions);
  }

  checkInData.chunks = checkInData.chunks.slice(0, 4);

  const initialActivitiesArray: Activity[] = []
  const [academicsResponses, setAcademicsResponses] = useState(data);
  const [activitiesResponses, setActivitiesResponses] = useState(initialActivitiesArray);
  const hiddenFileInput = React.useRef(null);
  const size = useWindowSize();
  const transcriptUpload = () => {
    hiddenFileInput.current.click();
  };
  const session = useSession();
  const router = useRouter();


  const scrollToTop = () => {
    document.body.scrollTo({ top: 0 })
  };


  const toggleButtons = () => {
    setNoRenderButtons(!noRenderButtons);
  }

  const goBack = (e) => {
    e.preventDefault();
    scrollToTop();
    changeProgress(progress - 100 / (checkInData.chunks.length - 1));
    if (page > 0) changePage(page - 1);
  };

  const goForward = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    scrollToTop();
    changeProgress(progress + 100 / (checkInData.chunks.length - 1));
    if (page < checkInData.chunks.length - 1) changePage(page + 1);
  };

  const canGoForward = useMemo(() => {
    for (let i = 0; i < checkInData.chunks[page].questions.length; i++) {
      if (
        checkInData.chunks[page].questions[i].isRequired &&
        !newUserResponses.find(
          ({ questionId }) =>
            questionId === checkInData.chunks[page].questions[i]._id.toString()
        )?.response
      ) {
        return false;
      }
    }
    return true;
  }, [checkInData, page, newUserResponses]);

  const submitForm = async (e: { preventDefault: () => void }) => {
    //REMOVE CHECK IN FROM LIST AND UPLOAD DATA
    setIsShowingCollegeListGeneration(true);
    let checkInList = [];
    let queriedList = new String(router.query.checkIn.slice());
    //THESE WORK
    while (queriedList.indexOf(",") !== -1) {
      checkInList.push(queriedList.substring(0, queriedList.indexOf(",")));
      queriedList = queriedList.substring(queriedList.indexOf(",") + 1);
    }
    checkInList.push(queriedList);
    checkInList.splice(0, 1);
    userTags.length === 0
      ? (userTags = newTags)
      : (userTags = userTags.concat(newTags));
    const newGrade = newUserResponses.find(
      ({ questionId }) => questionId === "61c6b6f2d3054b6dd0f1fc64"
    )?.response;
    const newAddress = newUserResponses.find(
      ({ questionId }) => questionId === "631fc0482734f1eb370771cc"
    )?.response;
    const newName = newUserResponses.find(
      ({ questionId }) => questionId === "6319632cd1e56282060ad38a"
    )?.response;
    console.log("newUserResponses = " + JSON.stringify(newUserResponses));
    console.log("academics = " + JSON.stringify(academicsResponses));
    console.log("activities = " + JSON.stringify(activitiesResponses));


    let res = newUserResponses;

    let schoolSizeLow = null;
    let schoolSizeHigh = null;
    let costOfAttendanceLow = null;
    let costOfAttendanceHigh = null;
    let privatePublic = null;
    let locale = null;
    let state = null;
    let classSize = null;
    let finNeedLow = null;
    let finNeedHigh = null;
    let finMeritLow = null;
    let finMeritHigh = null;

    console.log(res);
    console.log(checkInData.chunks);

    for (let i = 0; i < res.length; i++) {
      if (res[i].questionId == "schoolSize") {
        if (res[i].response == "Less than 5,000 students") {
          schoolSizeLow = 0;
          schoolSizeHigh = 5000;
        } else if (res[i].response == "5,000 - 15,000 students") {
          schoolSizeLow = 5000;
          schoolSizeHigh = 15000;
        } else if (res[i].response == "More than 15,000 students") {
          schoolSizeLow = 15000;
          schoolSizeHigh = null;
        }
      }

      if (res[i].questionId == "costOfAttendance") {
        if (res[i].response == "Less than $30,000/year") {
          costOfAttendanceLow = 0;
          costOfAttendanceHigh = 30000;
        } else if (res[i].response == "$30,000 - $50,000/year") {
          costOfAttendanceLow = 30000;
          costOfAttendanceHigh = 50000;
        } else if (res[i].response == "Greater than $70,000/year") {
          costOfAttendanceLow = 70000;
          costOfAttendanceHigh = null;
        }
      }

      if (res[i].questionId == "schoolPreference") {
        if (res[i].response == "Public") {
          privatePublic = 1;
        } else if (res[i].response == "Private") {
          privatePublic = 2;
        }
      }

      if (res[i].questionId == "localePreference") {
        if (res[i].response == "Urban") {
          locale = 1;
        } else if (res[i].response == "Suburban") {
          locale = 2;
        } else if (res[i].response == "Rural") {
          locale = 3;
        }
      }

      if (res[i].questionId == "finAidNeed") {
        if (res[i].response == "Cover less than 30% of your annual cost of college attendance") {
          finNeedLow = 0;
          finNeedHigh = 30000;
        } else if (res[i].response == "Cover 30 - 60% of your annual cost of college attendance") {
          finNeedLow = 30000;
          finNeedHigh = 60000;
        } else if (res[i].response == "Cover more than 60% of your annual cost of college attendance") {
          finNeedLow = 60000;
          finNeedHigh = null;
        }
      }

      if (res[i].questionId == "finAidMerit") {
        if (res[i].response == "Cover less than 10% of your annual cost of college attendance") {
          finMeritLow = 0;
          finMeritHigh = 10000;
        } else if (res[i].response == "Cover 10 - 20% of your annual cost of college attendance") {
          finMeritLow = 10000;
          finMeritHigh = 20000;
        } else if (res[i].response == "Cover more than 20% of your annual cost of college attendance") {
          finMeritLow = 20000;
          finMeritHigh = null;
        }
      }

      if (res[i].questionId == "statePreference") {
        if (res[i].response == "In-State") {
          state = res[4].response;
        } else if (res[i].response == "Out-of-State") {
          state = null;
        }
      }
    }


    let allECTierArray = [];
    for (let i = 0; i < activitiesResponses.length; i++) {
      const singleECTier = await calculateECTier(
        activitiesResponses[i].hoursPerWeek,
        activitiesResponses[i].weeksPerYear,
        activitiesResponses[i].numberOfYears,
        4,
        activitiesResponses[i].awardQuality,
        activitiesResponses[i].leadership,
        activitiesResponses[i].impact
        )
      allECTierArray.push(singleECTier);
    }
    let userECTier = 0;
    if (allECTierArray.length != 0) {
      userECTier = await calculateOverallECTier(allECTierArray);
    }

    console.log(activitiesResponses)

    console.log(allECTierArray)
    console.log("OVERALL EC TIER " + await userECTier);

    // gpa tier
    let totalGPA = 0;
    let totalTerms = 0;
    academicsResponses.years.forEach((year) => {
      year.terms.forEach((term) => {
        if (term.courses.length > 0 && term.gpa != null) {
          totalGPA += term.gpa;
          totalTerms++;
        }
      })
    })

    let userGPA = totalGPA / totalTerms;

    let userGPATier = await calculateGPATier(2, userGPA);

    if (Number.isNaN(userGPATier)) {
      userGPATier = 0;
    }

    console.log("USER GPA TIER: " + userGPATier)

    let studentAppLevel = 3;
    newUserResponses.forEach((res) => {
      if (res.questionId == "627e8fe7e97c3c14537dc7f5") {
        studentAppLevel = Number.parseInt(res.response.charAt(6));
      }
    })

    const requestFormat = {
      preferences: {
        schoolSize: {
          low_val: schoolSizeLow,
          high_val: schoolSizeHigh,
          preferenceLevel: 1
        },
        costOfAttendance: {
          low_val: costOfAttendanceLow,
          high_val: costOfAttendanceHigh,
          preferenceLevel: 1
        },
        schoolPreference: {
          low_val: privatePublic,
          high_val: privatePublic,
          preferenceLevel: 1
        },
        localePreference: {
          low_val: locale,
          high_val: locale,
          preferenceLevel: 1
        },
        statePreference: {
          low_val: state,
          high_val: state,
          preferenceLevel: 1
        },
        classSize: {
          low_val: classSize,
          high_val: classSize,
          preferenceLevel: 1,
        },
        finAidNeed: {
          low_val: finNeedLow,
          high_val: finNeedHigh,
          preferenceLevel: 1,
        },
        finAidMerit: {
          low_val: finMeritLow,
          high_val: finMeritHigh,
          preferenceLevel: 1,
        }
      },
      ECTier: userECTier,
      courseworkTier: 5,
      GPATier: userGPATier,
      studFirstGen: 0,
      studSATScore: academicsResponses.satScore == undefined ? 0 : Number.parseInt(academicsResponses.satScore + ""),
      studACTScore: academicsResponses.actScore == undefined ? 0 : Number.parseInt(academicsResponses.actScore + ""),
      studentType: studentAppLevel
    }

    console.log(userResponses);

    const fetchData = async () => {
      try {
        const response = await fetch('/api/metrics/get-college-fit-list-old', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            preferences: requestFormat.preferences,
            ECTier: requestFormat.ECTier,
            courseworkTier: requestFormat.courseworkTier,
            GPATier: requestFormat.GPATier,
            studFirstGen: requestFormat.studFirstGen,
            studSATScore: requestFormat.studSATScore,
            studACTScore: requestFormat.studACTScore,
            studentType: requestFormat.studentType
          })
        });
        const data = await response.json();
        console.log(data); // Do something with the data
        return data;
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    
    console.log(requestFormat);
    const collegeResult = await fetchData(); // Store the result in a variable
    console.log(collegeResult); // Do something with the result

    let postArr = [];

    let reach = collegeResult.reach;
    let target = collegeResult.target;
    let safety = collegeResult.safety;

    for (let i = 0; i < reach.length; i++) {
      const personalize: collegeListIndividualInfo = {
        college_id: reach[i].college_id,
        fit_type: 2,
        img_url: reach[i].img_url,
        img_title: reach[i].img_title,
        college_name: reach[i].college_name,
        location: reach[i].location,
        in_state_tuition: reach[i].in_state_tuition,
        out_state_tuition: reach[i].out_state_tuition,
        college_type: reach[i].college_type
      }
      postArr.push(personalize);
    }

    for (let i = 0; i < target.length; i++) {
      const personalize: collegeListIndividualInfo = {
        college_id: target[i].college_id,
        fit_type: 0,
        img_url: target[i].img_url,
        img_title: target[i].img_title,
        college_name: target[i].college_name,
        location: target[i].location,
        in_state_tuition: target[i].in_state_tuition,
        out_state_tuition: target[i].out_state_tuition,
        college_type: target[i].college_type
      }
      postArr.push(personalize);
    }

    for (let i = 0; i < safety.length; i++) {
      const personalize: collegeListIndividualInfo = {
        college_id: safety[i].college_id,
        fit_type: 1,
        img_url: safety[i].img_url,
        img_title: safety[i].img_title,
        college_name: safety[i].college_name,
        location: safety[i].location,
        in_state_tuition: safety[i].in_state_tuition,
        out_state_tuition: safety[i].out_state_tuition,
        college_type: safety[i].college_type
      }
      postArr.push(personalize);
    }

    console.log(postArr);

   await Promise.all([
     fetch(`/api/user/update-user`, {
       method: "POST",
       body: JSON.stringify({
         userInfo: {
           checkIns: checkInList,
           tags: userTags,
           address: newAddress.reduce(
             (prev, curr) =>
               prev
                 ? prev +
                   ", " +
                   (curr instanceof Array
                     ? curr.reduce(
                         (prev, curr) => (prev ? prev + ", " + curr : curr),
                         ""
                       )
                     : curr)
                 : curr,
             ""
           ),
           name: newName.reduce(
             (prev, curr) => (prev ? prev + " " + curr : curr),
             ""
           ),
           grade: newGrade,
         },
         userId: session.data.user.uid,
       }),
     }),
     callPutQuestionResponses(newUserResponses),
     fetch('/api/user/put-college-list', {
       method: 'POST',
         headers: {
           'Accept' : 'application/json',
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({
           user_id: session.data.user.uid,
           college_list: postArr
         })
     })
   ]).then((values) => {
     store.dispatch(
       updateAccountAction({
         ...store.getState().accountInfo,
         address: newAddress.reduce(
           (prev, curr) =>
             prev
               ? prev +
                 ", " +
                 (curr instanceof Array
                   ? curr.reduce(
                       (prev, curr) => (prev ? prev + ", " + curr : curr),
                       ""
                     )
                   : curr)
               : curr,
           ""
         ),
         name: newName.reduce(
           (prev, curr) => (prev ? prev + " " + curr : curr),
           ""
         ),
         grade: newGrade,
         _id: undefined,
       })
     );
     store.dispatch(updateTagsAndCheckInsAction(userTags, checkInList));
     store.dispatch(updateQuestionResponsesAction(newUserResponses));
   }).catch((error) => {
    console.log(error);
   });
   setIsShowingCollegeListGeneration(false);
   router.push({ pathname: "/college-list" });
};

  const filterDuplicates = (toFilter: any[]) => {
    return toFilter.filter((element, index, self) => {
      let indexOfDuplicate = self.findIndex((value) => value === element);
      return indexOfDuplicate === -1 || index === indexOfDuplicate;
    });
  };
  const checkInPages = useMemo(
    () =>
      checkInData.chunks.map(({ questions }) => {
        return (
          <div>
            <div className="cl-blue fw-bold" style={{ fontSize: "18px" }}>
              Questions with * are required
            </div>
            {questions.map((question) => {
              const currQuestionResponse = newUserResponses.find(
                (questionResponse) =>
                  questionResponse.questionId === question?._id.toString()
              );
              const currQuestionResponseIndex = newUserResponses.findIndex(
                (questionResponse) =>
                  questionResponse.questionId === question?._id.toString()
              );
              const updateFunc = (
                value: any,
                newQTags = undefined,
                oldTags = undefined
              ) => {
                currQuestionResponse
                  ? (newUserResponses[currQuestionResponseIndex]["response"] =
                      value)
                  : newUserResponses.push({
                      questionId: question?._id.toString(),
                      response: value,
                    });
                if (newQTags) {
                  setNewTags(filterDuplicates(newTags.concat(newQTags)));
                }
                setNewUserResponses([...newUserResponses]);
              };
              if (question?.type === "TextInput") {
                return (
                  <TextInputQuestion
                    key={question?._id.toString()}
                    question={question}
                    userAnswer={
                      newUserResponses[currQuestionResponseIndex]?.response ||
                      ""
                    }
                    isCentered
                    onChange={updateFunc}
                  />
                );
              }
              if (question?.type === "Ranking") {
                return (
                  <RankingQuestion
                    question={question}
                    key={question?._id.toString()}
                    userAnswers={
                      newUserResponses[currQuestionResponseIndex]?.response ||
                      []
                    }
                    onChange={updateFunc}
                    tags={userTags}
                  />
                );
              }
              if (question?.type === "MCQ") {
                return (
                  <MCQQuestion
                    question={question}
                    key={question?._id.toString()}
                    userAnswer={
                      newUserResponses[currQuestionResponseIndex]?.response ||
                      ""
                    }
                    isCentered
                    onChange={updateFunc}
                    tags={userTags}
                  />
                );
              }
              if (question?.type === "CheckBox") {
                return (
                  <CheckBoxQuestion
                    key={question?._id.toString()}
                    question={question}
                    isCentered
                    userAnswers={
                      newUserResponses[currQuestionResponseIndex]?.response ||
                      []
                    }
                    onChange={updateFunc}
                    tags={userTags}
                  />
                );
              }
              if (question?.type === "CompositeQuestion") {
                return (
                  <CompositeQuestion
                    question={question}
                    responses={
                      newUserResponses[currQuestionResponseIndex]?.response ||
                      []
                    }
                    onChange={(value, index, questionId) => {
                      let currRes = newUserResponses.find(
                        (questionResponse) =>
                          questionResponse.questionId ===
                          question?._id.toString()
                      );
                      if (currRes) {
                        newUserResponses[
                          newUserResponses.findIndex(
                            (questionResponse) =>
                              questionResponse.questionId ===
                              question?._id.toString()
                          )
                        ]["response"][index] = value;
                      } else {
                        let newResArr = [];
                        newResArr[index] = value;
                        newUserResponses.push({
                          questionId: question?._id.toString(),
                          response: newResArr,
                        });
                      }
                    }}
                    title={question.question}
                    questions={question.data}
                  />
                );
              }
              if (question?.type === "DoubleTextInputQuestion") {
                return (
                  <DoubleTextInputQuestion
                    userResponses={
                      newUserResponses[currQuestionResponseIndex]?.response ||
                      []
                    }
                    question={question}
                    onChange={(value) => {
                      updateFunc(value);
                    }}
                  />
                );
              }
              if (question?.type === "DoubleTextInputQuestion") {
                return (
                  <DoubleDropdownQuestion
                    userResponses={
                      newUserResponses[currQuestionResponseIndex]?.response ||
                      []
                    }
                    question={question}
                    onChange={(value) => {
                      updateFunc(value);
                    }}
                  />
                );
              }
              if (question?.type === "ECDropDown") {
                return (
                  <DropdownQuestion
                    isConcatenable={question.isConcatenable}
                    valuesList={question.data}
                    onChange={(value) => {
                      updateFunc(value)
                    }}
                    key={question._id.toString()}
                    questionTitle={question.question}
                  />
                );
              }
              return (
                <div className="container-fluid h-100 d-flex flex-column align-items-center justify-content-evenly w-100 cl-dark-text fw-bold">
                  <span className="pt-4 pb-2" style={{ fontSize: "1.4em" }}>
                    {question?.question}
                  </span>
                  <div className="d-flex flex-column justify-content-evenly align-items-center h-75 w-100">
                    <div className="w-75">
                      Uh Oh. It appears there was an error loading this question
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      }),
    [newUserResponses, checkInData]
  );
  if (isShowingCollegeListGeneration) {
    return (
      <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center" style={{ height: size.height }}>
        <div>
          <LinearProgress />
        </div>
        
      </div>
    )
  }
  if (isEditingACEC) {
    const tabs = [
      {
        name: "Academics"
      },
      {
        name: "Extracurriculars"
      },
    ]
    return (
      <div className="w-100 d-flex flex-column">
      <div
        className="d-flex flex-row w-100 px-3 py-2 position-fixed"
        style={{
          borderBottom: "2px solid #E0DFE8",
          backgroundColor: "white",
          zIndex: 1000,
        }}
      >
        <div
          className={`navbar-brand mx-4`}
          style={{ fontSize: "1.5em", fontWeight: 600 }}
        >
          <span className={`cl-blue`}>cledge.</span>
        </div>
        <div
          className="d-flex flex-row align-items-center justify-content-center"
          style={{ flex: 1 }}
        >
          {tabs.map(({ name }, index) => (
            <div
              style={{ color: page === index ? "#506BED" : "#808099" }}
              className="d-flex flex-row align-items-center ms-3"
            >
              <div
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "17.5px",
                  backgroundColor: page === index ? "#506BED" : "#808099",
                  color: "white",
                }}
                className="center-child me-3"
              >
                {index + 1}
              </div>
              <div>{name}</div>
              {!(index + 1 === tabs.length) && (
                <div
                  className="ms-3"
                  style={{
                    backgroundColor: page === index ? "#506BED" : "#808099",
                    height: "1px",
                    width: "180px",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          width: size.width < 800 ? "100%" : size.width < 1400 ? "60%" : "40%",
        }}
        className="align-self-center row col-md-5 w-50 d-md-flex mx-auto mt-5 pt-5 flex-column justify-content-center text-center checkIn-question"
      >
        {ACECPage == 0 ? 
        (
          <AcademicsSignUp noRenderButtons={() => toggleButtons()} years={academicsResponses.years} submitData={(e) => {
            console.log("E : " + JSON.stringify(e) );
            setAcademicsResponses(e);
          }} />
        ) : (
          <ActivitiesSignUp noRenderButtons={() => toggleButtons()}  submitData={(e) => setActivitiesResponses(e)} activities={activitiesResponses} />
        )}
      </div>
      {noRenderButtons ? null : (<div
        className={classNames(
          styles.authBottomNav,
          "align-self-center my-3 pt-4"
        )}
        style={{
          bottom: "16vh",
          width: size.width < 800 ? "100%" : size.width < 1400 ? "60%" : "40%",
          borderTop: "1px solid #C1C0CE",
        }}
      >
        <div className="px-0">
          <button
            type="button"
            disabled={page === 0}
            className="btn cl-btn-clear"
            onClick={() => {
              if (ACECPage > 0) {
                setACECPage(ACECPage - 1);
              } else {
                setIsEditingACEC(false);
              }
            }}
          >
            Back
          </button>
        </div>
        <div className="px-0">
          {ACECPage < tabs.length - 1 && (
            <button
              type="button"
              disabled={!canGoForward}
              className="btn cl-btn-blue"
              onClick={() => setACECPage(ACECPage + 1)}
            >
              Next
            </button>
          )}
          {ACECPage === tabs.length - 1 && (
            <button
              type="button"
              disabled={!canGoForward}
              className="btn cl-btn-blue"
              onClick={submitForm}
            >
              Submit
            </button>
          )}
        </div>
      </div>)}
    </div>
    )
  }
  if (isShowingStart) {
    return (
      <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100">
        <div
          style={{ width: size.width < 800 ? "80%" : "70%" }}
          className="vh-50 d-flex flex-row justify-content-between align-items-center flex-wrap"
        >
          <img
            style={{ width: size.width < 800 ? "100%" : "60%" }}
            src="../images/questionLandingGraphic.png"
          />
          <div
            className="cl-dark-text d-flex flex-column"
            style={{
              fontSize: "1em",
              width: size.width < 800 ? "100%" : "40%",
            }}
          >
            <span className="fw-bold mb-3" style={{ fontSize: "2.4em" }}>
              Receive personalized suggestions
            </span>
            This will only take 3 minutes. Tell us about yourself and we’ll
            provide you with personalized content and suggestions.
            <br />
            <br />
            Be sure to answer carefully and accurately. You can always access
            this questionnaire again to make changes.
            <button
              className="btn cl-btn-blue mt-3"
              style={{ fontSize: "1.1em", width: "50%" }}
              onClick={() => {
                setIsShowingStart(false);
              }}
            >
              Start the quiz
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-100 d-flex flex-column">
      <div
        className="d-flex flex-row w-100 px-3 py-2 position-fixed"
        style={{
          borderBottom: "2px solid #E0DFE8",
          backgroundColor: "white",
          zIndex: 1000,
        }}
      >
        <div
          className={`navbar-brand mx-4`}
          style={{ fontSize: "1.5em", fontWeight: 600 }}
        >
          <span className={`cl-blue`}>cledge.</span>
        </div>
        <div
          className="d-flex flex-row align-items-center justify-content-center"
          style={{ flex: 1 }}
        >
          {checkInData.chunks.map(({ name }, index) => (
            <div
              style={{ color: page === index ? "#506BED" : "#808099" }}
              className="d-flex flex-row align-items-center ms-3"
            >
              <div
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "17.5px",
                  backgroundColor: page === index ? "#506BED" : "#808099",
                  color: "white",
                }}
                className="center-child me-3"
              >
                {index + 1}
              </div>
              <div>{name}</div>
              {!(index + 1 === checkInData.chunks.length) && (
                <div
                  className="ms-3"
                  style={{
                    backgroundColor: page === index ? "#506BED" : "#808099",
                    height: "1px",
                    width: "180px",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          width: size.width < 800 ? "100%" : size.width < 1400 ? "60%" : "40%",
        }}
        className="align-self-center row col-md-5 d-md-flex mx-auto mt-5 pt-5 flex-column justify-content-center text-center checkIn-question"
      >
        {checkInPages[page]}
      </div>
      <div
        className={classNames(
          styles.authBottomNav,
          "align-self-center my-3 pt-4"
        )}
        style={{
          bottom: "16vh",
          width: size.width < 800 ? "100%" : size.width < 1400 ? "60%" : "40%",
          borderTop: "1px solid #C1C0CE",
        }}
      >
        <div className="px-0">
          <button
            type="button"
            disabled={page === 0}
            className="btn cl-btn-clear"
            onClick={goBack}
          >
            Back
          </button>
        </div>
        <div className="px-0">
          {page < checkInPages.length - 1 && (
            <button
              type="button"
              disabled={!canGoForward}
              className="btn cl-btn-blue"
              onClick={goForward}
            >
              Next
            </button>
          )}
          {page === checkInPages.length - 1 && (
            <button
              type="button"
              disabled={!canGoForward}
              className="btn cl-btn-blue"
              onClick={() => setIsEditingACEC(true)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
CheckIn.requireAuth = true;
export default connect((state) => ({
  userTags: state.accountInfo.tags,
  grade: state.accountInfo.grade,
  userResponses: state.questionResponses,
}))(CheckIn);
