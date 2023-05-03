import React from "react";
import { GetServerSidePropsContext } from "next";
import DempseyPage from "src/main-pages/DempseyPage/DempseyPage";
import { getQuestionList } from "src/pages/api/questions/get-question-list";


export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const data = {
        _id: "null",
        chunks: [
            {
                _id: "null",
                name: "Test questions",
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
                        helpText: "",
                        helpVid: "",
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
                        helpText: "(including tuition fee and living cost)",
                        helpVid: "",
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
                        helpText: "",
                        helpVid: "",
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
                        helpText: "",
                        helpVid: "",
                        isConcatenable: false,
                        isRequired: true,
                        question: "What is your preference for the college's location in general?",
                        type: "MCQ"
                    },
                    {
                        _id: "statePreference",
                        data: [
                            {
                                op: "Level 1: ...",
                                tag: "leisure-applicant",
                            },
                        ],
                        helpText: "",
                        helpVid: "",
                        isConcatenable: false,
                        isRequired: true,
                        question: "What state are you currently living in?",
                        type: "MCQ"
                    },
                    {
                        _id: "classSize",
                        data: [
                            {
                                op: "Level 1: ...",
                                tag: "leisure-applicant",
                            },
                            {
                                op: "Level 2: ...",
                                tag: "average-applicant",
                            },
                            {
                                op: "Level 3: ...",
                                tag: "competitive-applicant",
                            },
                        ],
                        helpText: "",
                        helpVid: "",
                        isConcatenable: false,
                        isRequired: true,
                        question: "How ambitious are you for college admissions?",
                        type: "MCQ"
                    },
                    {
                        _id: "finAidNeed",
                        data: [
                            {
                                op: "Level 1: ...",
                                tag: "leisure-applicant",
                            },
                            {
                                op: "Level 2: ...",
                                tag: "average-applicant",
                            },
                            {
                                op: "Level 3: ...",
                                tag: "competitive-applicant",
                            },
                        ],
                        helpText: "",
                        helpVid: "",
                        isConcatenable: false,
                        isRequired: true,
                        question: "How ambitious are you for college admissions?",
                        type: "MCQ"
                    },
                    {
                        _id: "finAidMerit",
                        data: [
                            {
                                op: "Level 1: ...",
                                tag: "leisure-applicant",
                            },
                            {
                                op: "Level 2: ...",
                                tag: "average-applicant",
                            },
                            {
                                op: "Level 3: ...",
                                tag: "competitive-applicant",
                            },
                        ],
                        helpText: "",
                        helpVid: "",
                        isConcatenable: false,
                        isRequired: true,
                        question: "How ambitious are you for college admissions?",
                        type: "MCQ"
                    },
                ]
            },
        ],
        name: "Dempsey Demo",
    }
    return {
        props: {
          data: data,
        },
      };
    };

const CheckIn = ({ data }) => {
  return <DempseyPage checkInData={data} />;
};
CheckIn.requireAuth = true;
export default CheckIn;