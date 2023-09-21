import React, { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import AlbumImgItem from "./AlbumImgItem";
import { getCurrentUserPlaylists } from "../spotify";

const SearchResult = ({ playlists }) => {
  // const [playlists, setPlaylists] = useState([]);

  // useEffect(() => {
  //   getCurrentUserPlaylists()
  //     .then((response) => {
  //       setPlaylists(response.data.items);
  //       // console.log(response.data.items[0]);
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

  let tracks = JSON.parse(window.sessionStorage.getItem("tracks"));

  return (
    <div className="search__display">
      {tracks && (
        <ImageList
          sx={{ height: 1000, pt: 5, mb: 5 }}
          rowHeight={165}
          cols={4}
          gap={15}
        >
          {tracks.map((track) => (
            <ImageListItem
              key={track.id}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <AlbumImgItem track={track} playlists={playlists} />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </div>
  );
};

export default SearchResult;
