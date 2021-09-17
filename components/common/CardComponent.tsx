import { useEffect } from "react";
import PropTypes from "prop-types";
export default function CardComponent(props) {
  useEffect(() => {}, []);
  const getBody = () => {
    switch (props.variant) {
      case "titleWithVid":
        return <div />;
      case "titleWithImg":
        return (
          <div className="center-child">
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
      default:
        return <div />;
    }
  };
  return (
    <div className="card-container mt-5">
      <div>
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
      <div>{getBody()}</div>
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
