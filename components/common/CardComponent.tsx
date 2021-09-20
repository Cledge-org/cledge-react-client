import { useEffect } from "react";
import PropTypes from "prop-types";
import YoutubeEmbed from "./YoutubeEmbed";
export default function CardComponent(props) {
  useEffect(() => {}, []);
  const getBody = () => {
    switch (props.variant) {
      case "titleWithImg":
        return (
          <div className="center-child h-100 w-100">
            <img src="/images/SAT-vocabulary.png" />
          </div>
        );
      case "article":
        return (
          <div className="d-flex flex-column justify-content-evenly ms-3">
            <div className="cl-mid-gray">{props.centerText}</div>
            <button className="article-btn">view full article</button>
          </div>
        );
      case "titleWithVid":
        return (
          <div className="center-child h-100 w-100">
            <YoutubeEmbed videoId="AHCEehbI3zo" />
          </div>
        );
      default:
        return <div />;
    }
  };
  return (
    <div
      style={
        props.variant === "titleWithVid"
          ? { width: "40vw", height: "45vh" }
          : { width: "30vw", height: "30vh" }
      }
      className="card-container mt-5 d-flex flex-column"
    >
      <div className="d-flex" style={{ flex: 1 }}>
        <div
          className={
            props.titleGradients
              ? props.titleGradients == "dark"
                ? "card-title blue-purple-text-gradient"
                : "card-title red-purple-text-gradient"
              : "card-title red-purple-text-gradient"
          }
        >
          {props.title}
        </div>
      </div>
      <div className="d-flex" style={{ flex: 3 }}>
        {getBody()}
      </div>
    </div>
  );
}
CardComponent.propTypes = {
  title: PropTypes.string.isRequired,
  titleGradients: PropTypes.string.isRequired,
  imagePath: PropTypes.string,
  centerText: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  variant: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
