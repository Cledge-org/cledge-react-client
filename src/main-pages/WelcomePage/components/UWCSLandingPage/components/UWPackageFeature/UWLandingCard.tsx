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
        height: "60vh",
        width: width < 800 ? "85vw" : "25%",
        background: "#818EFF",
        borderRadius: "8px",
        color: "white",
      }}
    >
      <div style={{ height: "0.8vh", background: "linear-gradient(92.92deg, rgba(80, 107, 237, 0.2) -8.48%, #F7BC76 95.28%)" }}></div>
      <div className="w-100 p-4" style={{ background: "rgb(0, 0, 0, 0.5)", height: width < 800 ? "30%" : "35%" }}>
        <div style={{ fontSize: width < 800 ? "1.8vh" : "1.1vw", fontWeight: 700 }}>{title}</div>
        <div style={{ fontSize: width < 800 ? "1.5vh" :"0.9vw" }} className="mt-3">{description}</div>
      </div>
      <div className="d-flex justify-content-center mx-5 mt-3" style={{ height: "50%" }}>
        <img style={{display: "block"}} src={`images/${imageSrc}`} />
      </div>
    </div>
  );
};
export default UWLandingCard;