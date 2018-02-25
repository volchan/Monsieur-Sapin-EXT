import React from "react";

const renderTitle = (title, length) => {
  if (title.length >= length) {
    return `${title.substring(0, length)}...`;
  } else {
    return title;
  }
};

const YoutubeVideo = ({ video }) => {
  return (
    <div className="card youtube" style={{backgroundImage: `url('${
      video.snippet.thumbnails.high.url
    }')`}}>
      <div className="card-infos youtube">
        <p className="date">{new Date(
          video.snippet.publishedAt
        ).toLocaleDateString("fr-FR")}</p>
        <p className="title">{renderTitle(video.snippet.title, 50)}</p>
      </div>
      <a href="https://www.youtube.com/watch?v=${video.id.videoId}"></a>
    </div>
  );
};

export default YoutubeVideo;
