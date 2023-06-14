import React, { useState } from "react";
import { Link } from "react-router-dom";

const AlbumImgItem = ({ track }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <Link to={`/track-detail/${track.id}`} className="img__link">
        <img
          className="img__cover"
          width={150}
          height={150}
          src={track.album.images[1].url}
          alt={track.name}
          onMouseOver={() => setIsPlaying(true)}
          onMouseOut={() => setIsPlaying(false)}
        />
        {isPlaying && (
          <audio autoPlay={true} loop src={track.preview_url}></audio>
        )}
      </Link>
    </>
  );
};

export default AlbumImgItem;
