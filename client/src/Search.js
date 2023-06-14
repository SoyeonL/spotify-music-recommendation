import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { logout } from "./spotify";
import SearchBar from "./components/SearchBar";
import SearchResult from "./components/SearchResult";
import { Container } from "@mui/material";

const Search = () => {
  const [tracks, setTracks] = useState([]);
  return (
    <div>
      <Box>
        <Button
          sx={{ top: 10, left: 15 }}
          onClick={logout}
          variant="contained"
          color="success"
        >
          Logout
        </Button>
      </Box>
      <Container maxWidth="md">
        <SearchBar setTracks={setTracks} />
        <SearchResult tracks={tracks} />
      </Container>
    </div>
  );
};

export default Search;
