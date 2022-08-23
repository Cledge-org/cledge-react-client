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
      className={classNames(
        "d-flex flex-column p-4",
        width > 800 && className,
        { "mt-3": width < 800 }
      )}
      style={{
        height: width < 800 ? "70vh" : "50vh",
        width: width < 800 ? "90%" : "25%",
        background: "#506BED",
        borderRadius: "8px",
        color: "white",
      }}
    >
      <div style={{ fontSize: "36px", fontWeight: 800 }}>{title}</div>
      <div>{description}</div>
      <img src={`images/${imageSrc}`} />
    </div>
  );
};
export default UWPackageFeature;
