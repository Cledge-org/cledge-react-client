import classNames from "classnames";
import { useWindowSize } from "src/utils/hooks/useWindowSize";

const UWQuoteBlock = ({
    content,
  }: {
    content: string,
    isMobile: boolean,
  }) => {
    return (
      <div className="mx-3">
        <div style={{ position: "relative", top: "35px", left: "25px"}}>
          <img src={`images/uw_quote.svg`} alt="quote" />
        </div>
        <div
          style={{
            background: "#DCE1FB", 
            width: "25rem", 
            height: "11rem",
            border: "1px solid transparent",
            borderRadius: "10px"
          }}
        >
          <div
            className="d-flex justify-content-start"
            style={{
              position: "relative",
              top: "50px",
              left: "30px",
              fontWeight: 600,
              fontSize: "16px",
              lineHeight: "24px",
              width: "85%"
            }}
          >
            {content}
          </div>
        </div>
      </div>
    );
  };
export default UWQuoteBlock;
