import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { BiCurrentLocation } from 'react-icons/bi'

const DriverRatingSystem = () => {
  return (
    <section className="mx-12 my-12">
    <div className='bg-white rounded-lg p-14 text-gray-950'>
        <h1 className='text-gray-900 font-bold mx-auto  my-1 text-xl uppercase mb-2'>Driving Rating System</h1>
        <form className='text-black'>
            <div className="relative z-0 w-full mb-6 group ">
                <input type="text" name="vehicle_number" id="vehicle_number" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="port_number" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" onChange={() => {}} value=''>Name of the Driver</label>
            </div>
            <div className="relative z-0 w-full mb-6 group ">
                <input type="text" name="vehicle_number" id="vehicle_number" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="port_number" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" onChange={() => {}} value=''>Vehicle Number Plate</label>
            </div>
            <div className="relative z-0 w-full mb-6 group ">
                <input type="text" name="vehicle_number" id="vehicle_number" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="port_number" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" onChange={() => {}} value=''>License Number</label>
            </div>
            <div className="relative z-0 w-full mb-6 group ">
                <input type="date" name="vehicle_number" id="vehicle_number" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="port_number" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" onChange={() => {}} value=''>Date of the incident</label>
            </div>
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
            <div className="relative z-0 w-full mb-6 group flex gap-4">
                <div className='my-auto'>
                    Choose photo
                </div>
                <input type='file' />
            </div>

            <div className="relative z-0 w-full mb-6 group">
                <input type="text" name="comment" id="comment" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="comment" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" onChange={() => {}} value=''>Comments</label>
            </div>
            <div className="relative z-0 w-full mb-6 group cursor-pointer">
                <div className="badge badge-success m-[2px]">
                Good Driver
                </div>
                <div className="badge badge-success m-[2px]">
                Maintained Good Speed
                </div>
                <div className="badge badge-success m-[2px]">
                On Time to pickup
                </div>
                <div className="badge badge-success m-[2px]">
                Faster Service
                </div>
            </div>
            <div className="relative z-0 w-full mb-6 group cursor-pointer">
                <div className="badge badge-error m-[2px]">
                Ruthless Driving
                </div>
                <div className="badge badge-error m-[2px]">
                Reckless Driving
                </div>
                <div className="badge badge-error m-[2px]">
                Slow Driver
                </div>
                <div className="badge badge-error m-[2px]">
                Delay at pickup
                </div>
            </div>

                {/* htmlFor was replaced from for */}
                <div className='flex'>
                <p className='my-auto'>Rating</p>
                <div className='rate'>
                    <input type="radio" id="star5" name="rae" value="5" />
                    <label htmlFor="star5" title="text">5 stars</label>
                    <input type="radio" id="star4" name="rate" value="4" />
                    <label htmlFor="star4" title="text">4 stars</label>
                    <input type="radio" id="star3" name="rate" value="3" />
                    <label htmlFor="star3" title="text">3 stars</label>
                    <input type="radio" id="star2" name="rate" value="2" />
                    <label htmlFor="star2" title="text">2 stars</label>
                    <input type="radio" id="star1" name="rate" value="1" />
                    <label htmlFor="star1" title="text">1 star</label>
                </div>
                </div>
                <div className="relative z-0 lg:w-full mb-6 groupflex justify-between gap-12">
                    <button type="submit" onClick={() => setData(true) }className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mx-auto w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2"><AiFillStar className='my-auto' />Rate  </button>
                </div>
        </form>
    </div>
    
</section>
  )
}

export default DriverRatingSystem
