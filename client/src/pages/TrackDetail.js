import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { getTrackById } from "../spotify";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import IconButton from "@mui/material/IconButton";

const TrackDetail = () => {
  const [trackData, setTrackData] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  const { id } = useParams();

  const playSongHandler = () => {
    setIsPlaying(true);
  };

  const stopSongHandler = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    getTrackById(id)
      .then((response) => {
        setTrackData(response.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: ["column", "row"],
        justifyContent: ["", "center"],
        alignItems: "center",
        gap: ["10px", "50px"],
        height: "50vh",
      }}
    >
      {trackData && (
        <>
          <Box sx={{ mt: ["15px", 0] }}>
            <img src={trackData.album.images[1].url} alt="" />
          </Box>
          <Box
            sx={{
              gap: "15px",
              textAlign: ["center", ""],
            }}
          >
            <Box sx={{ fontSize: [30, 70], fontWeight: "bold" }}>
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
            <Box sx={{ margin: "auto" }}>
              {trackData.preview_url ? (
                <>
                  <IconButton onClick={playSongHandler}>
                    <PlayCircleIcon sx={{ fontSize: "150px" }} />
                    {isPlaying && (
                      <audio
                        onEnded={stopSongHandler}
                        autoPlay={true}
                        src={trackData.preview_url}
                      ></audio>
                    )}
                  </IconButton>
                  <IconButton onClick={stopSongHandler}>
                    <StopCircleIcon sx={{ fontSize: "150px" }} />
                  </IconButton>
                </>
              ) : (
                <h1>Preview not available</h1>
              )}
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
};

export default TrackDetail;
