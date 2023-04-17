import { useState, useEffect } from "react";
import { accessToken, logout } from "./spotify";

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
          <>
            <h1>Logged in!</h1>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
