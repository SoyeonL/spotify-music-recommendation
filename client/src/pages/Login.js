import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const Login = () => {
  const LOGIN_URI =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:8888/login"
      : "https://spotify-music-recommendation.onrender.com/login";

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Button variant="contained" size="large" href={LOGIN_URI}>
          Login to Spotify
        </Button>
      </Box>
    </div>
  );
};

export default Login;
