import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArtist } from "../spotify";

const ArtistDetail = () => {
  const [artist, setArtist] = useState();
  const { id } = useParams();

  useEffect(() => {
    getArtist(id)
      .then((response) => {
        setArtist(response.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return <div>{artist && <h1>{artist.name}</h1>}</div>;
};

export default ArtistDetail;
