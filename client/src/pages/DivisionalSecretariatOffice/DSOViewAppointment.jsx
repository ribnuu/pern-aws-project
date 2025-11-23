import React, { useState } from 'react'

const DSOViewAppointment = () => {

    const [cancel, setCancel] = useState(false);

    const data = [
        {
            visitorName: 'Charles',
            visitorDate: '28-03-2023',
            visitorTime: '04.00pm',

        },
        {
            visitorName: 'Max',
            visitorDate: '28-03-2023',
            visitorTime: '06.00pm',
        },
        {
            visitorName: 'Vettel',
            visitorDate: '29-03-2023',
            visitorTime: '06.00pm',
        },
        {
            visitorName: 'Bottas',
            visitorDate: '29-03-2023',
            visitorTime: '04.00pm',
        },
        {
            visitorName: 'Hamilton',
            visitorDate: '30-03-2023',
            visitorTime: '06.00pm',
        },
    ]
    return (
        <section className='mx-12 my-12'>
            <h1 className='uppercase text-2xl text-center'>
                DSO Appointments
            </h1>
            <div className="grid grid-cols-1  gap-4 my-4">

                {data.map((data) => (
                    <>
                        <div className='bg-gray-200 p-4 text-black text-sm w-102 rounded-lg flex space-between gap-6'>
                            <div className='my-4'>
                                <h1>DSO Appointments</h1>
                                <div className='flex gap-2' >
                                    <div>
                                        Visitor name :
                                    </div>
                                    <div>
                                        {data.visitorName}
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div>
                                        Visitor Date :
                                    </div>
                                    <div>
                                        {data.visitorDate}
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div>
                                        Visitor Time :
                                    </div>
                                    <div>
                                        {data.visitorTime}
                                    </div>
                                </div>
                                <div className='flex'>
                                    <div>
                                        <button className='px-4 py-3 rounded-lg bg-success mx-2 mt-4'>Completed</button>
                                    </div>
                                    <div>
                                        <button className='px-4 py-3 rounded-lg bg-red-500 mx-2 mt-4' onClick={() => setCancel(!cancel)}>Cancel</button>
                                    </div>
                                </div>
                                {
                                    cancel &&
                                    <div className='flex gap-2'>
                                        <div className='my-auto'>
                                            <label>Choose a reason</label>
                                            <select className='bg-white'>
                                                <option value=''>Schedule another date or time</option>
                                                <option value=''>Person did not show up</option>
                                            </select>
                                        </div>
                                        <div className=''>
                                            <button className='px-4 py-3 rounded-lg bg-red-500 mx-2 mt-4'>Cancel</button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </section>
    )
}

export default DSOViewAppointment