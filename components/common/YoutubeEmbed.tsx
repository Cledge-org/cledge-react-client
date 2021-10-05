import React, { useEffect } from "react";

export default function YoutubeEmbed(props) {
  useEffect(() => {
    console.error(props.videoId);
  }, []);
  return (
    <div className="d-inline m-0 p-0 h-auto">
      <iframe
        // className="w-100 h-100"
        src={"https://www.youtube.com/embed/" + props.videoId}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="video"
        height="200%"
        width="100%"
      />
    </div>
  );
}
