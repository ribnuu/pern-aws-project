import axios from 'axios'
import React, { useEffect, useState } from 'react'

const meetOfficer = () => {

    const [renderedData , setRenderedData] = useState([])
  
    const fetchData = async () => {
      const response = await axios.get('http://localhost:4000/policeAppointment/getAll');
      console.log(response.data)
      setRenderedData(response.data)
    }
  
    useEffect(() => {
      fetchData();
    } , [])
  
  
    const data = renderedData;
    
  return (
    <section className='mx-12 my-12'>
        <h1 className='text-center text-2xl mx-auto my-auto'>Available Appointments</h1>
        <div className='bg-gray-200 p-4 grid grid-cols-1 text-black text-sm w-102 rounded-lg  space-between gap-6'>
            <div className='flex gap-4'>
                <div className='relative z-0 w-full justify-center group flex'>
                    <div>
                    <label>City </label>
                    <select name="province" id="province" form="province" className="bg-white px-2">
                    <option disabled selected value> -- select a city -- </option>
                    <option value="Top">Colombo</option>
                    <option value="Low">Gampaha</option>
                    </select>
                    </div>
                </div>
                <div className='relative z-0 w-full justify-center group flex'>
                    <div>
                    <label>Division </label>
                    <select name="province" id="province" form="province" className="bg-white px-2">
                    <option disabled selected value> -- select a division -- </option>
                    <option value="Top">Dehiwala</option>
                    <option value="Low">Wellawatte</option>
                    </select>
                    </div>
                </div>
                <div className='relative z-0 w-full justify-center group flex'>
                    <div>
                    <label>Province </label>
                    <select name="province" id="province" form="province" className="bg-white px-2">
                    <option disabled selected value> -- select a province -- </option>
                    <option value="Top">Western</option>
                    <option value="Low">Southern</option>
                    </select>
                    </div>
                </div>
            </div>
        {
            data.map((data) =>
            {
            const eventDate = new Date(data.appointment_date_and_time)
            const formattedDateTime = eventDate.toISOString().slice(0, 19).replace('T', ' ')

            const formattedTime = formattedDateTime.slice(10)

            const formattedDate = formattedDateTime.slice(0 , 10)


            return (
                <div className='bg-gray-300 text-bold text-xl rounded-lg px-2 grid grid-cols-2'>
                    <div className='my-4'>
                        <div className='flex gap-2'>
                            <div>
                                Location :
                            </div>
                            <div>
                            {data.police_appointment_id}
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <div>
                                Date :
                            </div>
                            <div>
                                {
                                    formattedDate
                                }
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <div>
                                Time :
                            </div>
                            <div>
                                {
                                    formattedTime
                                }
                            </div>
                        </div>  
                    </div>
                    <div className='bg bg-blue-500 px-2 py-1 rounded-lg my-auto mx-auto'>
                        <button>Book</button>
                    </div>

                </div>
                )
            })
        }
        </div>
       <div className='my-2'>
        If a citizen would like to meet a DIG , Or SP or SSP , incharge of the division . Public can get any sort of appointment through this screen
       </div>
    </section>
  )
}

export default meetOfficer
