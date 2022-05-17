import { useEffect } from "react";
import Card, { CardProps } from "../Card/Card";

interface CardTextProps extends CardProps {
  snippet: String;
}

export default function CardText({
  title,
  snippet,
  url,
  textGradient,
}: CardTextProps) {
  useEffect(() => {}, []);
  return (
    <Card
      textGradient={textGradient}
      title={title}
      child={
        <div className="d-flex flex-column justify-content-evenly ms-3">
          <div className="cl-mid-gray">{snippet}</div>
          <button className="article-btn">view full article</button>
        </div>
      }
      url={url}
    />
  );
}
