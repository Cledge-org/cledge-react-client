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
  const [currTime, setCurrTime] = useState(videoTime ? videoTime : 0);
  const [player, setPlayer] = useState(null);
  setInterval(() => {
    setPlayer((player) => {
      onVideoTimeUpdate(player);
      return player;
    });
  }, 10000);
  useEffect(() => {
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
          })
        );
      };
    } else {
      console.log("ARRG");
      setPlayer(
        new window.YT.Player(videoId, {
          videoId,
        })
      );
    }
    return () => {};
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
