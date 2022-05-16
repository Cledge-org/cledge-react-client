import React, { useEffect, useRef, useState } from "react";
export default function YoutubeEmbed({
  videoId,
  isPathway,
  onVideoTimeUpdate,
  videoTime,
  isVideoFinished,
}: {
  videoId: string;
  isPathway?: boolean;
  onVideoTimeUpdate?: Function;
  videoTime?: number;
  isVideoFinished?: boolean;
}) {
  //**********************************
  //**********************************
  //****************NOTE*************:
  //THIS ALL WORKS EVEN THOUGH IT DOESN'T LOOK LIKE IT DOES!
  //*************************************
  const [player, setPlayer] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  console.log(videoTime);
  useEffect(() => {
    console.log("UPDATING");
  }, [intervalId]);
  useEffect(() => {
    if (isPathway && intervalId === null) {
      setIntervalId(
        setInterval(() => {
          setPlayer((player) => {
            console.log(videoId);
            onVideoTimeUpdate(player);
            return player;
          });
        }, 10000)
      );
    }
    console.log(videoId);
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.type = "text/javascript";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = () => {
        setPlayer(
          new window.YT.Player(videoId, {
            videoId,
            playerVars: {
              start: !isVideoFinished && videoTime ? videoTime : 0,
            },
          })
        );
      };
    } else {
      setPlayer(
        new window.YT.Player(videoId, {
          videoId,
          playerVars: { start: !isVideoFinished && videoTime ? videoTime : 0 },
        })
      );
    }
    return () => {
      let retreivedIntervalId = null;
      setIntervalId((intervalId) => {
        retreivedIntervalId = intervalId;
        return intervalId;
      });
      clearInterval(retreivedIntervalId);
    };
  }, []);

  return (
    <div className={`center-child m-0 p-0 h-100`}>
      <div
        id={videoId}
        style={{
          maxWidth: "90vw",
          minWidth: "300px",
          minHeight: "200px",
          width: "100%",
          height: "100%"
        }}
      />
    </div>
  );
}
