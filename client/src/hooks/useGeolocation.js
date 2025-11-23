// // useGeolocation.js
// import { useState, useEffect } from 'react';

// const useGeolocation = () => {
//   const [loginLatitude, setLoginLatitude] = useState("");
//   const [loginLongitude, setLoginLongitude] = useState("");
//   const [user, setUser] = useState(false);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       setLoginLatitude(position.coords.latitude);
//       setLoginLongitude(position.coords.longitude);
//     });

//     if (localStorage.getItem("session-token")) {
//       setUser(true);
//     } else {
//       setUser(false);
//     }
//   }, []);

//   return { loginLatitude, loginLongitude, user };
// };

// export default useGeolocation;
import { useState, useEffect } from 'react';

const useGeolocation = () => {
  const [loginLatitude, setLoginLatitude] = useState(null);
  const [loginLongitude, setLoginLongitude] = useState(null);
  const [user, setUser] = useState(false);
  const [geoError, setGeoError] = useState(null);

  useEffect(() => {
    const handleGeolocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLoginLatitude(position.coords.latitude);
          setLoginLongitude(position.coords.longitude);
          setGeoError(null); // Clear any previous errors
        },
        (error) => {
          setGeoError(error.message);
        }
      );
    };

    const checkGeolocationPermission = async () => {
      try {
        const result = await navigator.permissions.query({ name: 'geolocation' });
        if (result.state === 'granted' || result.state === 'prompt') {
          handleGeolocation();
        } else if (result.state === 'denied') {
          setGeoError('Geolocation access denied.');
        }
      } catch (error) {
        console.error('Error checking geolocation permissions:', error);
        setGeoError('Error checking geolocation permissions.');
      }
    };

    checkGeolocationPermission();

    if (localStorage.getItem("session-token")) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, []);

  const requestGeolocationPermission = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLoginLatitude(position.coords.latitude);
          setLoginLongitude(position.coords.longitude);
          setGeoError(null);
          resolve();
        },
        (error) => {
          setGeoError(error.message);
          reject(error);
        }
      );
    });
  };
  

  return { loginLatitude, loginLongitude, user, geoError, requestGeolocationPermission };
};

export default useGeolocation;
