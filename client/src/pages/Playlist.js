import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useParams } from "react-router-dom";
import { getPlaylistById } from "../spotify";

const Playlist = () => {
  const [playlistTracks, setPlaylistTracks] = useState();
  const [selectedIndex, setSelectedIndex] = useState();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const { id } = useParams();

  useEffect(() => {
    getPlaylistById(id)
      .then((response) => {
        setPlaylistTracks(response.data.tracks.items);
        console.log(response.data.tracks.items);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container maxWidth="md">
      <Box>
        <List>
          {playlistTracks &&
            playlistTracks.map((track, i) => (
              <ListItemButton
                key={i}
                sx={{
                  display: "grid",
                  alignItems: "center",
                  gridTemplateColumns: "20px 1fr 1fr",
                  gridGap: "12px",
                  padding: "6px",
                }}
                selected={selectedIndex === i}
                onClick={(event) => handleListItemClick(event, i)}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  {i + 1}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ marginRight: "8px" }}>
                    <img src={track.track.album.images[2].url} />
                  </Box>
                  <Box>
                    <Box>{track.track.name}</Box>
                    {track.track.artists.map((artist, i) => (
                      <span key={i}>
                        {artist.name}
                        {i !== track.track.artists.length - 1 && ", "}
                      </span>
                    ))}
                  </Box>
                </Box>
                <Box>{track.track.album.name}</Box>
              </ListItemButton>
            ))}
        </List>
      </Box>
    </Container>
  );
};

export default Playlist;
