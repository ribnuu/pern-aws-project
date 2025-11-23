import React from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const initialApplication = () => {
  return (
    <section className=''>
      <div className='mx-12 my-12 bg-white'>
        <div className='bg-white rounded-lg p-8 mt-4'>
        <form onSubmit={() => {}}>
          <div className="relative z-0 w-full mb-6 group">
              <input type="text" name="ip_address" id="ip_address" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="ip_address" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" onChange={() => {}} value=''>NIC</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
              <input type="text" name="driving_license" id="driving_license" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="port_number" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" onChange={() => {}} value=''>Driving License</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
              <input type="text" name="vehicle_number" id="vehicle_number" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="port_number" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" onChange={() => {}} value=''>Mobile Number</label>
          </div>
             
              <div className="relative z-0 lg:w-full mb-6 groupflex justify-between gap-12">
                <Link to='/cgp/otpVerification'>
                  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mx-auto w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2"><AiOutlineSend className='my-auto' />Send OTP</button>
                </Link>
              </div>
          </form>
        </div>        
      </div>
    </section>
  )
}

export default initialApplication