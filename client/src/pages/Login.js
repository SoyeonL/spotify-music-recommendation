import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const Login = () => {
  const LOGIN_URI =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:8888/login"
      : "https://spotify-music-recommendation.onrender.com/login";

  return (
    <div>
      <Box
        sx={{
          backgroundImage: `url(
            "https://images.unsplash.com/photo-1504509546545-e000b4a62425?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          )`,
          position: "relative",
          backgroundSize: "cover",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          color: "white",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
          }}
        />
        <Box
          sx={{
            zIndex: 1,
          }}
        >
          <Typography variant="h1" sx={{ fontWeight: "bold", fontSize: "4em" }}>
            Discover Your Next Favorite Track
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.5em", m: "10px 0 20px" }}
          >
            Join millions of music lovers and explore new tunes.
          </Typography>
          <Button
            sx={{
              backgroundColor: "#1db954",
              color: "white",
              padding: "15px 30px",
              borderRadius: "30px",
              "&:hover": {
                backgroundColor: "#1aa34a",
              },
            }}
            href={LOGIN_URI}
          >
            Login with Spotify
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
