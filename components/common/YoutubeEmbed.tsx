import React, { useEffect, useState } from "react";

export default function YoutubeEmbed({
  videoId,
  isPathway,
  onVideoFinish,
  videoTime,
}: {
  videoId: string;
  isPathway?: boolean;
  onVideoFinish?: Function;
  videoTime?: number;
}) {
  const [currTime, setCurrTime] = useState(videoTime ? videoTime : 0);
  const [player, setPlayer] = useState(null);
  useEffect(() => {
    console.log(window.YT);
    if (!window.YT) {
      console.log("HI");
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      window.onYoutubeIframeReady = () => {
        console.log("GRRR");
        setPlayer(
          new window.YT.Player(videoId, {
            events: {
              onStateChange: (event) => {
                console.log(event);
              },
            },
          })
        );
      };
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      console.log("ARRG");
      setPlayer(
        new window.YT.Player(videoId, {
          videoId,
          events: {
            onStateChange: (event) => {
              console.log(event);
            },
          },
        })
      );
    }

    return () => {};
  }, []);

  return (
    <div className={`center-child m-0 p-0 ${isPathway ? "h-100" : "h-auto"}`}>
      <iframe
        src={
          "https://www.youtube.com/embed/" +
          videoId +
          "?start=" +
          (videoTime ? videoTime : 0)
        }
        frameBorder="0"
        id={videoId}
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="video"
        height={isPathway ? "100%" : "50%"}
        width="100%"
        style={{
          maxWidth: "90vw",
          minWidth: "300px",
          minHeight: "200px",
        }}
      />
    </div>
  );
}
