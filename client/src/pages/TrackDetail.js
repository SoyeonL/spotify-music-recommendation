import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useParams, useNavigate } from "react-router-dom";
import { getTrackById } from "../spotify";

const TrackDetail = () => {
  const [trackData, setTrackData] = useState();

  const navigate = useNavigate();
  const { id } = useParams();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    getTrackById(id)
      .then((response) => {
        setTrackData(response.data);
        // console.log(response.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "50px",
            // bgcolor: "#cfe8fc",
            height: "50vh",
          }}
        >
          {trackData && (
            <>
              <Box>
                <img src={trackData.album.images[1].url} alt="" />
              </Box>
              <Typography
                component="div"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  // alignSelf: "flex-end",
                  // mb: "60px",
                }}
              >
                <Box>
                  <Box sx={{ fontSize: 70, fontWeight: "bold" }}>
                    {trackData.name}
                  </Box>
                  <Box>
                    <Link to={`/album-detail/${trackData.album.id}`}>
                      {trackData.album.name}
                    </Link>{" "}
                    &bull; {trackData.album.release_date} &bull;{" "}
                    <Link to={`/artist-detail/${trackData.artists[0].id}`}>
                      {trackData.artists[0].name}
                    </Link>
                  </Box>
                </Box>
              </Typography>
            </>
          )}
        </Box>
        <button onClick={goBack}>Back to search result</button>
      </Container>
    </div>
  );
};

export default TrackDetail;
