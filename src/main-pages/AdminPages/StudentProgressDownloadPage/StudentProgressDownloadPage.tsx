import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { getPathwayProgressToDownload } from "src/utils/apiCalls";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const StudentProgressDownloadPage = ({
  allStudents,
}: {
  allStudents: AccountInfo[];
}) => {
  //console.log(allStudents);
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
              //console.log(firebaseId);
              const userPathwayProgress = await getPathwayProgressToDownload(
                firebaseId
              );
              const document = {
                content: [{ text: "Pathway Progress", color: "black" }],
              };
              document.content.push({
                text: " ",
                color: "black",
              });
              userPathwayProgress.forEach(
                ({ name, moduleProgress, finished }) => {
                  document.content.push({
                    text: "Pathway: " + name,
                    color: finished ? "green" : "red",
                  });
                  moduleProgress.forEach(
                    ({ name, contentProgress, finished }) => {
                      document.content.push({
                        text: "|      Module: " + name,
                        color: finished ? "green" : "red",
                      });
                      contentProgress.forEach(({ name, finished }) => {
                        document.content.push({
                          text: "$            Content: " + name,
                          color: finished ? "green" : "red",
                        });
                      });
                    }
                  );
                  document.content.push({ text: " ", color: "black" });
                }
              );
              userPathwayProgress;
              pdfMake
                .createPdf(document)
                .download(
                  `${name
                    .split(" ")
                    .reduce(
                      (prev, curr) => prev + curr,
                      ""
                    )}_PathwayProgress.pdf`
                );
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
