import React, { useState } from "react";
import QuestionSubPageHeader from "../components/question_components/question_subpage_header";
import QuestionSummaryCard from "../components/question_components/question_summary_card";
import ECTextInputQuestion from "../components/question_components/ec_textinput_question";
import ECDropDown from "../components/question_components/ec_dropdown_question";
import MCQQuestion from "../components/question_components/mcq_question";
import Slider from "../components/question_components/slider";
import CheckBoxQuestion from "../components/question_components/checkbox_question";
import QuestionECSubpage from "./questionPages/question_ec_subpage";
import { ProgressBar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

export default function Questionnaire() {
  var [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    highSchool: "",
    gradeLevel: "",
    address: "",
    gpa: "",
    testScores: "",
    ecList: "",
    schoolTranscript: "",
    applicantType: "",
    areaOfStudy: "",
    areasOfInterest: "",
    planToPay: "",
    tuitionBudget: 10000,
    inOutOfState: "",
    schoolRegion: "",
    privatePublic: "",
    schoolSize: "",
    liberalArtsRegular: "",
    religiousAffiliation: "",
    typeOfCollegeList: "",
    numberOfApplications: "1"
  });
  
  const [progress, changeProgress] = useState(0);
  const [page, changePage] = useState(0);

  const goBack = (e) => {
    e.preventDefault();
    if (progress > 2) changeProgress(progress - 5);
    if (page > 0) changePage(page - 1);
  };

  const goForward = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (progress < 98) changeProgress(progress + 5);
    if (page < 20) changePage(page + 1);
  };

  const submitForm = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(formData);
  }

  const questionnairePages = [
    <div>
      <div className="question-subpage-title col-12 min-vh-75">
          Name
      </div>
      <ECTextInputQuestion title="First Name" placeholder={formData["firstName"] === "" ? "Type here..." : formData["firstName"]} onChange={(e: any) => setFormData({ ...formData, firstName: e.target.value })}/>
      <ECTextInputQuestion title="Last Name" placeholder={formData["lastName"] === "" ? "Type here..." : formData["lastName"]}  onChange={(e: any) => setFormData({ ...formData, lastName: e.target.value })}/>
    </div>,
    <div className="row">
      <div className="question-subpage-title col-12 min-vh-75">
          High School
      </div>
      <ECTextInputQuestion title="Search for your high school" placeholder={formData["highSchool"] === "" ? "Type your high school name here..." : formData["highSchool"]} pt={3} onChange={(e: any) => setFormData({ ...formData, highSchool: e.target.value })}/>
      <div className="col-12 pt-3">
        Your high school's address will be auto-filled below
      </div>
      <ECTextInputQuestion title="Street Address:" placeholder="Type here..." fontSize={1} pt={2} onChange={(e: any) => setFormData({ ...formData, address: e.target.value })}/>
      <div className="col-6">  
        <ECTextInputQuestion title="State:" placeholder="Type here..." fontSize={1} pt={2} onChange={(e: any) => setFormData({ ...formData, address: e.target.value })}/>
      </div>
      <div className="col-6">
        <ECTextInputQuestion title="Zip Code:" placeholder="Type here..." fontSize={1} pt={2} onChange={(e: any) => setFormData({ ...formData, address: e.target.value })}/>
      </div>
    </div>,
    <div>
      <div className="question-subpage-title">
          Grade Level
      </div>
      <Slider title="Selected Grade Level" min="9" max="12" step="1" onChange={(e: any) => setFormData({ ...formData, gradeLevel: e.target.value })} />
    </div>,
    <div className="row">
      <div className="question-subpage-title">
          What's your current home address?
      </div>
      <ECTextInputQuestion title="Street Address:" placeholder="Type here..." fontSize={1} pt={2} onChange={(e: any) => setFormData({ ...formData, address: e.target.value })}/>
      <ECTextInputQuestion title="Apt or Unit Number:" placeholder="Type here..." fontSize={1} pt={2} onChange={(e: any) => setFormData({ ...formData, address: e.target.value })}/>
      <div className="col-6">  
        <ECTextInputQuestion title="State:" placeholder="Type here..." fontSize={1} pt={2} onChange={(e: any) => setFormData({ ...formData, address: e.target.value })}/>
      </div>
      <div className="col-6">
        <ECTextInputQuestion title="Zip Code:" placeholder="Type here..." fontSize={1} pt={2} onChange={(e: any) => setFormData({ ...formData, address: e.target.value })}/>
      </div>
    </div>,
    <div>
      <div className="question-subpage-title">
          Grades (GPA)
      </div>
      <ECTextInputQuestion title="Weighted" placeholder="Type here..." onChange={(e: any) => setFormData({ ...formData, gpa: e.target.value })}/>
      <ECTextInputQuestion title="Unweighted" placeholder="Type here..." onChange={(e: any) => setFormData({ ...formData, gpa: e.target.value })}/>
    </div>,
    <div>
      <div className="question-subpage-title">
          Test Scores
      </div>
      <ECTextInputQuestion title="SAT" placeholder="Your SAT score (400-1600)" onChange={(e: any) => setFormData({ ...formData, testScores: e.target.value })}/>
      <ECTextInputQuestion title="ACT" placeholder="Your ACT score (1-36)" onChange={(e: any) => setFormData({ ...formData, testScores: e.target.value })}/>
    </div>,
    <div>
      <div className="question-subpage-title">
          Extracurriculars
      </div>
      <ECTextInputQuestion title="To be updated" placeholder="Type here..." onChange={(e: any) => setFormData({ ...formData, ecList: e.target.value })}/>
      {/* <QuestionECSubpage></QuestionECSubpage> */}
    </div>,
    <div>
      <div className="question-subpage-title">
          School Transcript
      </div>
        <div className="container-fluid h-100 d-flex flex-column align-items-center justify-content-center w-100 cl-dark-text fw-bold my-4 pt-5">
        Upload from your computer
        <button className="upload-area w-100 h-100 text-center border border-secondary bg-transparent">
          <FontAwesomeIcon icon={faPlusSquare} color="#070452" style={{width: "12vh"}} />
        </button>
      </div>
    </div>,
    <div>
      <div className="question-subpage-title">
          Type of Applicant
      </div>
      <ECDropDown title="Applicant Rigor" placeholder="- Select -" valuesList={["Competitive", "Average", "Leisure"]} />
    </div>,
    <div>
      <div className="question-subpage-title">
          Interested Area of Study
      </div>
      <MCQQuestion />
    </div>,
    <div>
      <div className="question-subpage-title">
          Other Areas of Interest
      </div>
      <MCQQuestion />
    </div>,
    <div>
      <div className="question-subpage-title">
          How will you pay for college?
      </div>
      <CheckBoxQuestion 
      valuesList={["Parents will cover all tuition", "Parents will cover some tuition", "I will take out a student loan", "I will file for financial aid", "Other"]} />
    </div>,
    <div>
      <div className="question-subpage-title">
          Tuition Budget
      </div>
      <Slider min="10000" max="150000" step="1" onChange={(e: any) => setFormData({ ...formData, tuitionBudget: e.target.value })} />
    </div>,
    <div>
      <div className="question-subpage-title">
          In-state or Out-of-state
      </div>
      <ECDropDown title="Select your preference"
      placeholder="- Select -" 
      valuesList={["In State", "Out of State", "No Preference", "Depends on other factors"]} />
    </div>,
    <div>
      <div className="question-subpage-title">
          School Region
      </div>
      <CheckBoxQuestion title="Select All That Apply" valuesList={["USA", "International", "Other"]} />
    </div>,
    <div>
      <div className="question-subpage-title">
          Private or Public
      </div>
      <MCQQuestion valuesList={["Private", "Public", "Either", "Don't Know"]} />
    </div>,
    <div>
      <div className="question-subpage-title">
          School Size Preference
      </div>
      <CheckBoxQuestion title="Select All That Apply" valuesList={["Small (1K-5K)", "Medium (5K-10K)", "Large (20K+)"]} />
    </div>,
    <div>
      <div className="question-subpage-title">
          Liberal Arts vs Regular
      </div>
      <MCQQuestion valuesList={["Liberal Arts", "Regular", "Either", "Don't Know"]} />
    </div>,
    <div>
      <div className="question-subpage-title">
          Religious Affiliation
      </div>
      <MCQQuestion valuesList={["Christian", "Catholic", "Other", "No preference", "No affiliation"]} />
    </div>,
    <div>
      <div className="question-subpage-title">
          College List Rigor
      </div>
      <MCQQuestion valuesList={["Competitive", "Standard", "Safe"]} />
    </div>,
    <div>
      <div className="question-subpage-title">
          Number of Applications
      </div>
      <Slider min="1" max="25" step="1" onChange={(e: any) => setFormData({ ...formData, numberOfApplications: e.target.value })} />
    </div>
    ];
  
  return (
    <div className="questionnaire-container container-fluid d-flex flex-column overflow-auto bg-light-blue">
        <div className="row col-md-5 d-md-flex mx-auto mt-5 flex-column justify-content-center text-center questionnaire-question"
        style={{ width: "32%" }}
        >
          {questionnairePages[page]}
        </div>
        <div className="auth-bottom-nav align-self-center" style={{position: "fixed", bottom: "16vh", width: "30%"}}>
          <div className="px-0">
            {page > 0 &&
              <button
                type="button"
                className="btn btn-light"
                onClick={goBack}
                >
                Back
              </button>
            }
          </div>

          <div className="px-0">
            {page < 20 &&
              <button
                type="button"
                className="btn cl-btn-blue"
                onClick={goForward}
                >
                Next
              </button>
            }
            {page === 20 &&
              <button
                type="button"
                className="btn cl-btn-blue"
                onClick={submitForm}
                >
                Submit
              </button>
            }
          </div>
        </div>
        <div className="align-self-center" style={{position: "fixed", bottom: "10vh", width: "80%"}}>
            <ProgressBar now={progress} />
        </div>
    </div>
  );
}
