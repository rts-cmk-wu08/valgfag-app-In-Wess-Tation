/* eslint import/no-webpack-loader-syntax: off */
import { useState, useEffect } from "react";
import { Map, NavigationControl, Marker, GeolocateControl } from "react-map-gl";
import mapboxgl from "mapbox-gl";

mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

const Game = () => {
  const [userLocation, setUserLocation] = useState(null);
  const markers = [
    { latitude: 55.62572166993465, longitude: 12.086321486975416 },
    { latitude: 55.625783079691665, longitude: 12.086372512659276 },
    // Add more markers as needed
  ];

  const proximityThreshold = 0.01; // Adjust as needed (kilometers)

  const onUserLocationChange = event => {
    setUserLocation([event.coords.longitude, event.coords.latitude]);
  };

  useEffect(() => {
    // Perform any updates based on user location change
  }, [userLocation]);

  return (
    <Map
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      style={{ width: "85vw", height: "50vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      initialViewState={{
        latitude: 55.62572166993462,
        longitude: 12.086321486975416,
        zoom: 16
      }}
    >
      <NavigationControl />

      {userLocation && (
        <Marker latitude={userLocation[1]} longitude={userLocation[0]}>
          <div style={{ color: "blue" }}>You are here</div>
        </Marker>
      )}

      {markers.map((marker, index) => {
        const distance = userLocation
          ? calculateDistance(
              userLocation[1],
              userLocation[0],
              marker.latitude,
              marker.longitude
            )
          : null;

        return (
          <Marker
            key={index}
            latitude={marker.latitude}
            longitude={marker.longitude}
            style={{
              color: distance && distance < proximityThreshold ? "red" : "hotpink"
            }}
          />
        );
      })}

      <GeolocateControl
        trackUserLocation={true}
        positionOptions={{ enableHighAccuracy: true }}
        showAccuracyCircle={true}
        auto
        onGeolocate={onUserLocationChange}
      />
    </Map>
  );
};

export default Game;