import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import GoogleMapReact from "google-map-react";
const GOOGLE_MAP_API_KEY = import.meta.env.GOOGLE_MAP_API_KEY


// export default function Home() {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: Api_Key ,
//   });

//   if (!isLoaded) return <div>Loading...</div>;
//   return <Map />;
// }

// function Map() {
//   const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

//   return (
//     <div style={{ height: '100vh', width: '100%' }}>
//         <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
//         <Marker position={center} />
//         </GoogleMap>
//     </div>
//   );
// }
const Map = () => {
    console.log(GOOGLE_MAP_API_KEY)
    const defaultProps = {
        center: {
            lat: 6.873054,
            lng: 79.81502627
          },
          zoom: 11.5
    }
  return (
    <section>
        <div style={{ height: '80vh', width: '100%' }}>
        <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_MAP_API_KEY}}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={{draggable : false}}
        >
        </GoogleMapReact>
        {
            GOOGLE_MAP_API_KEY
        }
        </div>
    </section>
  )
}

export default Map;
// }
// export const Marker = () => {
//     <div></div>
// }

