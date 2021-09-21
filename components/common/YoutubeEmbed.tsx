import React, { useEffect } from "react";

export default function YoutubeEmbed(props) {
  useEffect(() => {
    console.error(props.videoId);
  }, []);
  return (
    <div className="center-child" style={{ width: "90%", height: "95%" }}>
      <iframe
        className="w-100 h-100"
        src={"https://www.youtube.com/embed/" + props.videoId}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="video"
      />
    </div>
  );
}
