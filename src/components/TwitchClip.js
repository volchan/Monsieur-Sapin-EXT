import React from "react";

const renderTitle = (title, length) => {
  if (title.length >= length) {
    return `${title.substring(0, length)}...`;
  } else {
    return title;
  }
};

const TwitchClip = ({ clip }) => {
  return (
    <div
      className="card"
      style={{
        backgroundImage: `url(${clip.thumbnails.medium})`
      }}
    >
      <div className="card-infos">
        <div className="card-infos-game-title">
          <div className="card-infos-title">
            <p className="title">{renderTitle(clip.title, 25)}</p>
            <p className="date">
              {new Date(clip.created_at).toLocaleDateString("fr-FR")}
            </p>
            <p className="game">{clip.game}</p>
          </div>
        </div>
        <div className="card-infos-author">
          <div
            className="author-avatar"
            style={{
              backgroundImage: `url(${clip.curator.logo})`
            }}
          />
          <div className="author-name">{clip.curator.display_name}</div>
        </div>
      </div>
      <a href={clip.url} />
    </div>
  );
};

export default TwitchClip;
