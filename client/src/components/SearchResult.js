import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import AlbumImgItem from "./AlbumImgItem";
import AddSongsDialog from "./AddSongsDialog";
// import { getCurrentUserPlaylists } from "../spotify";

const SearchResult = ({ playlists }) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState();

  let tracks = JSON.parse(window.sessionStorage.getItem("tracks"));

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="search__display">
      {tracks && (
        <>
          <Button variant="contained" size="small" onClick={handleClickOpen}>
            Add all songs to playlist
          </Button>
          <AddSongsDialog
            selectedValue={selectedValue}
            onClose={handleClose}
            open={open}
            playlists={playlists}
          />
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
        </>
      )}
    </div>
  );
};

export default SearchResult;
