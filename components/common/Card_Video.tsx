import { AppProps } from "next/dist/shared/lib/router/router";
import { ComponentProps, ComponentPropsWithoutRef, useEffect } from "react";
import Card from "./Card";
import { CardProps } from "./Card";
import Iframe from 'react-iframe';

interface CardVideoProps extends CardProps{
}

export default function CardVideo({title, url}:CardVideoProps) {

  useEffect(() => {}, []);
  return (
    <Card 
        title = {title}
        child = {
            <Iframe url={url.toString()}/>
        }
        url={url}
    
    />
  );
}
