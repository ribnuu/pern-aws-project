import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";

const LocationButton = ({
  onLocationUpdate,
  defaultLocationUrl = "",
  required = false,
}) => {
  const [locationUrl, setLocationUrl] = useState(defaultLocationUrl);
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handleLocationUrlChange = (e) => {
    setLocationUrl(e.target.value);
    onLocationUpdate({ url: e.target.value, latitude, longitude });
  };

  useEffect(() => {
    if (defaultLocationUrl) {
      setLocationUrl(defaultLocationUrl);
    }
  }, [defaultLocationUrl]);

  const handleFetchLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newLocationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        setLocation(newLocationUrl);
        setLatitude(latitude);
        setLongitude(longitude);

        // Notify parent component
        if (onLocationUpdate) {
          onLocationUpdate({ url: newLocationUrl, latitude, longitude });
          setLocationUrl(newLocationUrl);
        }
      },
      (error) => {
        console.error("Error fetching location:", error);
        // Handle errors (e.g., user denies location access)
      }
    );
  };

  return (
    <div className="">
      <label
        htmlFor="location"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        <FormattedMessage
          id="app.general.address.form_fields.location_url"
          defaultMessage="Location URL"
        />
        {required && (
          <span className="text-red-500 ml-1 font-semibold">*</span> // Red asterisk for required fields
        )}
      </label>
      <input
        type="text"
        name="location"
        className="w-full h-12 p-3 border border-gray-300 rounded-lg"
        placeholder="Enter location URL or click 'Fetch Location'"
        value={locationUrl || location}
        onChange={handleLocationUrlChange}
      />
      <button
        type="button"
        onClick={handleFetchLocation}
        className="mt-2 p-2 bg-blue-500 text-white rounded-lg"
      >
        <FormattedMessage
          id="app.general.address.form_fields.fetch_location"
          defaultMessage="Fetch Location"
        />
      </button>
    </div>
  );
};

export default LocationButton;
