import React, { useEffect } from "react";

export default function YoutubeEmbed({
  videoId,
  isPathway,
}: {
  videoId: string;
  isPathway?: boolean;
}) {
  useEffect(() => {
    console.error(videoId);
  }, []);
  return (
    <div className={`center-child m-0 p-0 ${isPathway ? "h-100" : "h-auto"}`}>
      <iframe
        src={"https://www.youtube.com/embed/" + videoId}
        frameBorder="0"
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
