import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const Login = () => {
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
        <Button
          variant="contained"
          size="large"
          href="http://localhost:8888/login"
        >
          Login to Spotify
        </Button>
      </Box>
    </div>
  );
};

export default Login;
