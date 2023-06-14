import React, { useState, useContext } from "react";
import {
  searchItems,
  getRecommendationsByArtist,
  getRecommendationsByTrack,
} from "../spotify";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

const SearchBar = ({ setTracks }) => {
  const [searchKey, setSearchKey] = useState("");
  const [type, setType] = useState("artist");

  const searchTracks = (event) => {
    event.preventDefault();

    searchItems(searchKey, type)
      .then((response) => {
        if (type === "artist") {
          getRecommendationsByArtist(response.data.artists.items[0].id)
            .then((response) => {
              setTracks(response.data.tracks);
              console.log(response.data);
            })
            .catch((err) => console.error(err));
        } else if (type === "track") {
          getRecommendationsByTrack(response.data.tracks.items[0].id)
            .then((response) => {
              setTracks(response.data.tracks);
              console.log(response.data);
            })
            .catch((err) => console.error(err));
        }
      })
      .catch((err) => console.error(err));

    setSearchKey("");
  };

  const typeChangeHandler = (event) => {
    setType(event.target.value);
    console.log(type);
  };

  return (
    <FormControl fullWidth>
      <Box sx={{ display: "flex", alignItems: "center", mt: 9 }}>
        <TextField
          fullWidth
          size="medium"
          id="standard-basic"
          label="Search Artist or Track"
          variant="standard"
          onChange={(event) => setSearchKey(event.target.value)}
          value={searchKey}
        />
        <IconButton component={Link} to="/search-result" onClick={searchTracks}>
          <SearchIcon />
        </IconButton>
      </Box>
      <RadioGroup
        sx={{ mt: 2 }}
        row
        value={type}
        onChange={(event) => typeChangeHandler(event)}
      >
        <FormControlLabel value="artist" control={<Radio />} label="Artist" />
        <FormControlLabel value="track" control={<Radio />} label="Track" />
      </RadioGroup>
    </FormControl>
  );
};

export default SearchBar;
