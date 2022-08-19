import classNames from "classnames";

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
  return (
    <div
      className={classNames("d-flex flex-column p-4", className)}
      style={{
        height: "50vh",
        width: "25%",
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
