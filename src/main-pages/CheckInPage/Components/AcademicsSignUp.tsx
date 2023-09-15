/* eslint-disable @next/next/no-img-element */
import { red } from "@mui/material/colors";
import { borderRadius } from "@mui/system";
import { number } from "prop-types";
import React, { useEffect, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { BiTrash } from "react-icons/bi";
import SignUpDropdown from "src/main-pages/CheckInPage/Components/SignUpDropdown";
import SignUpText from "src/main-pages/CheckInPage/Components/SignUpLongText";
import SignUpShortText from "src/main-pages/CheckInPage/Components/SignUpShortText";
import { useWindowSize } from "src/utils/hooks/useWindowSize";


export interface AcademicsProps {
  years: GradeBlockProps[]
  submitData?: Function
  noRenderButtons?: Function
  satScore?: number
  actScore?: number
}

interface GradeBlockProps {
  title: string
  grade: number
  terms: Term[]
  isQuarter: boolean
  toggleIsQuarter?: Function;
  addCourse?: Function;
  deleteCourse?: Function;
}

interface Term {
  title: string,
  id: number,
  courses: CourseProps[]
  gpa?: number
  deleteCourse?: Function;
}

interface CourseProps {
  courseName: string;
  subject: string;
  grade: number;
  tag?: string;
  deleteCourse?: Function;
}

function AcademicsSignUp(props: AcademicsProps) {

  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [userResponses, setUserResponses] = useState(props);
  const [tempCourse, setTempCourse] = useState({
    courseName: "",
    subject: "",
    grade: 0,
    tag: ""
  });
  const [issues, setIssues] = useState("");
  const [currGrade, setCurrGrade] = useState(0);
  const [currTerm, setCurrTerm] = useState(0);
  const [gpaString, setGpaString] = useState("");
  const size = useWindowSize();

  const toggleEditing = () => {
    setIsAddingCourse(!isAddingCourse);
    if (props.noRenderButtons) {
      props.noRenderButtons();
    }
  }

  const toggleIsQuarter = (grade: number) => {
    const newUserResponses = userResponses;
    newUserResponses.years.forEach((year) => {
      if (year.grade == grade) {
        year.isQuarter = !year.isQuarter;
      }
    })
    setUserResponses(newUserResponses);
  }

  const handleACTInputChange = async function (value: number) {
    setUserResponses({
      ...userResponses,
      actScore: value
    });
  }

  const handleSATInputChange = async function (value: number) {
    setUserResponses({
      ...userResponses,
      satScore: value
    });
  }

  useEffect(()=> {
    if (props.submitData) {
      props.submitData(userResponses);
    }
}, [handleACTInputChange, handleSATInputChange, setUserResponses])

  const validateGPA = () => {
    try {
      const gpaGrade = Number.parseFloat(gpaString);
      if (Number.isNaN(gpaGrade) || gpaGrade < 0 || gpaGrade > 4.0) {
        setIssues("Please validate that your unweighted GPA is correctly formatted.");
        return;
      }
      setTempCourse({
        courseName: tempCourse.courseName,
        subject: tempCourse.subject,
        grade: Number.parseFloat(gpaString),
        tag: tempCourse.tag
      });
    } catch (e) {
      setIssues("Please validate that your unweighted GPA is correctly formatted.");
      return
    }
  }

  const handleSubmit = () => {
    validateGPA();
    if (tempCourse.courseName.length > 0 && tempCourse.grade > 0 &&
      tempCourse.subject.length > 0 && tempCourse.tag.length > 0) {
      const yearObject = userResponses.years.find(e => e.grade == currGrade);
      const termObject = yearObject.terms.find(e => e.id == currTerm);
      userResponses.years.find(e => e.grade == currGrade)
      .terms.find(e => e.id == currTerm)
      .courses.push(tempCourse);
      let totalGradePoint = 0;
      termObject.courses.forEach(course => {
        totalGradePoint += course.grade;
      })
      termObject.gpa = totalGradePoint / termObject.courses.length;
      setTempCourse({
        courseName: "",
        subject: "",
        grade: 0,
        tag: ""
      })
      setGpaString("");
      setUserResponses(userResponses);
      if (props.submitData) {
        props.submitData(userResponses);
      }

      toggleEditing();

    }
  }


  const deleteCourse = (grade: number, term: number, courseName: string) => {
    try {
      setCurrGrade(grade);
      setCurrTerm(term);
      const courseToDelete = userResponses.years.find(e => e.grade == grade)
      .terms.find(e => e.id == term).courses.find(e => e.courseName == courseName);
      const newUserResponses = Object.assign({}, userResponses);
      newUserResponses.years.find(e => e.grade == grade)
      .terms.find(e => e.id == term).courses = newUserResponses.years.find(e => e.grade == grade)
      .terms.find(e => e.id == term).courses
      .filter((course) => course.courseName != courseName);

      let totalGradePoint = 0;
      newUserResponses.years?.find(e => e.grade == grade)
      .terms.find(e => e.id == term)
      .courses.forEach(course => {
        totalGradePoint += course.grade;
      })
      userResponses.years.find(e => e.grade == grade)
      .terms.find(e => e.id == term).gpa = (totalGradePoint / 
      newUserResponses.years.find(e => e.grade == grade)
      .terms.find(e => e.id == term).courses.length);

      if (Number.isNaN(userResponses.years.find(e => e.grade == grade)
        .terms.find(e => e.id == term).gpa)) {
          userResponses.years.find(e => e.grade == grade)
        .terms.find(e => e.id == term).gpa = 0;
        }
      setUserResponses(newUserResponses);
      if (props.submitData) {
        props.submitData(userResponses);
      }

    } catch (e) {
      console.log(e);
    }
    
  }

  const addCourse = (grade: number, term: number) => {
    setCurrGrade(grade);
    setCurrTerm(term);
    toggleEditing();;
  }

  if (isAddingCourse) {
    return (
      <div>
        <p style={{ color: "red" }}>{issues}</p>
        <div>
          <SignUpShortText
            placeholder=""
            onChange={(e) => {
              setTempCourse({
                courseName: e,
                subject: tempCourse.subject,
                grade: tempCourse.grade,
                tag: tempCourse.tag
              });
            } }
            value={tempCourse.courseName} 
            question={"Course Name"}          
            />
          <div className="d-flex justify-content-center">
            <SignUpDropdown 
              title="" 
              key={undefined} 
              placeholder={"Subject Tag"} 
              valuesList={["Math", "Science", "English", "World Language", "History/Social Studies", "Arts", "Other"]} 
              questionTitle={""} 
              onChange={(e) => {
                setTempCourse({
                  courseName: tempCourse.courseName,
                  subject: e,
                  grade: tempCourse.grade,
                  tag: tempCourse.tag
                })
              }}
            />
          </div>
          <div>
            <SignUpShortText
              type="any"
              placeholder=""
              onChange={(e) => {
                // if (/^[1-4]{0,1}(?:[.]\d{1,2})?$/.test(e) || e == '') {
                //   setTempCourse({
                //     courseName: tempCourse.courseName,
                //     subject: tempCourse.subject,
                //     grade: Number.parseFloat(e),
                //     tag: tempCourse.tag
                //   });
                // }
                setGpaString(e);
              }}
              value={gpaString} 
              question={"Grade (unweighted GPA 4.0 scale)"}          
            />
          </div>
          <div className="d-flex justify-content-center">
          <SignUpDropdown 
              title="" 
              key={undefined} 
              placeholder={"Course Tag"} 
              valuesList={["Regular/Standard", "Honors/Accelerated", "AP", "IB", "Other"]} 
              questionTitle={""} 
              onChange={(e) => {
                setTempCourse({
                  courseName: tempCourse.courseName,
                  subject: tempCourse.subject,
                  grade: tempCourse.grade,
                  tag: e
                })
              }}
            />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn cl-btn-clear mx-2" onClick={() => toggleEditing()}>BACK</button>
          <button className="btn cl-btn-blue mx-2" onClick={() => handleSubmit()}>ADD COURSE</button>
        </div>
      </div>
    )
  }
  return (
    <div className="w-100">
      <h2>Academics</h2>
      <GradeBlock 
        title="9th Grade" 
        grade={9} 
        terms={userResponses.years.find(el => el.grade === 9).terms} 
        isQuarter={userResponses.years.find(el => el.grade === 9).isQuarter}
        toggleIsQuarter={(year) => toggleIsQuarter(year)}
        addCourse={(grade, number) => addCourse(grade, number)} 
        deleteCourse={(grade, number, courseName) => deleteCourse(grade, number, courseName)}/>
      <GradeBlock
        title="10th Grade" 
        grade={10} 
        terms={userResponses.years.find(el => el.grade === 10).terms} 
        isQuarter={userResponses.years.find(el => el.grade === 10).isQuarter}
        toggleIsQuarter={(year) => toggleIsQuarter(year)}
        addCourse={(grade, number) => addCourse(grade, number)} 
        deleteCourse={(grade, number, courseName) => deleteCourse(grade, number, courseName)}/>
      <GradeBlock 
        title="11th Grade" 
        grade={11} 
        terms={userResponses.years.find(el => el.grade === 11).terms}
        isQuarter={userResponses.years.find(el => el.grade === 11).isQuarter}
        toggleIsQuarter={(year) => toggleIsQuarter(year)}
        addCourse={(grade, number) => addCourse(grade, number)} deleteCourse={(grade, number, courseName) => deleteCourse(grade, number, courseName)}/>
      <GradeBlock 
        title="12th Grade" 
        grade={12} 
        terms={userResponses.years.find(el => el.grade === 12).terms} 
        isQuarter={userResponses.years.find(el => el.grade === 12).isQuarter}
        toggleIsQuarter={(year) => toggleIsQuarter(year)}
        addCourse={(grade, number) => addCourse(grade, number)} 
        deleteCourse={(grade, number, courseName) => deleteCourse(grade, number, courseName)}/>
        <div 
          className="d-flex justify-content-center"
          style={{ flexDirection: size.width <= 810 ? "column" : "row" }}
        >
          <div className="mx-3">
            <SignUpShortText 
              type="number"
              onChange={(e) => {
                if (/[0-9]/.test(e) && e <= 1600 || e == '') {
                  handleSATInputChange(e);
                }
              }} 
              question={"SAT Score"} 
              value={userResponses.satScore} 
            />
              
          </div>
          <div className="mx-3">
            <SignUpShortText 
              type="number"
              onChange={(e) => {
                if (/[0-9]/.test(e) && e <= 40 || e == '') {
                  handleACTInputChange(e);
                }
              }}
              question={"ACT Score"} 
              value={userResponses.actScore} />
          </div>
        </div>
                
    </div>
  );
}

function GradeBlock(props: GradeBlockProps) {
    const [isQuarter, setIsQuarter] = useState(props.isQuarter);
    const term1 = props.terms.find(e => e.id == 1);
    const term2 = props.terms.find(e => e.id == 2);
    const term3 = props.terms.find(e => e.id == 3);
    const term4 = props.terms.find(e => e.id == 4);
    return (
      <div 
        className="d-flex flex-column w-100 my-4 p-5 border rounded" 
        style={{ backgroundColor: "#FAFAFC" }}
      >
        <div className="">
          <div className="d-flex justify-content-between w-90 mx-1 my-1 pb-4">
            <h4 style={{ color: "#506BED" }}>{props.title}</h4>
              <Button
                variant="primary" 
                onClick={() => {
                  setIsQuarter(!isQuarter);
                  props.toggleIsQuarter(props.grade)
                }}
              >
                {isQuarter ? <text>Quarter</text> : <text>Semester</text>}
              </Button>
          </div>
          <div>
            <div className="row">
              <div className="col-md">
                <div></div>
                <div className="d-flex justify-content-between mx-2">
                  {isQuarter ? <p style={{color: "#070452"}}>Quarter 1</p> : <p style={{color: "#070452"}}>Semester 1</p>}
                  <p style={{ color: "#808099" }}>Term GPA: {term1.gpa}</p>
                </div>
                <div>
                {term1?.courses?.map((course) => {
                    return (
                      <CourseCard
                      courseName={course.courseName}
                      subject={course.subject}
                      grade={course.grade}
                      tag={course.tag}
                      deleteCourse={() => props.deleteCourse(props.grade, term1.id, course.courseName)}
                    />
                    )
                  })}
                  
                </div>
                <div className="d-flex justify-content-between mx-2">
                <p style={{ color: "#808099" }}>{term1?.courses.length > 0 ? term1?.courses.length : 0} courses</p>
                  <a style={{ color: "#070452" }} onClick={(e) => props.addCourse(props.grade, 1)}>
                    + Add a course
                  </a>
                </div>
              </div>
              <div className="col-md">
                <div className="d-flex justify-content-between mx-2">
                {isQuarter ? <p style={{color: "#070452"}}>Quarter 2</p> : <p style={{color: "#070452"}}>Semester 2</p>}
                  <p style={{ color: "#808099" }}>Term GPA: {term2.gpa}</p>
                </div>
                <div>
                {term2?.courses?.map((course) => {
                    return (
                      <CourseCard
                      courseName={course.courseName}
                      subject={course.subject}
                      grade={course.grade}
                      tag={course.tag}
                      deleteCourse={() => props.deleteCourse(props.grade, term2.id, course.courseName)}
                    />
                    )
                  })}
                  
                </div>
                <div className="d-flex justify-content-between mx-2">
                <p style={{ color: "#808099" }}
                >{term2?.courses.length > 0 ? term2?.courses.length : 0} courses</p>                
                <a style={{ color: "#070452" }} onClick={(e) => props.addCourse(props.grade, 2)}>
                    + Add a course
                  </a>
                </div>
              </div>
            </div>
            <hr />
            {isQuarter ? (
            <div className="row mt-5 mb-2">
              <div className="col-md">
                <div className="d-flex justify-content-between mx-2">
                <p style={{color: "#070452"}}>Quarter 3</p>
                <p style={{ color: "#808099" }}>Term GPA: {term3.gpa}</p>
                </div>
                <div>
                  {term3?.courses?.map((course) => {
                    return (
                      <CourseCard
                      courseName={course.courseName}
                      subject={course.subject}
                      grade={course.grade}
                      tag={course.tag}
                      deleteCourse={() => props.deleteCourse(props.grade, term3.id, course.courseName)}
                    />
                    )
                  })}
                  
                </div>
                <div className="d-flex justify-content-between mx-2">
                <p style={{ color: "#808099" }}>{term3?.courses.length > 0 ? term3?.courses.length : 0} courses</p>    
                  <a style={{ color: "#070452" }} onClick={(e) => props.addCourse(props.grade, 3)}>
                    + Add a course
                  </a>
                </div>
              </div>


              <div className="col-md">
                <div className="d-flex justify-content-between mx-2">
                  <p style={{color: "#070452"}}>Quarter 4</p>
                  <p style={{ color: "#808099" }}>Term GPA: {term4.gpa}</p>
                </div>
                <div>
                {term4?.courses?.map((course) => {
                    return (
                      <CourseCard
                      courseName={course.courseName}
                      subject={course.subject}
                      grade={course.grade}
                      tag={course.tag}
                      deleteCourse={() => {
                        props.deleteCourse(props.grade, term4.id, course.courseName)
                      }}
                    />
                    )
                  })}
                  
                </div>
                <div className="d-flex justify-content-between mx-2">
                <p style={{ color: "#808099" }}>{term4?.courses.length > 0 ? term4?.courses.length : 0} courses</p>                
                <a style={{ color: "#070452" }} onClick={(e) => props.addCourse(props.grade, 4)}>
                  + Add a course
                  </a>
                </div>
              </div>
            </div> ) : null}
          </div>
        </div>
      </div>
    )
    
}

function CourseCard(props: CourseProps) {
  return (
    <div 
      className="d-flex flex-column mb-2 border rounded"
      style={{ backgroundColor: "white" }}
    >
      <div className="d-flex flex-row justify-content-between mx-3 my-2">
        <div>
          {props.courseName}
        </div>
        <div
          style={{ cursor: "pointer", border: "none" }}
          onClick={() => {
            props.deleteCourse();
          }}
        >
          <BiTrash />
        </div>
      </div>


      <div className="d-flex justify-content-between mx-3 my-2">
        <div style={{ backgroundColor: "#DCE1FB", borderRadius: '10px' }}>
          <div className="mx-2 my-1">
            {props.subject}
          </div>
        </div>
        <div style={{ backgroundColor: "#DCE1FB", borderRadius: '10px' }}>
          <div className="mx-2 my-1">
          Grade: {props.grade}
          </div>
        </div>
        <div style={{ backgroundColor: "#DCE1FB", borderRadius: '10px' }}>
          <div className="mx-2 my-1">
            {props.tag}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AcademicsSignUp;

