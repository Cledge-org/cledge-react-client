import React, { useRef, useState} from "react";
import ReactPlayer from "react-player/lazy";

export default function VideoPlayer() {
  const playerRef = useRef()

  return (
    <div className={`center-child m-0 p-0 h-100`}>
      <ReactPlayer
        id={videoId}
        className={styles.reactPlayer}
        width="100%"
        height="100%"
        controls
        playing
        playIcon={
          <Btn
            style={{
              maxWidth: "90vw",
              minWidth: "300px",
              minHeight: "200px",
              width: "100%",
              height: "100%",
            }}
          >
            <Play weight="fill" color="--ifm-text-black" size={24} />
          </Btn>
        }
        url="https://vimeo.com/226053498"
      ></ReactPlayer>
    </div>
  );
}
// return (
//     <div className={`center-child m-0 p-0 h-100`}>
//       <div
//         id={videoId}
      //   style={{
      //     maxWidth: "90vw",
      //     minWidth: "300px",
      //     minHeight: "200px",
      //     width: "100%",
      //     height: "100%",
      //   }}
      // />
//     </div>
//   );
// }