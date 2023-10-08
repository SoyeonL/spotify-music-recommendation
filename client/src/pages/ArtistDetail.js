import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { getArtist } from "../spotify";

const ArtistDetail = () => {
  const [artist, setArtist] = useState();
  const { id } = useParams();

  useEffect(() => {
    getArtist(id)
      .then((response) => {
        setArtist(response.data);
        console.log(response.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: ["column", "row"],
            justifyContent: ["", "center"],
            alignItems: "center",
            gap: ["10px", "50px"],
            height: "50vh",
          }}
        >
          {artist && (
            <>
              <Box sx={{ mt: ["15px", 0] }}>
                <img
                  style={{ borderRadius: "50%" }}
                  src={artist.images[1].url}
                />
              </Box>
              <Box sx={{ fontSize: [30, 70], fontWeight: "bold" }}>
                {artist.name}
              </Box>
            </>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default ArtistDetail;
