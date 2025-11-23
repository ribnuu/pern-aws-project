import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiAddToQueue } from 'react-icons/bi'

const ECSSetAppointment = () => {

    const [formData, setFormData] = useState({
        appointmentDateTime: ''
    });

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }
    const [refresh, setRefresh] = useState(false)


    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            const insertResponse = axios.post('http://localhost:4000', {
                formData
            })
            setRefresh(!refresh)
        } catch (error) {
            console.log(error)
        }
    }

    const [renderedData, setRenderedData] = useState([])

    const fetchData = async () => {
        const response = await axios.get('http://localhost:4000');
        setRenderedData(response.data)
    }

    useEffect(() => {
        fetchData();
    }, [refresh])


    const data = renderedData;

    return (
        <section className='mx-12 my-12'>
            <div className='bg-white rounded-lg p-4 my-4'>
                <h1 className='uppercase text-xl text-black mx-2 my-4'> ECS - Set appointment Date and time</h1>
                <form onSubmit={handleSubmit}>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="datetime-local" name="appointmentDateTime" id="appointmentDateTime" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handleChange} value={formData.appointmentDateTime} />
                        <label htmlFor="appointmentDateTime" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" onChange={() => { }} value=''>Date Time</label>
                    </div>
                    <div className="relative z-0 lg:w-full mb-6 groupflex justify-between gap-12">
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mx-auto w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2"><BiAddToQueue className='my-auto' />Reserve Slot</button>
                    </div>
                </form>
            </div>
            <div className='bg-white rounded-lg p-4 my-4'>
                <h1 className='uppercase text-xl text-black mx-2 my-4'>Available slots for public</h1>
                <div className="grid grid-cols-1  gap-4 my-4">
                    {
                        data.map((data) => {

                            const eventDate = new Date(data.appointment_date_and_time)

                            const newDate = new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(eventDate)
                            console.log(newDate)
                            const setTimeZone = eventDate.toLocaleString('en-GB', { timeZone: 'Asia/Kolkata' })
                            const formattedDateTime = setTimeZone.slice(0, 19).replace(',', ' ')
                            const formattedDate = formattedDateTime.slice(0, 10)
                            const formattedTime = formattedDateTime.slice(10)

                            return (
                                <div className='bg-gray-200 p-4 text-black text-sm w-102 rounded-lg space-between gap-6' key={data.police_appointment_id}>
                                    <div className=''>
                                        <div className='flex gap-2' >
                                            <div className='flex gap-4'>
                                                <div>

                                                    {
                                                        newDate
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex gap-2'>
                                        <div>

                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>

        </section>
    )
}

export default ECSSetAppointment
