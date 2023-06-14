import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTrackById } from "../spotify";

const TrackDetail = () => {
  const [trackData, setTrackData] = useState();

  const navigate = useNavigate();
  const { id } = useParams();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    getTrackById(id)
      .then((response) => {
        setTrackData(response.data);
        console.log(response.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div>
      {trackData && (
        <>
          <h1>{trackData.name}</h1>
          <h2>{trackData.album.name}</h2>
          <h2>{trackData.album.release_date}</h2>
          <h2>{trackData.artists[0].name}</h2>
          <img src={trackData.album.images[1].url} alt="" />
        </>
      )}
      <button onClick={goBack}>Back to search result</button>
    </div>
  );
};

export default TrackDetail;
