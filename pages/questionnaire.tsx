import React, { useState } from "react";
import QuestionSubPageHeader from "../components/question_components/question_subpage_header";
import ECTextInputQuestion from "../components/question_components/ec_textinput_question";
import ECDropDown from "../components/question_components/ec_dropdown_question";
import MCQQuestion from "../components/question_components/mcq_question";
import Slider from "../components/question_components/slider";
import CheckBoxQuestion from "../components/question_components/checkbox_question";
import QuestionECSubpage from "./questionPages/question_ec_subpage";
import ECQuestionSummaryCard from "../components/question_components/ec_question_summary_card";
import { ProgressBar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import ECEditor from "../components/question_components/EC_editor";

export default function Questionnaire() {
  var [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    highSchool: "",
    gradeLevel: "",
    address: "",
    gpa: "",
    testScores: "",
    ecList: [],
    schoolTranscript: null,
    applicantType: "",
    areaOfStudy: "",
    areasOfInterest: "",
    planToPay: [],
    tuitionBudget: 10000,
    inOutOfState: "",
    schoolRegion: [],
    privatePublic: "",
    schoolSize: [],
    liberalArtsRegular: "",
    religiousAffiliation: "",
    typeOfCollegeList: "",
    numberOfApplications: "1",
  });

  const [progress, changeProgress] = useState(0);
  const [page, changePage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const hiddenFileInput = React.useRef(null);

  const transcriptUpload = () => {
    hiddenFileInput.current.click();
  };

  const goBack = (e) => {
    e.preventDefault();
    if (progress > 2) changeProgress(progress - 5);
    if (page > 0) changePage(page - 1);
  };

  const goForward = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (progress < 98) changeProgress(progress + 5);
    if (page < 20) changePage(page + 1);
  };

  const submitForm = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(formData);
  };

  const questionnairePages = [
    <div>
      <div className="question-subpage-title col-12 min-vh-75">Name</div>
      <ECTextInputQuestion
        questionTitle="First Name"
        placeholder={
          formData["firstName"] === "" ? "Type here..." : formData["firstName"]
        }
        onChange={(e: any) =>
          setFormData({ ...formData, firstName: e.target.value })
        }
        userResponse={""}
      />
      <ECTextInputQuestion
        questionTitle="Last Name"
        placeholder={
          formData["lastName"] === "" ? "Type here..." : formData["lastName"]
        }
        onChange={(e: any) =>
          setFormData({ ...formData, lastName: e.target.value })
        }
        userResponse={""}
      />
    </div>,
    <div className="row">
      <div className="question-subpage-title col-12 min-vh-75">High School</div>
      <ECTextInputQuestion
        questionTitle="Enter your high school's name"
        placeholder={
          formData["highSchool"] === ""
            ? "Type your high school name here..."
            : formData["highSchool"]
        }
        onChange={(e: any) =>
          setFormData({ ...formData, highSchool: e.target.value })
        }
        userResponse={""}
      />
      <div className="col-12 pt-3">
        Please fill in your high school's address
      </div>
      <ECTextInputQuestion
        questionTitle="Street Address:"
        placeholder="Type here..."
        onChange={(e: any) =>
          setFormData({ ...formData, address: e.target.value })
        }
        userResponse={""}
      />
      <div className="col-6">
        <ECTextInputQuestion
          questionTitle="State:"
          placeholder="Type here..."
          onChange={(e: any) =>
            setFormData({ ...formData, address: e.target.value })
          }
          userResponse={""}
        />
      </div>
      <div className="col-6">
        <ECTextInputQuestion
          questionTitle="Zip Code:"
          placeholder="Type here..."
          onChange={(e: any) =>
            setFormData({ ...formData, address: e.target.value })
          }
          userResponse={""}
        />
      </div>
    </div>,
    <div>
      <div className="question-subpage-title">Grade Level</div>
      <Slider
        title="Selected Grade Level"
        min="9"
        max="12"
        step="1"
        onChange={(e: any) =>
          setFormData({ ...formData, gradeLevel: e.target.value })
        }
      />
    </div>,
    <div className="row">
      <div className="question-subpage-title">
        What's your current home address?
      </div>
      <ECTextInputQuestion
        questionTitle="Street Address:"
        placeholder="Type here..."
        onChange={(e: any) =>
          setFormData({ ...formData, address: e.target.value })
        }
        userResponse={""}
      />
      <ECTextInputQuestion
        questionTitle="Apt or Unit Number:"
        placeholder="Type here..."
        onChange={(e: any) =>
          setFormData({ ...formData, address: e.target.value })
        }
        userResponse={""}
      />
      <div className="col-6">
        <ECTextInputQuestion
          questionTitle="State:"
          placeholder="Type here..."
          onChange={(e: any) =>
            setFormData({ ...formData, address: e.target.value })
          }
          userResponse={""}
        />
      </div>
      <div className="col-6">
        <ECTextInputQuestion
          questionTitle="Zip Code:"
          placeholder="Type here..."
          onChange={(e: any) =>
            setFormData({ ...formData, address: e.target.value })
          }
          userResponse={""}
        />
      </div>
    </div>,
    <div>
      <div className="question-subpage-title">Grades (GPA)</div>
      <ECTextInputQuestion
        questionTitle="Weighted"
        placeholder="Type here..."
        onChange={(e: any) => setFormData({ ...formData, gpa: e.target.value })}
        userResponse={""}
      />
      <ECTextInputQuestion
        questionTitle="Unweighted"
        placeholder="Type here..."
        onChange={(e: any) => setFormData({ ...formData, gpa: e.target.value })}
        userResponse={""}
      />
    </div>,
    <div>
      <div className="question-subpage-title">Test Scores</div>
      <ECTextInputQuestion
        questionTitle="SAT"
        placeholder="Your SAT score (400-1600)"
        onChange={(e: any) =>
          setFormData({ ...formData, testScores: e.target.value })
        }
        userResponse={""}
      />
      <ECTextInputQuestion
        questionTitle="ACT"
        placeholder="Your ACT score (1-36)"
        onChange={(e: any) =>
          setFormData({ ...formData, testScores: e.target.value })
        }
        userResponse={""}
      />
    </div>,
    isAdding || isEditing ? (
      <div>
        <ECEditor
          title="Add an Extracurricular"
          onSave={() => {
            setIsAdding(false);
            setIsEditing(false);
            setFormData({
              ...formData,
              ecList: [
                ...formData["ecList"],
                {
                  title: "Hello",
                  tags: ["Volunteer", "Children", "Hospital"],
                  accomplishments: ["Volunteer", "Children", "Hospital"],
                  time: ["Volunteer", "Children", "Hospital"],
                  hours: ["Volunteer", "Children", "Hospital"],
                },
              ],
            });
          }}
          chunkQuestions={[]}
          userResponses={[]}
          isEditing={false}
          index={0}
        />
      </div>
    ) : (
      <div>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <div className="question-subpage-title">Extracurriculars</div>
          <button
            onClick={() => setIsAdding(true)}
            className="cl-btn-blue py-3"
          >
            Add New
          </button>
        </div>
        {formData["ecList"].map((item) => (
          <ECQuestionSummaryCard
            key={item}
            response={[]}
            chunkQuestions={[]}
            onClick={undefined}
          />
        ))}
      </div>
    ),
    <div>
      <div className="question-subpage-title">School Transcript</div>
      <div className="container-fluid h-100 d-flex flex-column align-items-center justify-content-center w-100 cl-dark-text fw-bold my-4 pt-5">
        Upload from your computer
        <button
          className="upload-area w-100 h-100 text-center border border-secondary bg-transparent"
          onClick={transcriptUpload}
        >
          <FontAwesomeIcon
            icon={faPlusSquare}
            color="#070452"
            style={{ width: "8vh" }}
          />
          <input
            type="file"
            name="file"
            ref={hiddenFileInput}
            onChange={(e) =>
              setFormData({ ...formData, schoolTranscript: e.target.files[0] })
            }
            style={{ display: "none" }}
          />
        </button>
      </div>
    </div>,
    <div>
      <div className="question-subpage-title">Type of Applicant</div>
      <ECDropDown
        title="Applicant Rigor"
        placeholder="- Select -"
        valuesList={["Competitive", "Average", "Leisure"]}
        onChange={(e: any) => setFormData({ ...formData, applicantType: e })}
      />
    </div>,
    <div>
      <div className="question-subpage-title">Interested Area of Study</div>
      <MCQQuestion
        userAnswer={formData.areaOfStudy}
        onChange={(e: any) => setFormData({ ...formData, areaOfStudy: e })}
        question={undefined}
      />
    </div>,
    <div>
      <div className="question-subpage-title">Other Areas of Interest</div>
      <MCQQuestion
        userAnswer={formData["areasOfInterest"]}
        onChange={(e: any) => setFormData({ ...formData, areasOfInterest: e })}
        question={undefined}
      />
    </div>,
    <div>
      <div className="question-subpage-title">
        How will you pay for college?
      </div>
      <CheckBoxQuestion
        question={undefined}
        userAnswers={formData["planToPay"]}
        onChange={(e: any) => setFormData({ ...formData, planToPay: e })}
      />
    </div>,
    <div>
      <div className="question-subpage-title">Tuition Budget</div>
      <Slider
        min="10000"
        max="150000"
        step="1000"
        plus={true}
        onChange={(e: any) =>
          setFormData({ ...formData, tuitionBudget: e.target.value })
        }
      />
    </div>,
    <div>
      <div className="question-subpage-title">In-state or Out-of-state</div>
      <ECDropDown
        title="Select your preference"
        placeholder="- Select -"
        valuesList={[
          "In State",
          "Out of State",
          "No Preference",
          "Depends on other factors",
        ]}
        onChange={(e: any) => setFormData({ ...formData, inOutOfState: e })}
      />
    </div>,
    <div>
      <div className="question-subpage-title">School Region</div>
      <CheckBoxQuestion
        question={undefined}
        userAnswers={formData["schoolRegion"]}
        onChange={(e: any) => setFormData({ ...formData, schoolRegion: e })}
      />
    </div>,
    <div>
      <div className="question-subpage-title">Private or Public</div>
      <MCQQuestion
        question={undefined}
        userAnswer={formData["privatePublic"]}
        onChange={(e: any) => setFormData({ ...formData, privatePublic: e })}
      />
    </div>,
    <div>
      <div className="question-subpage-title">School Size Preference</div>
      <CheckBoxQuestion
        question={undefined}
        userAnswers={formData["schoolSize"]}
        onChange={(e: any) => setFormData({ ...formData, schoolSize: e })}
      />
    </div>,
    <div>
      <div className="question-subpage-title">Liberal Arts vs Regular</div>
      <MCQQuestion
        question={undefined}
        userAnswer={formData["liberalArtsRegular"]}
        onChange={(e: any) =>
          setFormData({ ...formData, liberalArtsRegular: e })
        }
      />
    </div>,
    <div>
      <div className="question-subpage-title">Religious Affiliation</div>
      <MCQQuestion
        question={undefined}
        userAnswer={formData["religiousAffiliation"]}
        onChange={(e: any) =>
          setFormData({ ...formData, religiousAffiliation: e })
        }
      />
    </div>,
    <div>
      <div className="question-subpage-title">College List Rigor</div>
      <MCQQuestion
        question={undefined}
        userAnswer={formData["typeOfCollegeList"]}
        onChange={(e: any) =>
          setFormData({ ...formData, typeOfCollegeList: e })
        }
      />
    </div>,
    <div>
      <div className="question-subpage-title">Number of Applications</div>
      <Slider
        min="1"
        max="25"
        step="1"
        plus={true}
        onChange={(e: any) =>
          setFormData({ ...formData, numberOfApplications: e.target.value })
        }
      />
    </div>,
  ];

  return (
    <div className="questionnaire-container container-fluid d-flex flex-column overflow-auto bg-light-blue">
      <div className="row col-md-5 d-md-flex mx-auto mt-5 flex-column justify-content-center text-center questionnaire-question">
        {questionnairePages[page]}
      </div>
      <div
        className="auth-bottom-nav align-self-center"
        style={{ position: "fixed", bottom: "16vh", width: "30%" }}
      >
        <div className="px-0">
          {page > 0 && (
            <button type="button" className="btn btn-light" onClick={goBack}>
              Back
            </button>
          )}
        </div>

        <div className="px-0">
          {page < 20 && (
            <button
              type="button"
              className="btn cl-btn-blue"
              onClick={goForward}
            >
              Next
            </button>
          )}
          {page === 20 && (
            <button
              type="button"
              className="btn cl-btn-blue"
              onClick={submitForm}
            >
              Submit
            </button>
          )}
        </div>
      </div>
      <div
        className="align-self-center"
        style={{ position: "fixed", bottom: "10vh", width: "80%" }}
      >
        <ProgressBar now={progress} />
      </div>
    </div>
  );
}
