import pdfMake from "pdfmake";
import { getPathwayProgressToDownload } from "src/utils/apiCalls";

const StudentProgressDownloadPage = ({
  allStudents,
}: {
  allStudents: AccountInfo[];
}) => {
  console.log(allStudents);
  return (
    <div className="vw-100 d-flex flex-column vh-100 align-items-center">
      {allStudents.map(({ firebaseId, name }) => (
        <div
          style={{ border: "1px solid lightgray" }}
          className="w-50 py-3 px-3 d-flex align-items-center justify-content-between"
        >
          {name}
          <button
            onClick={async () => {
              const userPathwayProgress = await getPathwayProgressToDownload(
                firebaseId
              );
              pdfMake.fonts = {
                Roboto: {
                  normal:
                    "src/main-pages/AdminPages/StudentProgressDownloadPage/fonts/Roboto-Regular.ttf",
                  bold: "./fonts/Roboto-Regular.ttf",
                  italics: "./fonts/Roboto-Regular.ttf",
                  bolditalics: "./fonts/Roboto-Regular.ttf",
                },
              };
              pdfMake
                .createPdf({
                  content: [
                    { text: "Pathway Progress", fontFamily: "Arial" },
                    { text: userPathwayProgress, fontFamily: "Arial" },
                  ],
                })
                .download();
            }}
          >
            Download {name}'s Pathway Progress
          </button>
        </div>
      ))}
    </div>
  );
};
export default StudentProgressDownloadPage;
