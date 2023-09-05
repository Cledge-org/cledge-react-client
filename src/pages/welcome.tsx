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
  const collegeData = [
    ["Yale University", "https://upload.wikimedia.org/wikipedia/commons/e/e6/Yale4912.JPG", "Private", "New Haven, CT"],
    ["Boston University", "https://upload.wikimedia.org/wikipedia/commons/4/4b/BC_Campus_Green.jpg", "Private", "Boston, MA"],
    ["Tufts University", "https://upload.wikimedia.org/wikipedia/commons/1/1d/Tufts_Bendetson_hall.JPG", "Private", "Medford, MA"],
    ["Brown University", "https://upload.wikimedia.org/wikipedia/commons/3/34/Brown_University_Pembroke_campus_%28Andrews%29.jpg", "Private", "Providence, RI"],
    ["Rice University", "https://upload.wikimedia.org/wikipedia/commons/1/1a/Rice_University.jpg", "Private", "Houston, TX"],
    ["UC Berkeley", "https://upload.wikimedia.org/wikipedia/commons/e/e9/UC-Berkeley-campus-overview-from-hills.h.jpg", "Public", "Berkeley, CA"],
    ["University of Washington", "https://upload.wikimedia.org/wikipedia/commons/b/b0/University_of_Washington_.jpg", "Public", "Seattle, WA"],
    ["Georgia Tech University", "https://upload.wikimedia.org/wikipedia/commons/8/8e/Georgia_Tech_Student_Center_Commons_2.jpg", "Public", "Atlanta, GA"],
    ["University of Michigan", "https://upload.wikimedia.org/wikipedia/commons/0/0d/A_picture_of_the_University_of_Michigan_campus_in_Ann_Arbor%2C_Michigan%2C_USA.jpg", "Public", "Ann Arbor, MI"],
    ["University of Chicago", "https://de.wikipedia.org/wiki/University_of_Chicago#/media/Datei:Campus_Spring.jpg", "Private", "Chicago, IL"]
  ];

  return {
    props: {
      data: {
        //recentBlogs,
        checkinQuestions,
        collegeData,
      },
    },
  };
}

function Welcome({ data }) {
  return <WelcomePage data={data} />;
}

export default Welcome;
