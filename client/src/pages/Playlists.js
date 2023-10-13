import React, { useEffect, useState } from "react";
import { getCurrentUserPlaylists } from "../spotify";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const Playlists = ({ playlists }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Box sx={{ textAlign: ["center", "left"] }}>
          <h1>Playlists</h1>
        </Box>
        <ImageList
          sx={{ height: [700, 1000], pt: 5, mb: 5 }}
          rowHeight={165}
          cols={mobile ? 1 : 4}
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
      </Container>
    </div>
  );
};

export default Playlists;
