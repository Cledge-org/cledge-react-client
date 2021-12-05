import { AppProps } from "next/dist/shared/lib/router/router";
import { ComponentProps, ComponentPropsWithoutRef, useEffect } from "react";
import Card from "./Card";
import { CardProps } from "./Card";
import Iframe from "react-iframe";
import YoutubeEmbed from "./YoutubeEmbed";

interface CardVideoProps extends CardProps {
  videoId: string;
}

export default function CardVideo({
  title,
  textGradient,
  videoId,
}: CardVideoProps) {
  useEffect(() => {}, []);
  return (
    <Card
      textGradient={textGradient}
      title={title}
      child={<YoutubeEmbed videoId={videoId} />}
      url={"https://www.youtube.com/watch?v=" + videoId}
    />
  );
}
