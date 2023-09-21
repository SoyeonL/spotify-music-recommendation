import React, { useEffect, useState } from "react";
import { getCurrentUserPlaylists } from "../spotify";
import { Link } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const Playlists = ({ playlists }) => {
  // useEffect(() => {
  //   getCurrentUserPlaylists()
  //     .then((response) => {
  //       setPlaylists(response.data.items);
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

  return (
    <div>
      <h1>Playlists</h1>
      <ImageList
        sx={{ height: 1000, pt: 5, mb: 5 }}
        rowHeight={165}
        cols={4}
        gap={15}
      >
        {playlists.map((playlist) => (
          <ImageListItem
            key={playlist.id}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Link to={`/playlist/${playlist.id}`}>
              <img
                width="250"
                alt="playlist cover"
                src={playlist.images[0].url}
              />
            </Link>
            <div>{playlist.name}</div>
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default Playlists;
