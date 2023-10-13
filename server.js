require("dotenv").config();

const { default: axios } = require("axios");
const express = require("express");
const app = express();
const querystring = require("querystring");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

app.use(express.static(path.join(__dirname, "../client/build")));

const stateKey = "spotify_auth_state";

app.get("/login", (req, res) => {
  const scope = "user-read-private user-read-email playlist-modify-public";
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        client_id: CLIENT_ID,
        response_type: "code",
        redirect_uri: REDIRECT_URI,
        scope: scope,
        state: state,
      })
  );
});

app.get("/callback", (req, res) => {
  const code = req.query.code || null;

  axios
    .post(
      "https://accounts.spotify.com/api/token",
      {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI,
      },
      {
        headers: {
          Authorization:
            "Basic " +
            new Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((response) => {
      if (response.status === 200) {
        const { access_token, expires_in, refresh_token } = response.data;

        const queryParams = querystring.stringify({
          access_token,
          refresh_token,
          expires_in,
        });

        res.redirect(`http://localhost:3000?${queryParams}`);
      } else {
        res.redirect(`/?${querystring.stringify({ error: "invalid token" })}`);
      }
    })
    .catch((error) => res.send(error));
});

app.get("/refresh_token", (req, res) => {
  const { refresh_token } = req.query;

  axios
    .post(
      "https://accounts.spotify.com/api/token",
      {
        grant_type: "refresh_token",
        refresh_token: refresh_token,
      },
      {
        headers: {
          Authorization:
            "Basic " +
            new Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.listen(process.env.PORT || 8888, () => {
  console.log(`Listening at http://localhost:${process.env.PORT}`);
});
