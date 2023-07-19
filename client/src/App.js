import { useState, useEffect } from "react";
import { accessToken } from "./spotify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./Search";
import TrackDetail from "./pages/TrackDetail";
import AlbumDetail from "./pages/AlbumDetail";
import ArtistDetail from "./pages/ArtistDetail";

function App() {
  const [token, setToken] = useState();

  useEffect(() => {
    setToken(accessToken);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
          <a className="App-header" href="http://localhost:8888/login">
            Login to Spotify
          </a>
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path="/track-detail/:id" element={<TrackDetail />} />
              <Route path="/album-detail/:id" element={<AlbumDetail />} />
              <Route path="/artist-detail/:id" element={<ArtistDetail />} />
              <Route path="/" element={<Search token={token} />} />
            </Routes>
          </BrowserRouter>
        )}
      </header>
    </div>
  );
}

export default App;
