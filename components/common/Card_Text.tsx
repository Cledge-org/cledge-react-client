
import { useEffect } from "react";
import Card from "./Card";
import { CardProps } from "./Card";

interface CardTextProps extends CardProps{
  snippet: String
}

export default function CardText({title, snippet, url}:CardTextProps) {

  useEffect(() => {}, []);
  return (
    <Card 
        title = {title}
        child = {
            <div className='d-flex flex-row flex-shrink-1 mw-100 text-wrap text-vo'>
                {snippet}
            </div>
        }
        url={url}
    
    />
  );
}
