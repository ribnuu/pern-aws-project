import React from 'react'

const courtCases = () => {
    const data = [
        {
            date : '28-03-2023',
            time : '04.00pm',
            
        },
        {
            date : '28-03-2023',
            time : '06.00pm',
        },
        {
            date : '29-03-2023',
            time : '06.00pm',
        },
        {
            date : '29-03-2023',
            time : '04.00pm',
        },
        {
            date : '30-03-2023',
            time : '06.00pm',
        },
    ]
  return (
    <section className='mx-12 my-12'>
        <div className='bg-white rounded-lg p-4 my-4'>
            <h1 className='uppercase text-xl text-black mx-2 my-4'>Court Case Slots</h1>
            <div className="grid grid-cols-1  gap-4 my-4">

            {
            data.map((data) => (
            <div className='bg-gray-200 p-1 text-black text-sm w-102 px-8 py-4 rounded-lg space-between gap-6'>
                <div className=''>
                <div className='flex gap-2' >
                    <div className=''>
                        {data.date}
                    </div>
                    <div>
                    {data.time}
                </div>
                </div>
                </div>
            </div>
            ))
            }
            </div>
            
        </div>
 </section>
  )
}

export default courtCases