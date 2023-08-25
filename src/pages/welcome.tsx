import { GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import { getRecentBlogs } from "src/pages/api/blogs/get-recent-blogs";
import WelcomePage from "../main-pages/WelcomePage/WelcomePage";
import UWCSLandingPage from "src/main-pages/WelcomePage/components/UWCSLandingPage/UWCSLandingPage";
import { getQuestionList } from "src/pages/api/questions/get-question-list";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  //const recentBlogs = JSON.parse(JSON.stringify(await getRecentBlogs()));
  // const questionAndAnswers = JSON.parse(JSON.stringify(await getQuestionList("College Fit")));
  type checkinQuestionsType = {
    _id: string;
    chunks: {
      _id: string;
      name: string;
      questions: {
        _id: string;
        data: {
          op: string;
          tag: string;
        }[];
        helpText: string;
        helpVid: string;
        isConcatenable: boolean;
        isRequired: boolean;
        question: string;
        type: string;
      }[];
    }[];
    name: string;
  };
  const checkinQuestions: checkinQuestionsType = {
    _id: "null",
    chunks: [
      {
        _id: "null",
        name: "College Fit",
        questions: [
          {
            
            _id: "schoolType",
            data: [
              {
                op: "Title one",
                tag: "a",
              },
              {
                op: "Magnet school",
                tag: "b",
              },
              {
                op: "Magnet school (STEM focus)",
                tag: "c",
              },
              {
                op: "Charter",
                tag: "d",
              },
            ],
            helpText: "",
            helpVid: "",
            isConcatenable: false,
            isRequired: true,
            question: "Does your school have any of the following designations?",
            type: "MCQ",
          },
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
            type: "MCQ",
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
            type: "MCQ",
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
            question: "What type of college do you want to get into?",
            type: "MCQ",
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
            question:
              "What is your preferred college location setting?",
            type: "MCQ",
          },
          {
            _id: "finAidNeed",
            data: [
              {
                op: "Cover less than 30% of annual cost",
                tag: "a",
              },
              {
                op: "Cover 30-60% of annual cost",
                tag: "b",
              },
              {
                op: "Cover more than 60% of annual cost",
                tag: "c",
              },
            ],
            helpText: "",
            helpVid: "",
            isConcatenable: false,
            isRequired: true,
            question:
              "What is your expected amount of financial aid?",
            type: "MCQ",
          },
        ],
      },
    ],
    name: "Checkin",
  };
  
  return {
    props: {
      data: {
        //recentBlogs,
        checkinQuestions,
      },
    },
  };
}

function Welcome({ data }) {
  return <WelcomePage data={data} />;
}

export default Welcome;
