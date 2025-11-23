import React from 'react'

const currentDuty = () => {
    const data = [
        {
            location : 'Dehiwala Junction',
            badgeNumber : "44185",
            startTime : "08.00",
            endTime : "18.00"
        },
        {
            location : 'Dehiwala Junction',
            badgeNumber : "44185",
            startTime : "08.00",
            endTime : "18.00"
        },
        {
            location : 'Wellawatte Junction',
            badgeNumber : "55083",
            startTime : "08.00",
            endTime : "18.00"
        },
        {
            location : 'Dehiwala Junction',
            badgeNumber : "44185",
            startTime : "08.00",
            endTime : "18.00"
        },
        {
            location : 'Dehiwala Junction',
            badgeNumber : "44185",
            startTime : "08.00",
            endTime : "18.00"
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
                                {data.location}
                            </div>
                            <div>
                                {data.badgeNumber}
                            </div>
                            <div>
                                {data.startTime}
                            </div>
                            <div>
                                {data.endTime}
                            </div>
                        </div>
                        )

                })
            }
        </div>
    </section>
  )
}

export default currentDuty