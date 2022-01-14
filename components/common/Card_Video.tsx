import { AppProps } from "next/dist/shared/lib/router/router";
import { ComponentProps, ComponentPropsWithoutRef, useEffect } from "react";
import Card from "./Card";
import { CardProps } from "./Card";
import Iframe from "react-iframe";
import YoutubeEmbed from "./YoutubeEmbed";

interface CardVideoProps extends CardProps {
  videoUrl: string;
}

export default function CardVideo({
  title,
  textGradient,
  videoUrl,
}: CardVideoProps) {
  useEffect(() => {}, []);
  return (
    <Card
      textGradient={textGradient}
      title={title}
      child={
        <YoutubeEmbed
          videoId={videoUrl.substring(videoUrl.indexOf("v=") + 2)}
        />
      }
      url={videoUrl}
    />
  );
}
