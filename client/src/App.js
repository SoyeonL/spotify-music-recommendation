import { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accessToken = urlParams.get("access_token");
    const refreshToken = urlParams.get("refresh_token");

    if (refreshToken) {
      fetch(`/refresh_token?refresh_token=${refreshToken}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <div className="App">
      <a href="http://localhost:8888/login">Login to Spotify</a>
    </div>
  );
}

export default App;
