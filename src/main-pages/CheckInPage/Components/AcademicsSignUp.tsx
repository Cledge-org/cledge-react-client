/* eslint-disable @next/next/no-img-element */
import { borderRadius } from "@mui/system";
import { number } from "prop-types";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { BiTrash } from "react-icons/bi";
import { useWindowSize } from "src/utils/hooks/useWindowSize";


export interface AcademicsProps {
  years: GradeBlockProps[]
}

interface GradeBlockProps {
  title: string
  grade: number
  terms: Term[]
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
  const [currGrade, setCurrGrade] = useState(0);
  const [currTerm, setCurrTerm] = useState(0);

  const handleSubmit = () => {
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
    console.log("AFTER ADD " + JSON.stringify(userResponses));
    setUserResponses(userResponses);
    setIsAddingCourse(false);
  }

  const deleteCourse = (grade: number, term: number, courseName: string) => {
    setCurrGrade(grade);
    setCurrTerm(term);
    const courseToDelete = userResponses.years.find(e => e.grade == grade)
    .terms.find(e => e.id == term).courses.find(e => e.courseName == courseName);
    // userResponses.years.find(e => e.grade == grade)
    // .terms.find(e => e.id == term).courses
    // .splice(userResponses.years.find(e => e.grade == grade)
    // .terms.find(e => e.id == term).courses.indexOf(courseToDelete), 1);
    const newUserResponses = userResponses;
    newUserResponses.years.find(e => e.grade == grade)
    .terms.find(e => e.id == term).courses = newUserResponses.years.find(e => e.grade == grade)
    .terms.find(e => e.id == term).courses
    .filter((course) => course.courseName != courseName);
    console.log(newUserResponses.years.find(e => e.grade == grade)
    .terms.find(e => e.id == term).courses);
    console.log(courseName);
    setUserResponses(newUserResponses);
    
    console.log("AFTER DELETE " + JSON.stringify(userResponses));
  }

  const addCourse = (grade: number, term: number) => {
    setCurrGrade(grade);
    setCurrTerm(term);
    setIsAddingCourse(true);
  }

  if (isAddingCourse) {
    return (
      <div>
        <div>
          <input
            defaultValue={""}
            placeholder="Course Name"
            onChange={(e) => {
              setTempCourse({
                courseName: e.target.value,
                subject: tempCourse.subject,
                grade: tempCourse.grade,
                tag: tempCourse.tag
              })
              console.log(tempCourse);
            }}
            value={tempCourse.courseName}
          />
          <div>
            <select 
              id="dropdown"
              onChange={(e) => {
                setTempCourse({
                  courseName: tempCourse.courseName,
                  subject: e.target.value,
                  grade: tempCourse.grade,
                  tag: tempCourse.tag
                })
                console.log(tempCourse);
              }}
            >
              <option selected value="Math">Math</option>
              <option value="Science">Science</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <input
            type="number"
            defaultValue={""}
            placeholder="Grade (unweighted)"
            onChange={(e) => {
                setTempCourse({
                  courseName: tempCourse.courseName,
                  subject: tempCourse.subject,
                  grade: Number.parseFloat(e.target.value),
                  tag: tempCourse.tag
                })         
                console.log(tempCourse);
            }}
            value={tempCourse.grade}
          />
          <div>
            <select 
              id="dropdown"
              onChange={(e) => {
                setTempCourse({
                  courseName: tempCourse.courseName,
                  subject: tempCourse.subject,
                  grade: tempCourse.grade,
                  tag: e.target.value
                })
                console.log(tempCourse);
              }}
            >
              <option selected value="Regular/Standard">Regular/Standard</option>
              <option value="Honors/Accelerated">Honors/Accelerated</option>
              <option value="AP">AP</option>
              <option value="IB">IB</option>
              <option value="College">College</option>
            </select>
          </div>
        </div>
        <button onClick={() => setIsAddingCourse(false)}>BACK</button>
        <button onClick={() => handleSubmit()}>ADD COURSE</button>
      </div>
    )
  }
  return (
    <div>
      <h2>Academics</h2>
      <GradeBlock 
        title="9th Grade" 
        grade={9} 
        terms={userResponses.years.find(el => el.title === "9th Grade").terms} 
        addCourse={(grade, number) => addCourse(grade, number)} 
        deleteCourse={(grade, number, courseName) => deleteCourse(grade, number, courseName)}/>
      <GradeBlock
        title="10th Grade" 
        grade={10} 
        terms={userResponses.years.find(el => el.title === "10th Grade").terms} 
        addCourse={(grade, number) => addCourse(grade, number)} 
        deleteCourse={(grade, number, courseName) => deleteCourse(grade, number, courseName)}/>
      <GradeBlock 
        title="11th Grade" 
        grade={11} 
        terms={userResponses.years.find(el => el.title === "11th Grade").terms}
        addCourse={(grade, number) => addCourse(grade, number)} deleteCourse={(grade, number, courseName) => deleteCourse(grade, number, courseName)}/>
      <GradeBlock 
        title="12th Grade" 
        grade={12} 
        terms={userResponses.years.find(el => el.title === "12th Grade").terms} 
        addCourse={(grade, number) => addCourse(grade, number)} 
        deleteCourse={(grade, number, courseName) => deleteCourse(grade, number, courseName)}/>
    </div>
  );
}

function GradeBlock(props: GradeBlockProps) {
    const [isQuarter, setIsQuarter] = useState(true);
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
          <div className="d-flex justify-content-between w-90 mx-1 my-1">
            <h4 style={{ color: "#506BED" }}>{props.title}</h4>
            <select onChange={(e) => {
              if (e.target.value === "quarter") {
                setIsQuarter(true);
              } else {
                setIsQuarter(false);
              }
            }}>
              <option selected value="quarter">Quarter</option>
              <option value="semester">Semester</option>
            </select>
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
                  <p style={{ color: "#808099" }}>Term GPA:{term4.gpa}</p>
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

