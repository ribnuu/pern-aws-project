import axios from 'axios';
import React, { useEffect, useState } from 'react'


const allocateDuty = () => {

    const [badgeNumberData , setbadgeNumberData] = useState([]);

    const fetchPoliceData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/police/master-police/getPoliceOfficer')
            setbadgeNumberData(response.data)
                    
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchPoliceData();
    }, [])

    const [formData , setFormData] = useState({
        location : '',
        badge_number : '',
        duty_start_time : '',
        duty_end_time : '',
        
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
       }));
    };
      
    const handleSubmit = async (e) => {
       console.log(formData)
       e.preventDefault();
        try {
            const insertResponse = await axios.post('http://localhost:4000/duty-allocation/addDuty' , { formData });
            console.log(insertResponse)
        } catch (error) {
        console.log(error)
        }
    };

  return (
    <section className='mx-12 my-12'>
        <div className='bg-white p-4 rounded-lg'>
            <h1 className='text-gray-900 font-bold mx-auto my-1 text-xl uppercase'>Allocate duty</h1>
            <form onSubmit={handleSubmit}>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" name="location" id="location" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handleChange} value={formData.location} />
                    <label htmlFor="location" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Location</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <div>
                            {/* <label htmlFor="category" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-10 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Choose Officer</label> */}
                    </div>
                    <div>
                            <select id="badge_number" className="block py-2.5 px-0 w-full text-sm g-transparent border-0 border-b-2 border-gray-300 appearance-none :text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-white text-gray-500" name='badge_number' value={formData.badge_number} onChange={handleChange}>
                                <option selected="" className='text-gray-500'>Select Officer</option>
                                    {
                                        badgeNumberData.map((data) => {
                                            return (
                                                <option 
                                                key={data.badge_number}
                                                value={data.badge_number} className='text-black'>
                                                    {
                                                        data.badge_number
                                                    }
                                                </option>
                                            )
                                        } )
                                    }
                                
                            </select>
                    </div>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="datetime-local" name="duty_start_time" id="duty_start_time" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleChange} value={formData.duty_start_time} />
                    <label htmlFor="duty_start_time" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Start Time</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="datetime-local" name="duty_end_time" id="duty_end_time" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleChange} value={formData.duty_end_time} />
                    <label htmlFor="duty_end_time" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">End Time</label>
                </div>
                <div className="lg:w-full mb-6 flex justify-center gap-2">
                  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mx-auto  sm:w-auto px-5 py-2.5 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2">Allocate</button>
              </div>
            </form>
        </div>
    </section>
  )
}

export default allocateDuty