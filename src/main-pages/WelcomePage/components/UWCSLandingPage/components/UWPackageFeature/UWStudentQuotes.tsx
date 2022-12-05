import classNames from "classnames";
import { useWindowSize } from "src/utils/hooks/useWindowSize";

const UWQuotes = ({
  title,
  description,
  imageSrc,
  LogoSrc,
  className,
}: {
  title: string;
  description: string;
  imageSrc: string;
  LogoSrc: string;
  className?: string;
}) => {
  const { width, height } = useWindowSize();
  return (
    <div
    className={classNames("d-flex flex-column p-4", className)}
    style={{
      height: "173px",
      width: width < 800 ? "85vw" : "25%",
      marginTop: "169px",
      background: "#DCE1FB",
      marginLeft: "10px",
      borderRadius: "8px",
      marginBottom: "60px",
      color: "#070452",
    }}
  >
    <div style={{ fontSize: "22px", fontWeight: 800}}>{title}</div>
    <img src={`images/${imageSrc}`} style={{ position: "relative", top: "-85px", height: "86px", right: "120px"}}/>
    <div style={{ position: "relative", top: "-65px"}}>{description}</div>
  </div>
  );
};
export default UWQuotes;
