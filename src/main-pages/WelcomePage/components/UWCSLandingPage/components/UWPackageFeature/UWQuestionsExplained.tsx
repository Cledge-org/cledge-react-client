import { color } from "@mui/system";
import classNames from "classnames";
import { useWindowSize } from "src/utils/hooks/useWindowSize";

const UWQuestionsExplained = ({
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
        height: "850px",
        width: "1912px" ,
        marginTop: "30px",
        background: "#DCE1FB",
        // marginLeft: "10px",
        // borderRadius: "8px",
        color: "white",
      }}
    >
      <div style={{ fontSize: "28px", fontWeight: 800, marginBottom: "6px" }}>{title}</div>
      <img src={`images/${LogoSrc}`} style={{ position: "relative", top: "120px", right: "820px", height: "100px",}}/>
      <div style={{ fontSize: "28px", fontWeight: 700, lineHeight: "30.46px" , marginBottom: "6px", color: "#0B1142",
       width: "500px", height: "700px", justifyContent: "100px",
      position: "relative", top: "140px", left: "60px"}}>{description}</div>
      <img src={`images/${imageSrc}`} />
    </div>
  );
};
export default UWQuestionsExplained;
