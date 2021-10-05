import { useEffect } from "react";
import Card from "./Card";
import { CardProps } from "./Card";

interface CardTaskProps extends CardProps {
  subtasks: any;
}

export default function CardTask({
  title,
  url,
  subtasks,
  textGradient,
}: CardTaskProps) {
  useEffect(() => {}, []);
  var subtasksList = subtasks.map( function(subtask) {
    return <div className="cl-mid-gray">{subtask}</div>;
  })
  return (
    <Card
      textGradient={textGradient}
      title={title}
      child={
        <div className="d-flex flex-column justify-content-evenly ms-3">
          {subtasksList}
          <button className="article-btn">View all</button>
        </div>
      }
      url={url}
    />
  );
}
