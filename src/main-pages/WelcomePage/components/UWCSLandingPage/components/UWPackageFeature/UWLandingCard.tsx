import classNames from "classnames";
import { useWindowSize } from "src/utils/hooks/useWindowSize";

const UWLandingCard = ({
  title,
  description,
  imageSrc,
  className,
}: {
  title: string;
  description: string;
  imageSrc: string;
  className?: string;
}) => {
  const { width, height } = useWindowSize();
  return (
    <div
      className={classNames("d-flex flex-column mx-4", className)}
      style={{
        height: width < 800 ? "60vh" : "50vh",
        width: width < 800 ? "85vw" : "25%",
        background: "#818EFF",
        borderRadius: "8px",
        color: "white",
      }}
    >
      <div className="w-100 p-4" style={{ background: "rgb(0, 0, 0, 0.5)", height: "15rem" }}>
        <div style={{ fontSize: "20px", fontWeight: 700 }}>{title}</div>
        <div className="mt-3">{description}</div>
      </div>
      <div className="d-flex justify-content-center h-100 mx-5">
        <img src={`images/${imageSrc}`} />
      </div>
    </div>
  );
};
export default UWLandingCard;
