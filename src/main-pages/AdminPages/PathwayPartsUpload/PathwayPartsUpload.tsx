import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { NextApplicationPage } from "../../AppPage/AppPage";
import DropDownQuestion from "../../../common/components/Questions/DropdownQuestion/DropdownQuestion";
import UploadPage from "../components/UploadPage/UploadPage";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import router from "next/router";
import Modal from "react-modal";
import { callPutPathwayPart } from "src/utils/apiCalls";

// logged in landing page
const PathwayPartsUploadPage: NextApplicationPage<{
  allParts: PathwayPart_Db[];
  allPathways: Pathway[];
  allCheckins: QuestionList[];
}> = ({ allParts, allPathways, allCheckins }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const partTitles = allParts.map(({ name }) => name).concat("NEW PART");
  const pathwayTitles = allPathways.map(({ name }) => name);
  const checkinTitles = allCheckins.map(({ name }) => name);
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
    <UploadPage
      onUpload={() => {
        callPutPathwayPart({
          part: currPartData,
          partId: currPartData._id,
        }).then((value) => {
          let unsuccessful = false;
          //console.log(value.status);
          if (value.status !== 200) {
            unsuccessful = true;
            alert(
              "Upload Unsuccessful! (should probably talk to Yousef or Bryan)"
            );
          }
          if (!unsuccessful) {
            alert("Upload Successful!");
          }
          router.push({ pathname: "/my-learning" });
        });
      }}
    >
      <div className="mt-4 d-flex flex-column w-100">
        <div className="form-group">
          <label
            style={{ fontSize: "1.2em" }}
            className="text-muted"
            htmlFor="course-name"
          >
            CURRENT PART:
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
            placeholder="Enter part name"
          />
        </div>
        <div className="form-group">
          <label
            style={{ fontSize: "0.9em" }}
            className="text-muted"
            htmlFor="course-order"
          >
            Order of Part: (Ex: 3. The College Essays [ONLY THE NUMBER])
          </label>
          <input
            value={currPartData.order}
            onChange={(e) => {
              setCurrPartData({
                ...currPartData,
                order: isNaN(parseInt(e.target.value))
                  ? -1
                  : parseInt(e.target.value),
              });
            }}
            type="number"
            className="px-3 form-control"
            id="course-order"
            placeholder="Enter order"
          />
        </div>
        <div className="form-group">
          <label
            style={{ fontSize: "0.9em" }}
            className="text-muted"
            htmlFor="course-order"
          >
            Dynamic Routes:
          </label>
          <div className="ms-4">
            {currPartData.dynamicRoutes.map(({ type, routeId }, index) => (
              <>
                <button
                  className="me-2"
                  style={{
                    width: "36px",
                    height: "36px",
                    color: "red",
                  }}
                  onClick={() => {
                    let part = currPartData;
                    part.dynamicRoutes.splice(index, 1);
                    setCurrPartData({
                      ...currPartData,
                      dynamicRoutes: part.dynamicRoutes,
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <div className="form-group">
                  <label
                    style={{ fontSize: "1.2em" }}
                    className="text-muted"
                    htmlFor="course-name"
                  >
                    Type:
                  </label>
                  <DropDownQuestion
                    isForWaitlist
                    onChange={(value) => {
                      let part = currPartData;
                      part.dynamicRoutes[index].type = value;
                      setCurrPartData({
                        ...currPartData,
                        dynamicRoutes: part.dynamicRoutes,
                      });
                    }}
                    defaultValue={type ?? "pathway"}
                    valuesList={["pathway", "checkin"]}
                  />
                  <div className="mb-2" />
                </div>
                <div className="form-group">
                  <label
                    style={{ fontSize: "1.2em" }}
                    className="text-muted"
                    htmlFor="course-name"
                  >
                    Route ID:
                  </label>
                  <DropDownQuestion
                    isForWaitlist
                    onChange={(value) => {
                      let part = currPartData;
                      part.dynamicRoutes[index].routeId =
                        type === "pathway"
                          ? allPathways.find(({ name }) => name === value)._id
                          : allCheckins.find(({ name }) => name === value)._id;
                      //console.log(part.dynamicRoutes[index]);
                      setCurrPartData({
                        ...currPartData,
                        dynamicRoutes: part.dynamicRoutes,
                      });
                    }}
                    defaultValue={
                      type === "pathway"
                        ? allPathways.find(({ _id }) => _id === routeId)?.name
                        : allCheckins.find(({ _id }) => _id === routeId)?.name
                    }
                    placeholder={"Pick a route (like a checkin or pathway)..."}
                    valuesList={
                      type === "pathway" ? pathwayTitles : checkinTitles
                    }
                  />
                  <div className="mb-2" />
                </div>
              </>
            ))}
            <button
              className="align-self-center align-items-center justify-content-center"
              onClick={() => {
                let part = currPartData;
                part.dynamicRoutes.push({
                  type: "pathway",
                  routeId: undefined,
                });
                setCurrPartData({
                  ...currPartData,
                  dynamicRoutes: part.dynamicRoutes,
                });
              }}
            >
              ADD NEW ROUTE
            </button>
          </div>
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
              <button
                className="cl-btn-blue me-2"
                onClick={() => {
                  callPutPathwayPart({
                    partId: currPartData._id,
                  }).then((value) => {
                    let unsuccessful = false;
                    //console.log(value.status);
                    if (value.status !== 200) {
                      unsuccessful = true;
                      alert(
                        "Upload Unsuccessful! (should probably talk to Yousef or Bryan)"
                      );
                    }
                    if (!unsuccessful) {
                      alert("Upload Successful!");
                    }
                    router.push({ pathname: "/my-learning" });
                  });
                }}
              >
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
