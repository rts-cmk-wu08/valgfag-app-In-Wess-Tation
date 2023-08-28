/* eslint import/no-webpack-loader-syntax: off */

import { useState } from "react";
import { Map, NavigationControl, Marker, GeolocateControl } from "react-map-gl";
import mapboxgl from "mapbox-gl";

mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const Game = () => {
  const [userLocation, setUserLocation] = useState(null);
  const markers = [
    { latitude: 55.62572166993465, longitude: 12.086321486975416 },
    { latitude: 55.625783079691665, longitude: 12.086372512659276 },
    // Add more markers as needed
  ];

  const proximityThreshold = 0.01; // Adjust as needed (degrees)

  const onUserLocationChange = event => {
    setUserLocation([event.coords.longitude, event.coords.latitude]);
  };

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
          ? mapboxgl.MercatorCoordinate.distanceTo(
              new mapboxgl.MercatorCoordinate(userLocation[0], userLocation[1]),
              new mapboxgl.MercatorCoordinate(marker.longitude, marker.latitude)
            )
          : null;

        return (
          <Marker
            key={index}
            latitude={marker.latitude}
            longitude={marker.longitude}
            style={{
              color: distance && distance < proximityThreshold ? "red" : "hotpink",
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