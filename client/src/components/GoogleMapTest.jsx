import React from 'react'
import { useJsApiLoader , GoogleMap , Marker , Autocomplete } from '@react-google-maps/api'
import { useState } from 'react'
import { useRef } from 'react'


const GoogleMapTest = () => {

  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse , setDirectionResponse] = useState(null)
  const [distance , setDistance] = useState('')
  const [duration , setDuration] = useState('')

   /** @type React.MutableRefObject<HTMLInputElement> */
   const originRef = useRef()
   /** @type React.MutableRefObject<HTMLInputElement> */
   const destiantionRef = useRef()

  const GOOGLE_MAP_API_KEY = import.meta.env.GOOGLE_MAP_API_KEY

  console.log(GOOGLE_MAP_API_KEY)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey : 'AIzaSyCK0MlCW324OuGcUcXRjHAUxPaudqVRlck',
    libraries : ['places'],
  })

  const center = { lat : 6.9 , lng :  79.81502627}
  const marker = { lat : 6.87, lng : 79.88}
  const marker2 = { lat : 6.9, lng : 80.88}

  if(!isLoaded) {
    return <div className='bg-red-500'>Loading...</div>
  }
  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }
    
  return (
        <div className='z-0' style={{height : '100vh' , width: '100vh'}} >
          <GoogleMap 
          center={center}
          zoom={12}
          mapContainerStyle={{width: '80%', height: '80%'}}
          onLoad={(map) => setMap(map)}
          >
            <Marker position={marker}/>
            <Marker position={marker2}/>
            {/* Display markers and direction */}
          </GoogleMap>
          <p onClick={() => map.panTo(center)}>Click to go back</p>
          <form onSubmit={() => {}}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="police_station_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start</label>
                                <Autocomplete>
                                  <input type='text' placeholder='origin' />
                                </Autocomplete>
                                <Autocomplete>
                                  <input type="text" name="police_station_name" id="police_station_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Start" required=""  />
                                </Autocomplete>

                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="police_station_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End</label>
                                <Autocomplete>
                                  <input type="text" name="police_station_name" id="police_station_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="End" required=""  />
                                </Autocomplete>
                            </div>
                        </div>
                        <div className='mx-auto justify-center'>
                            <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 mx-auto" onClick={calculateRoute}>
                                Set
                            </button>
                              Distance: {distance}
                              Duration: {duration}
                        </div>
        </form>
      </div>

  )
}


export default GoogleMapTest
