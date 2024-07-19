import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { addTrackToPlaylist } from "../spotify";

const AddSongsDialog = (props) => {
  const { onClose, selectedValue, open, playlists, tracks } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const getTrackUris = () => {
    return tracks.map((track) => track.uri);
  };

  // Trigger a function that adds all songs to the selected playlist
  const handleAddsongsToPlaylist = (playlist) => {
    const uris = getTrackUris();
    addTrackToPlaylist(playlist.id, uris);
    onClose(playlist);
  };

  // 1. Trigger a function that creates a new playlist
  // 2. then add all songs to the new playlist
  const handleCreateNewPlaylist = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Select Playlist</DialogTitle>
      <List sx={{ pt: 0 }}>
        {playlists.map((playlist) => (
          <ListItem disableGutters key={playlist.id}>
            <ListItemButton onClick={() => handleAddsongsToPlaylist(playlist)}>
              <ListItemText primary={playlist.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disableGutters>
          <ListItemButton autoFocus onClick={() => handleCreateNewPlaylist()}>
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="New Playlist" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
};

export default AddSongsDialog;
