import { useState } from "react";
import ECDropDown from "../question_components/ec_dropdown_question";

export default () => {
  const [waitlistForm, updateWaitlistForm] = useState({
    name: "",
    category: "Student",
    email: "",
    school: "",
    field: "General",
  });
  return (
    <div className="row align-items-center justify-content-center m-0 bg-light-blue pt-5">
      <div className="text-center col-11 col-md-6 col-lg-4 p-3">
        <h2>Join Our Waitlist</h2>
        <div className="text-start">
          <label
            style={{ fontSize: "0.9em" }}
            className="text-muted"
            htmlFor="name"
          >
            Name
          </label>
          <input
            value={waitlistForm.name}
            onChange={(e) =>
              updateWaitlistForm({ ...waitlistForm, name: e.target.value })
            }
            type="text"
            className="px-3 form-control"
            id="name"
            placeholder="Enter Name"
          />

          <div className="d-flex flex-row pt-4 pb-3 justify-content-between align-items-center">
            <div className="text-muted ">I AM A...</div>
            <ECDropDown
              defaultValue="Student"
              valuesList={["Student", "Parent", "Educator", "Other"]}
              onChange={(value) => {
                updateWaitlistForm({
                  ...waitlistForm,
                  category: value,
                });
              }}
            />
          </div>

          <label
            style={{ fontSize: "0.9em" }}
            className="text-muted"
            htmlFor="email"
          >
            Email address
          </label>
          <input
            value={waitlistForm.email}
            onChange={(e) =>
              updateWaitlistForm({ ...waitlistForm, email: e.target.value })
            }
            type="email"
            className="px-3 form-control mb-3"
            id="email"
            placeholder="Enter email"
          />

          <label
            style={{ fontSize: "0.9em" }}
            className="text-muted"
            htmlFor="school"
          >
            High School Name
          </label>
          <input
            value={waitlistForm.school}
            onChange={(e) =>
              updateWaitlistForm({ ...waitlistForm, school: e.target.value })
            }
            type="text"
            className="px-3 form-control mb-3"
            id="school"
            placeholder="Enter school"
          />

          <div className="d-flex flex-row justify-content-between align-items-center pt-4 pb-5">
            <div className="text-muted ">I AM INTERESTED IN STUDYING...</div>
            <div className="dropdown w-100 ml-3">
              <button
                className="btn btn-light cl-btn dropdown-toggle text-muted w-100 text-left waitlist-buttons"
                type="button"
                id="dropdownField"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {waitlistForm.field}
              </button>
              <ul
                className="dropdown-menu w-100"
                aria-labelledby="dropdownCategory"
              >
                <li>
                  <a
                    className="dropdown-item"
                    onClick={(e) =>
                      updateWaitlistForm({ ...waitlistForm, field: "General" })
                    }
                  >
                    General
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={(e) =>
                      updateWaitlistForm({ ...waitlistForm, field: "Arts" })
                    }
                  >
                    Arts
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={(e) =>
                      updateWaitlistForm({
                        ...waitlistForm,
                        field: "Engineering",
                      })
                    }
                  >
                    Engineering
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={(e) =>
                      updateWaitlistForm({
                        ...waitlistForm,
                        field: "Medical/Public Health",
                      })
                    }
                  >
                    Medical/Public Health
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={(e) =>
                      updateWaitlistForm({
                        ...waitlistForm,
                        field: "Computer Science",
                      })
                    }
                  >
                    Computer Science
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={(e) =>
                      updateWaitlistForm({ ...waitlistForm, field: "Business" })
                    }
                  >
                    Business
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={(e) =>
                      updateWaitlistForm({ ...waitlistForm, field: "Law" })
                    }
                  >
                    Law
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={(e) =>
                      updateWaitlistForm({ ...waitlistForm, field: "Others" })
                    }
                  >
                    Others
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <button className="cl-btn-blue text-white fs-5 fw-bold">
          Submit Form
        </button>
      </div>
    </div>
  );
};
