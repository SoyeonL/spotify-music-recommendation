import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import { useParams } from "react-router-dom";
import { getAlbum, getAlbumTracks } from "../spotify";

const AlbumDetail = () => {
  const [album, setAlbum] = useState();
  const [albumTracks, setAlbumTracks] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

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
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "60px",
            height: "50vh",
          }}
        >
          {album && (
            <>
              <Box>
                <img src={album.images[1].url} alt="" />
              </Box>
              <Box>
                <Box>{album.album_type.toUpperCase()}</Box>
                <Box sx={{ fontSize: 70, fontWeight: "bold" }}>
                  {album.name}
                </Box>
              </Box>
            </>
          )}
        </Box>
        <List sx={{ pl: "12%" }}>
          {albumTracks &&
            albumTracks.map((track, i) => (
              <ListItemButton
                key={i}
                sx={{
                  display: "grid",
                  alignItems: "center",
                  gridTemplateColumns: "20px 1fr",
                  gridGap: "12px",
                  padding: "6px",
                }}
                selected={selectedIndex === i}
                onClick={(event) => handleListItemClick(event, i)}
              >
                <span>{track.track_number}</span>
                <span>{track.name}</span>
              </ListItemButton>
            ))}
        </List>
      </Container>
    </div>
  );
};

export default AlbumDetail;
