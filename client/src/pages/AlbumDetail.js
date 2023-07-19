import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAlbum, getAlbumTracks } from "../spotify";

const AlbumDetail = () => {
  const [album, setAlbum] = useState();
  const [albumTracks, setAlbumTracks] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getAlbum(id)
      .then((response) => {
        setAlbum(response.data);
      })
      .catch((err) => console.error(err));

    getAlbumTracks(id)
      .then((response) => {
        setAlbumTracks(response.data.items);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div>
      {album && <h1>{album.name}</h1>}
      <ul>
        {albumTracks &&
          albumTracks.map((track) => (
            <li key={track.id}>
              {track.track_number} {track.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AlbumDetail;
