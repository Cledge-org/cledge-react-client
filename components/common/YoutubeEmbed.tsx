import React, { useEffect } from "react";

export default function YoutubeEmbed(props) {
  useEffect(() => {
    console.error(props.videoId);
  }, []);
  return (
    <div className="center-child m-0 p-0 h-auto">
      <iframe
        // className="w-100 h-100"
        src={"https://www.youtube.com/embed/" + props.videoId}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="video"
        height="50%"
        width="100%"
        style={{
          maxWidth: '100vw',
          minWidth:'480px',
          minHeight:'320px'
        }}
      />
    </div>
  );
}
