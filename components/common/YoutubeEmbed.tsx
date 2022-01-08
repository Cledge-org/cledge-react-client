import React, { useEffect, useRef, useState } from "react";

export default function YoutubeEmbed({
  videoId,
  isPathway,
  onVideoTimeUpdate,
  videoTime,
}: {
  videoId: string;
  isPathway?: boolean;
  onVideoTimeUpdate?: Function;
  videoTime?: number;
}) {
  //****************NOTE*************:
  //THIS ALL WORKS EVEN THOUGH IT DOESN'T LOOK LIKE IT DOES!
  //*************************************
  const [player, setPlayer] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  useEffect(() => {
    if (isPathway && intervalId === null) {
      setIntervalId(
        setInterval(() => {
          setPlayer((player) => {
            onVideoTimeUpdate(player);
            return player;
          });
        }, 10000)
      );
    }
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.type = "text/javascript";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = () => {
        console.log("GRRR");
        setPlayer(
          new window.YT.Player(videoId, {
            videoId,
            start: videoTime ? videoTime : 0,
          })
        );
      };
    } else {
      console.log("ARRG");
      setPlayer(
        new window.YT.Player(videoId, {
          videoId,
          start: videoTime ? videoTime : 0,
        })
      );
    }
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={`center-child m-0 p-0 ${isPathway ? "h-100" : "h-auto"}`}>
      <div
        id={videoId}
        style={{
          maxWidth: "90vw",
          minWidth: "300px",
          minHeight: "200px",
          width: "100%",
          height: isPathway ? "100%" : "50%",
        }}
      />
    </div>
  );
}
