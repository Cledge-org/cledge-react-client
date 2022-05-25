import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { NextApplicationPage } from "../../AppPage/AppPage";
import DropDownQuestion from "../../../common/components/Questions/DropdownQuestion/DropdownQuestion";
import UploadPage from "../components/UploadPage/UploadPage";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import router from "next/router";
import Modal from "react-modal";

// logged in landing page
const PathwayPartsUploadPage: NextApplicationPage<{
  allParts: PathwayPart_Db[];
}> = ({ allParts }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const partTitles = allParts.map(({ name }) => name).concat("NEW PART");
  const [currPartData, setCurrPartData]: [
    currPartData: PathwayPart_Db,
    setCurrPartData: Dispatch<SetStateAction<PathwayPart_Db>>
  ] = useState({
    _id: null,
    name: "",
    order: -1,
    dynamicRoutes: [],
  });
  return (
    <UploadPage onUpload={() => {}}>
      <div className="mt-4 d-flex flex-column w-100">
        <div className="form-group">
          <label
            style={{ fontSize: "1.2em" }}
            className="text-muted"
            htmlFor="course-name"
          >
            CURRENT PATHWAY:
          </label>
          <DropDownQuestion
            isForWaitlist
            onChange={(value) => {
              if (value === "NEW PART") {
                setCurrPartData({
                  _id: null,
                  name: "",
                  order: -1,
                  dynamicRoutes: [],
                });
                return;
              }
              let courseIndex = partTitles.indexOf(value);
              setCurrPartData(allParts[courseIndex]);
            }}
            defaultValue={"NEW PART"}
            valuesList={partTitles}
          />
          <div className="mb-2" />
        </div>
        {currPartData._id === null ? null : (
          <div className="form-group">
            <button
              className="cl-btn-red w-100"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              DELETE THIS PART
            </button>
          </div>
        )}
        <div className="form-group">
          <label
            style={{ fontSize: "0.9em" }}
            className="text-muted"
            htmlFor="course-name"
          >
            Part name:
          </label>
          <input
            value={currPartData.name}
            onChange={(e) =>
              setCurrPartData({
                ...currPartData,
                name: e.target.value,
              })
            }
            type="text"
            className="px-3 form-control"
            id="course-name"
            placeholder="Enter course name"
          />
        </div>
        <div className="form-group">
          <label
            style={{ fontSize: "0.9em" }}
            className="text-muted"
            htmlFor="course-order"
          >
            Order:
          </label>
          <input
            value={currPartData.order}
            onChange={(e) => {
              if (isNaN(parseInt(e.target.value))) {
                return;
              }
              setCurrPartData({
                ...currPartData,
                order: parseInt(e.target.value),
              });
            }}
            type="number"
            className="px-3 form-control"
            id="course-order"
            placeholder="Enter order"
          />
        </div>
        <Modal
          ariaHideApp={false}
          style={{
            overlay: {
              background: "rgba(50, 50, 50, 0.5)",
            },
            content: {
              top: "30%",
              left: "35%",
              width: "30%",
              height: "fit-content",
              borderRadius: "20px",
              borderColor: "white",
              zIndex: 100,
            },
          }}
          onRequestClose={() => {
            setModalOpen(false);
          }}
          isOpen={modalOpen}
        >
          <div className="center-child flex-column">
            Are you sure you want to delete this pathway?
            <div className="w-100 center-child mt-3">
              <button className="cl-btn-blue me-2" onClick={() => {}}>
                Yes
              </button>
              <button
                onClick={() => {
                  setModalOpen(false);
                }}
                className="cl-btn-clear ms-2"
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </UploadPage>
  );
};
export default PathwayPartsUploadPage;
