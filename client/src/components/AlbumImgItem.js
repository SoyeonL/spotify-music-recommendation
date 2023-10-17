import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NestedMenuItem } from "mui-nested-menu";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const AlbumImgItem = ({ track, playlists }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const menuOpen = Boolean(anchorEl);

  const handleMainMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMainMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSubMenuClick = () => {
    setOpen(true);
  };

  const handleSubMenuClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const addToPlaylistHandler = (id) => {
    handleMainMenuClose();
    setOpen(true);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleSubMenuClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <>
      <Button onClick={handleMainMenuClick}>
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
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMainMenuClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <NestedMenuItem parentMenuOpen={menuOpen} label="Add to Playlist">
          {playlists.map((playlist) => (
            <MenuItem
              key={playlist.id}
              onClick={() => addToPlaylistHandler(playlist.id)}
            >
              {playlist.name}
            </MenuItem>
          ))}
        </NestedMenuItem>
        <MenuItem
          key={track.id}
          component={Link}
          to={`/track-detail/${track.id}`}
        >
          Go to detail page
        </MenuItem>
      </Menu>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleSubMenuClose}
        message="Added to your playlist!"
        action={action}
      ></Snackbar>
    </>
  );
};

export default AlbumImgItem;
