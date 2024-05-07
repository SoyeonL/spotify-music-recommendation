import React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import AlbumImgItem from "./AlbumImgItem";
import { getCurrentUserPlaylists } from "../spotify";

const SearchResult = ({ playlists }) => {
  let tracks = JSON.parse(window.sessionStorage.getItem("tracks"));

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="search__display">
      <Button variant="contained" size="small">
        Create a playlist
      </Button>
      {tracks && (
        <ImageList
          sx={{ height: 1000, pt: 5, mb: 5 }}
          rowHeight={165}
          cols={mobile ? 2 : 4}
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
