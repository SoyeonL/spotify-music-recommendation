import React, { useRef, useState, useMemo, createRef } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import { logout } from "./spotify";

const Search = ({ token }) => {
  const [searchKey, setSearchKey] = useState("");
  const [type, setType] = useState("artist");
  const [tracks, setTracks] = useState([]);

  const playerRef = useMemo(() => {
    const refs = {};
    tracks.forEach((track) => {
      refs[track.id] = createRef(null);
    });
    return refs;
  }, [tracks]);

  const searchTracks = (event) => {
    event.preventDefault();

    axios
      .get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: searchKey,
          type: type,
        },
      })
      .then((response) => {
        if (type === "artist") {
          axios
            .get("https://api.spotify.com/v1/recommendations", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: {
                seed_artists: response.data.artists.items[0].id,
              },
            })
            .then((response) => {
              setTracks(response.data.tracks);
              console.log(response.data);
            })
            .catch((err) => console.error(err));
        } else if (type === "track") {
          axios
            .get("https://api.spotify.com/v1/recommendations", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: {
                seed_tracks: response.data.tracks.items[0].id,
              },
            })
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

  const mouseOverHandler = (e) => {
    e.target.nextElementSibling.play();
  };

  const mouseOutHandler = (e) => {
    e.target.nextElementSibling.pause();
  };

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
            <IconButton type="submit" onClick={searchTracks}>
              <SearchIcon />
            </IconButton>
          </Box>
          <RadioGroup
            sx={{ mt: 2 }}
            row
            value={type}
            onChange={(event) => typeChangeHandler(event)}
          >
            <FormControlLabel
              value="artist"
              control={<Radio />}
              label="Artist"
            />
            <FormControlLabel value="track" control={<Radio />} label="Track" />
          </RadioGroup>
        </FormControl>
        <div className="search__display">
          <ImageList
            sx={{ height: 1000, pt: 5, mb: 5 }}
            rowHeight={165}
            cols={4}
            gap={15}
          >
            {tracks.map((track) => (
              <ImageListItem key={track.id}>
                <a className="img__link">
                  <img
                    className="img__cover"
                    width={150}
                    height={150}
                    src={track.album.images[1].url}
                    alt={track.name}
                    onMouseOver={(e) => mouseOverHandler(e)}
                    onMouseOut={(e) => mouseOutHandler(e)}
                  />
                  <audio
                    // ref={playerRef[track.id]}
                    src={track.preview_url}
                  ></audio>
                </a>
              </ImageListItem>
            ))}
          </ImageList>
        </div>
      </Container>
    </div>
  );
};

export default Search;
