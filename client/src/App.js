import { useState, useEffect } from "react";
import { accessToken, getCurrentUserPlaylists } from "./spotify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./Search";
import Login from "./pages/Login";
import TrackDetail from "./pages/TrackDetail";
import AlbumDetail from "./pages/AlbumDetail";
import ArtistDetail from "./pages/ArtistDetail";
import Playlists from "./pages/Playlists";
import Playlist from "./pages/Playlist";

function App() {
  const [token, setToken] = useState();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    setToken(accessToken);

    token &&
      getCurrentUserPlaylists()
        .then((response) => {
          setPlaylists(response.data.items);
        })
        .catch((err) => console.error(err));
  }, [token]);

  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
          <Login />
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path="/track-detail/:id" element={<TrackDetail />} />
              <Route path="/album-detail/:id" element={<AlbumDetail />} />
              <Route path="/artist-detail/:id" element={<ArtistDetail />} />
              <Route
                path="/playlist/:id"
                element={<Playlist playlists={playlists} />}
              />
              <Route
                path="/playlists"
                element={<Playlists playlists={playlists} />}
              />
              <Route
                path="/"
                element={<Search token={token} playlists={playlists} />}
              />
            </Routes>
          </BrowserRouter>
        )}
      </header>
    </div>
  );
}

export default App;
