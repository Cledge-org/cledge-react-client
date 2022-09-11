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
        <div className='mb-5 float-right col-md-4 container-fluid d-flex align-items-center justify-content-center'>
          <div className='w-100 h-75'>
            <img className="img-fluid" src={imageURL} alt="alt"></img>
          </div>
        </div>
      </div>
    </>
  );
}
