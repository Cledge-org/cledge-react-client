const UWPackageFeature = ({
  title,
  description,
  imageSrc,
}: {
  title: string;
  description: string;
  imageSrc: string;
}) => {
  return (
    <div
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
