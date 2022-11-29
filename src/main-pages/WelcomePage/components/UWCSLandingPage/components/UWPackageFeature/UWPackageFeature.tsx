import classNames from "classnames";
import { useWindowSize } from "src/utils/hooks/useWindowSize";

const UWPackageFeature = ({
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
      className={classNames("d-flex flex-column p-4", className)}
      style={{
        height: width < 800 ? "60vh" : "45vh",
        width: width < 800 ? "85vw" : "25%",
        marginTop: "30px",
        background: "#818EFF",
        // marginLeft: "10px",
        // borderRadius: "8px",
        color: "white",
      }}
    >
      <div style={{ fontSize: "22px", fontWeight: 800, marginBottom: "6px" }}>{title}</div>
      <div>{description}</div>
      <img src={`images/${imageSrc}`} />
    </div>
  );
};
export default UWPackageFeature;
