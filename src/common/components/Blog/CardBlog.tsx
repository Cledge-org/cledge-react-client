import { height } from "@mui/system";
import { useEffect } from "react";

interface BlogText {
  title,
  author,
  date,
  description,
  imageURL?
}

export default function BlogText({
  title,
  author,
  date,
  description,
  imageURL,
}: BlogText) {
  useEffect(() => {}, []);
  return (
    <>
      <div
        className={"d-flex flex-row"}
        style={{ height: "vh" }}
      >
        <div
          style={{ minHeight: "10vh", maxHeight: "30vh"}}
          className="px-4 pt-4 pb-4"
        >
          <div
            className={"text-dark h4"}
          >
            {title}
          </div>
          <div
            className="text-muted"
          >
            {author} - {date}
          </div>
          <div
            className="pt-3 text-dark"
          >
            {description}
          </div>
        </div>
        <div className=' col-md-3 container-fluid d-flex align-items-center justify-content-center'>
          <div>
            <img className="img-fluid rounded" src={imageURL} alt=""></img>
          </div>
        </div>
      </div>
    </>
  );
}
