import React, { useState } from "react";
import QuestionSubPageHeader from "../components/question_components/question_subpage_header";
import QuestionSummaryCard from "../components/question_components/question_summary_card";
import ECTextInputQuestion from "../components/question_components/ec_textinput_question";
import ECDropDown from "../components/question_components/ec_dropdown_question";
import MCQQuestion from "../components/question_components/mcq_question";
import CheckBoxQuestion from "../components/question_components/checkbox_question";
import { ProgressBar } from "react-bootstrap";

export default function Questionnaire() {
  var [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    highSchool: "",
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
    numberOfApplications: 1,
  });
  
  const [progress, changeProgress] = useState(0);
  const [page, changePage] = useState(0);

  const goBack = (e) => {
    e.preventDefault();
    if (progress > 2) changeProgress(progress - 4.76);
    if (page > 0) changePage(page - 1);
  };

  const goForward = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (progress < 98) changeProgress(progress + 4.76);
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
      <ECTextInputQuestion title="First Name" placeholder="Type here..." />
      <ECTextInputQuestion title="Last Name" placeholder="Type here..." />
    </div>,
    <div>
      <div className="question-subpage-title col-12 min-vh-75">
          High School
      </div>
      <ECTextInputQuestion title="High School" placeholder="Type your high school name here..." />
    </div>,
    <div>
      <div className="question-subpage-title">
          Grade Level
      </div>
      <MCQQuestion />
    </div>,
    <div>
      <div className="question-subpage-title">
          Home (Legal) Address
      </div>
      <ECTextInputQuestion title="Address" placeholder="Type here..." />
    </div>,
    <div>
      <div className="question-subpage-title">
          Grades (GPA)
      </div>
      <ECTextInputQuestion title="tjksasljsdlkfjldkfj" placeholder="Type here..." />
      <ECDropDown placeholder="answer" valuesList={["lol", "whee"]}/>
    </div>,
    <div>
      <div className="question-subpage-title">
          Test Scores
      </div>
      <ECTextInputQuestion title="SAT" placeholder="Your SAT score" />
      <ECTextInputQuestion title="ACT" placeholder="Your ACT score" />
      <ECTextInputQuestion title="TOEFL" placeholder="Your TOEFL score" />
    </div>,
    <div>
      <div className="question-subpage-title">
          Extracurriculars
      </div>
      <ECTextInputQuestion title="To be updated" placeholder="Type here..." />
    </div>,
    <div>
      <div className="question-subpage-title">
          School Transcript
      </div>
      <ECDropDown placeholder="Drag and drop or Upload" valuesList={["lol", "whee"]}/>
    </div>,
    <div>
      <div className="question-subpage-title">
          Type of Applicant
      </div>
      <ECDropDown title="Applicant Rigor" placeholder="- Select -" valuesList={["Competitive", "Average", "Leisure"]}/>
    </div>,
    <div>
      <div className="question-subpage-title">
          Interested Area of Study
      </div>
      <MCQQuestion/>
    </div>,
    <div>
      <div className="question-subpage-title">
          Other Areas of Interest
      </div>
      <MCQQuestion/>
    </div>,
    <div>
      <div className="question-subpage-title">
          How will you pay for college?
      </div>
      <ECDropDown title="Paying for college" placeholder="Multiple select" valuesList={["lol", "whee"]}/>
    </div>,
    <div>
      <div className="question-subpage-title">
          Tuition Budget
      </div>
      <ECTextInputQuestion title="Yearly Budget in USD" placeholder="$10,000 to $150,000" />
    </div>,
    <div>
      <div className="question-subpage-title">
          In-state or Out-of-state
      </div>
      <ECDropDown placeholder="Select One" 
      valuesList={["In State", "Out of State", "No Preference", "Depends on other factors"]}/>
    </div>,
    <div>
      <div className="question-subpage-title">
          School Region
      </div>
      <ECDropDown placeholder="Select One" 
      valuesList={["In State", "Out of State", "No Preference", "Depends on other factors"]}/>
    </div>,
    <div>
      <div className="question-subpage-title">
          Private or Public
      </div>
      <MCQQuestion/>
    </div>,
    <div>
      <div className="question-subpage-title">
          School Size
      </div>
      <CheckBoxQuestion />
    </div>,
    <div>
      <div className="question-subpage-title">
          Liberal Arts vs Regular
      </div>
      <MCQQuestion />
    </div>,
    <div>
      <div className="question-subpage-title">
          Religious Affiliation
      </div>
      <MCQQuestion />
    </div>,
    <div>
      <div className="question-subpage-title">
          College Rigor
      </div>
      <MCQQuestion />
    </div>,
    <div>
      <div className="question-subpage-title">
          Number of Applications
      </div>
      <ECTextInputQuestion title="Number of applications" placeholder="1-25+" />
    </div>
    ];
  
  return (
    <div className="container-fluid vh-50 d-flex flex-column">
        <div className="row col-md-5 d-md-flex mx-auto mt-5 flex-column justify-content-center align-middle"
        style={{ width: "30%" }}
        >
          {questionnairePages[page]}
            <br />
            <div className="auth-bottom-nav">
                <div className="px-0">
                  {page > 0 &&
                    <button
                      type="button"
                      className="btn btn-primary"
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
        </div>
        <div className="align-self-center" style={{position: "fixed", bottom: "10vh", width: "80%"}}>
            <ProgressBar now={progress} />
        </div>
    </div>
  );
}
