import React from 'react'
import { BiCurrentLocation } from 'react-icons/bi'
import { GrAdd } from 'react-icons/gr'

const reportLocations = () => {
  return (
    <section className='mx-12 my-12'>
        <div className='bg-white p-4 rounded-lg'>
            <div className="relative z-0 w-full mb-6 flex justify-stretch group">
                <div className='w-10/12'>
                <input type="text" name="MAC" id="MAC" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="MAC" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" onChange={() => {}} value=''>Location</label>
                </div>
                <div className='text-black flex mx-auto my-auto gap-2 px-2 py-2 bg-gray-400 rounded-lg'>
                <BiCurrentLocation className='my-auto' />
                <p className=''>
                    Auto detect location
                </p>
                </div>
            </div>
            <div className="relative z-0 mx-auto w-48 mb-6 group flex justify-between gap-12">
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2"><GrAdd />Report Location</button>
            </div>
        </div>
    </section>
  )
}

export default reportLocations