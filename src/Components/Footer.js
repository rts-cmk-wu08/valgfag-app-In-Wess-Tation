import { useState, useEffect } from "react";

 

const Footer = () => {

  const [myPos, setMyPos] = useState();
  const [dynPos, setDynPos] = useState();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMyPos(position);
        console.log(position);
      });
    }
  }, []);

  const handleDynamicPosition = (position) => {
    setDynPos(position);
  };

  const handleDynamicPositionError = (err) => {
    console.log(err);
  }; 

  navigator.geolocation.watchPosition(
    handleDynamicPosition,
    handleDynamicPositionError,
    { timeout: 5000 }
  );

  return (
    <>
      <h2>This is your Static position</h2>

      <p>Latitude: {myPos?.coords.latitude} </p>
      <p>Longitude: {myPos?.coords.longitude} </p>
      <p>Altitude: {myPos?.coords.altitude} </p>
      <p>Speed: {myPos?.coords.speed} </p>
      <p>Accuracy: {myPos?.coords.accuracy} </p>


      <h2>This is your dynamic position</h2>

        <p>Latitude: {dynPos?.coords.latitude} </p>
        <p>Longitude: {dynPos?.coords.longitude} </p>
        <p>Altitude: {dynPos?.coords.altitude} </p>
        <p>Speed: {dynPos?.coords.speed} </p>
        <p>Accuracy: {dynPos?.coords.accuracy} </p>

    </>
  );
};

export default Footer;