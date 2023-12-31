import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { logout, getCurrentUserProfile } from "./spotify";
import SearchBar from "./components/SearchBar";
import SearchResult from "./components/SearchResult";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

const Search = ({ playlists }) => {
  const [tracks, setTracks] = useState([]);
  const [profileImg, setProfileImg] = useState("");
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => {
    setOpen(open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/playlists">
            <ListItemText primary="View Playlists" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={logout}>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  useEffect(() => {
    getCurrentUserProfile()
      .then((response) => {
        setProfileImg(response.data.images[0].url);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Box>
        <Button onClick={() => toggleDrawer(true)}>
          <img
            alt="profile"
            width={50}
            height={50}
            src={profileImg}
            style={{ borderRadius: "50%" }}
          />
        </Button>
        <Drawer open={open} onClose={() => toggleDrawer(false)}>
          {list()}
        </Drawer>
      </Box>
      <Container maxWidth="md">
        <SearchBar setTracks={setTracks} />
        <SearchResult tracks={tracks} playlists={playlists} />
      </Container>
    </div>
  );
};

export default Search;
