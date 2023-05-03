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
                        isRequired: false,
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
                        isRequired: false,
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
                        isRequired: false,
                        question: "What type of college do you want to get into",
                        type: "MCQ"
                    },
                    {
                        _id: "localePreference",
                        data: [
                            {
                                op: "Urban",
                                tag: 1,
                            },
                            {
                                op: "Suburban",
                                tag: 2,
                            },
                            {
                                op: "Rural",
                                tag: 3,
                            },
                        ],
                        helpText: "",
                        helpVid: "",
                        isConcatenable: false,
                        isRequired: false,
                        question: "What is your preference for the college's location in general?",
                        type: "MCQ"
                    },
                    {
                        _id: "statePreference",
                        helpText: "",
                        helpVid: "",
                        isConcatenable: false,
                        isRequired: false,
                        question: "What state are you currently living in?",
                        type: "TextInput"
                    },
                    {
                        _id: "classSize",
                        data: [
                            {
                                op: "In-state",
                                tag: "a",
                            },
                            {
                                op: "Out-of-state",
                                tag: "b",
                            },
                        ],
                        helpText: "",
                        helpVid: "",
                        isConcatenable: false,
                        isRequired: false,
                        question: "Do you want to attend an in-state college or out-of-state college?",
                        type: "MCQ"
                    },
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
                        helpText: "",
                        helpVid: "",
                        isConcatenable: false,
                        isRequired: false,
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
                        helpText: "",
                        helpVid: "",
                        isConcatenable: false,
                        isRequired: false,
                        question: "What is your expected amount of financial aid (merit-based)?",
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