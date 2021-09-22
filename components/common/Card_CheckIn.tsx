import { useEffect } from "react";
import Card from "./Card";
import { CardProps } from "./Card";

interface CardCheckInProps extends CardProps {
  snippet: String;
}

export default function CardCheckIn({
  title,
  snippet,
  url,
  textGradient,
}: CardCheckInProps) {
  useEffect(() => {}, []);
  return (
    <Card
      textGradient={textGradient}
      title={title}
      child={
        <div className="d-flex flex-column justify-content-evenly ms-1">
          <div className="cl-mid-gray">{snippet}</div>
          <div className="d-flex justify-content-between align-items-center">
            <button className="cl-btn-blue">Start</button>
            71%
          </div>
        </div>
      }
      url={url}
    />
  );
}
