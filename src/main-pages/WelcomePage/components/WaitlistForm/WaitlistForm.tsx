import { useState } from "react";
import DropDownQuestion from "src/common/components/Questions/DropdownQuestion/DropdownQuestion";

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

          <div className="d-flex flex-row pt-3 pb-3 justify-content-between align-items-center">
            <div
              className="text-muted"
              style={{ width: "20%", height: "100%" }}
            >
              I AM A...
            </div>
            <DropDownQuestion
              isForWaitlist
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
            <DropDownQuestion
              isForWaitlist
              defaultValue="General"
              valuesList={[
                "General",
                "Arts",
                "Engineering",
                "Medical/Public Health",
                "Computer Science",
                "Business",
                "Law",
                "Others",
              ]}
              onChange={(value) => {
                updateWaitlistForm({
                  ...waitlistForm,
                  field: value,
                });
              }}
            />
          </div>
        </div>
        <button className="cl-btn-blue text-white fs-5 fw-bold">
          Submit Form
        </button>
      </div>
    </div>
  );
};
