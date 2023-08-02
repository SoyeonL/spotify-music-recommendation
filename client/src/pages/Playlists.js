import React, { useEffect, useState } from "react";
import { getCurrentUserPlaylists } from "../spotify";

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    getCurrentUserPlaylists()
      .then((response) => {
        setPlaylists(response.data.items);
        console.log(response.data.items);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Playlists</h1>
      <ul>
        {playlists &&
          playlists.map((playlist) => (
            <li key={playlist.id}>
              <img src={playlist.images[1].url} />
              <div>{playlist.name}</div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Playlists;
