# Spotify Music Recommendation App

The Spotify Music Recommendation App is a web application that allows users to discover new music based on a given track or artist. It leverages React, JavaScript, HTML, and Material-UI (MUI) for the user interface and the Spotify Web API for music data retrieval. With this app, users can explore, listen, and add songs to their Spotify playlists.

## Features

- **Spotify Login**: Users can log in to their Spotify accounts to access the full features of the app, including adding songs to their playlists.

- **Search by Track or Artist**: Users can input a track name or artist, and the app will generate a list of recommended songs with album cover images.

- **Song Previews**: Hovering over an album cover image triggers a preview of the song, allowing users to sample the music.

- **Add to Playlist**: Users can add songs to their Spotify playlists directly from the app.

- **Track Details**: Clicking on an album cover image provides detailed information about the track, including artist name, album name, and release date.

## How to run locally

Follow these instructions to get the Spotify Music Recommendation App up and running on your local machine.

### Prerequisites

- Node.js: Make sure you have Node.js installed. You can download it [here](https://nodejs.org/).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/spotify-music-recommendation-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd spotify-music-app
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

### Configuration

To enable Spotify login and access the Spotify Web API, you'll need to set up a Spotify Developer App and configure the following environment variables:

- REACT_APP_SPOTIFY_CLIENT_ID: Your Spotify Developer App client ID.
- REACT_APP_SPOTIFY_REDIRECT_URI: The URI to which Spotify should redirect after login (e.g., http://localhost:3000/callback in development).
  Ensure you also add these environment variables to your deployment environment.
