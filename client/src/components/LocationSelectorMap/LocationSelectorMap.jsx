// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // Import marker icons
// import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

// // Fix leaflet's default icon issue with webpack
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
// });

// // Function to extract coordinates from Google Maps URL
// const extractCoordinatesFromUrl = (url) => {
//   // Regex to match coordinates in the 'q' parameter or '@' parameter
//   const regexQ = /[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/;
//   const regexAt = /@(-?\d+\.\d+),(-?\d+\.\d+),\d+z/;

//   let match = url.match(regexQ);
//   if (match) {
//     return {
//       latitude: parseFloat(match[1]),
//       longitude: parseFloat(match[2]),
//     };
//   }

//   match = url.match(regexAt);
//   if (match) {
//     return {
//       latitude: parseFloat(match[1]),
//       longitude: parseFloat(match[2]),
//     };
//   }

//   return { latitude: null, longitude: null };
// };

// const LocationSelectorMap = ({
//   onSelectLocation,
//   defaultCoordinates,
//   locationUrl,
// }) => {
//   const [position, setPosition] = useState(defaultCoordinates);

//   const MapClickHandler = () => {
//     useMapEvents({
//       click: (e) => {
//         const { lat, lng } = e.latlng;
//         setPosition([lat, lng]);
//         onSelectLocation({ lat, lng });
//       },
//     });
//     return null;
//   };

//   useEffect(() => {
//     setPosition(defaultCoordinates);
//   }, [defaultCoordinates]);

//   return (
//     <MapContainer
//       center={defaultCoordinates}
//       zoom={13}
//       style={{ height: "400px", width: "100%" }}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//       />
//       {position && <Marker position={position}></Marker>}
//       <MapClickHandler />
//     </MapContainer>
//   );
// };

// export default LocationSelectorMap;
import React, { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Import marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix leaflet's default icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Function to extract coordinates from Google Maps URL
const extractCoordinatesFromUrl = (url) => {
  // Regex to match coordinates in the 'q' parameter or '@' parameter
  const regexQ = /[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/;
  const regexAt = /@(-?\d+\.\d+),(-?\d+\.\d+),\d+z/;

  let match = url.match(regexQ);
  if (match) {
    return {
      latitude: parseFloat(match[1]),
      longitude: parseFloat(match[2]),
    };
  }

  match = url.match(regexAt);
  if (match) {
    return {
      latitude: parseFloat(match[1]),
      longitude: parseFloat(match[2]),
    };
  }

  return { latitude: null, longitude: null };
};

const LocationSelectorMap = ({
  onSelectLocation,
  defaultCoordinates,
  locationUrl,
}) => {
  const [position, setPosition] = useState(defaultCoordinates);
  const [hasLocationSet, setHasLocationSet] = useState(false);

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        onSelectLocation({ lat, lng });
      },
    });
    return null;
  };

  const updatePosition = useCallback(() => {
    if (locationUrl) {
      const { latitude, longitude } = extractCoordinatesFromUrl(locationUrl);
      if (latitude && longitude) {
        setPosition([latitude, longitude]);
        onSelectLocation({ lat: latitude, lng: longitude });
        setHasLocationSet(true); // Mark that the location has been set
      }
    }
  }, [locationUrl, onSelectLocation]);

  useEffect(() => {
    if (locationUrl) {
      updatePosition();
    } else if (!hasLocationSet) {
      setPosition(defaultCoordinates);
    }
  }, [locationUrl, defaultCoordinates, hasLocationSet, updatePosition]);

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "400px", width: "100%", zIndex: -10 }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {position && <Marker position={position}></Marker>}
      <MapClickHandler />
    </MapContainer>
  );
};

export default LocationSelectorMap;
