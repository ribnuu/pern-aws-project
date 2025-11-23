import React from 'react'

const DSDLoadLocation = () => {
    const data = [
        {
            locationName : 'United States Embassy in Sri Lanka',
            longitude : "7°57'14.99 N",
            latitude : "80°45'20.99 E",
        },
        {
            locationName : 'High Commission of Canada',
            longitude : `7°05'07.1"N`,
            latitude : `80°00'32.3"E`,
        },
        {
            locationName : 'Embassy of France',
            longitude : `8° 21' 2.14″ N`,
            latitude : `80° 31' 1″ E`,
        },
        {
            locationName : 'British High Commission Colombo',
            longitude : `8°21'14.3"N`,
            latitude : `80°30'51.0"E`,
        },
        {
            locationName : 'Embassy of Germany',
            longitude : `8°21'03.2"N`,
            latitude : `80°30'49.2"E
            `,
        },
        

    ]
  return (
    <section className='mx-12 my-12'>
      <div className='grid grid-cols-1 gap-2'>
            {
                data.map((data) => {
                    return (
                        <div className='bg-white text-black p-2 rounded-xl flex flex-col'>
                            <div>
                                {data.locationName}
                            </div>
                            <div>
                                {data.latitude}
                            </div>
                            <div>
                                {data.longitude}
                            </div>
                        </div>
                        )

                })
            }
        </div>
    </section>
  )
}

export default DSDLoadLocation