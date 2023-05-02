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
                        _id: "costOfAttendance",
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
                        _id: "schoolPreference",
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
                        _id: "localePreference",
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
                        _id: "statePreference",
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
