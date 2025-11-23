import React from 'react'
import { AiFillCar, AiOutlineSearch } from 'react-icons/ai'
import { Link } from 'react-router-dom'


const IssuesWithoutFine = () => {
    return (
        <section className='mx-12 my-12'>
            <div className='bg-white'>
                <div className=' rounded-lg p-8 mt-4 flex  flex-col gap-4 text-black'>
                    <div className='col-span-3 grid grid-cols-2 hover:bg-green-500 border-2 border-gray-950 px-4 py-2 rounded-lg'>
                        <div className='border-2 border-gray-950 px-2 justify-center mx-auto my-auto rounded-lg'><AiFillCar /></div>
                        <div className='border-2 border-gray-950 px-2 justify-center w-fit rounded-lg'>Show the license to the nearest police station</div>
                    </div>
                    <div className='col-span-3 grid grid-cols-2 hover:bg-green-500 border-2 border-gray-950 px-4 py-2 rounded-lg'>
                        <div className='border-2 border-gray-950 px-2 justify-center mx-auto my-auto rounded-lg'><AiFillCar /></div>
                        <div className='border-2 border-gray-950 px-2 justify-center w-fit rounded-lg'>Show the insurance to the nearest police station</div>
                    </div>
                    <div className='col-span-3 grid grid-cols-2 hover:bg-green-500 border-2 border-gray-950 px-4 py-2 rounded-lg'>
                        <div className='border-2 border-gray-950 px-2 justify-center mx-auto my-auto rounded-lg'><AiFillCar /></div>
                        <div className='border-2 border-gray-950 px-2 justify-center w-fit rounded-lg'>Show the emmission certificate to the nearest police station</div>
                    </div>
                    <div className='col-span-3 grid grid-cols-2 hover:bg-green-500 border-2 border-gray-950 px-4 py-2 rounded-lg'>
                        <div className='border-2 border-gray-950 px-2 justify-center mx-auto my-auto rounded-lg'><AiFillCar /></div>
                        <div className='border-2 border-gray-950 px-2 justify-center w-fit rounded-lg'>Show the vehicle with new tyres</div>
                    </div>
                    <div className='col-span-3 grid grid-cols-2 hover:bg-green-500 border-2 border-gray-950 px-4 py-2 rounded-lg'>
                        <div className='border-2 border-gray-950 px-2 justify-center mx-auto my-auto rounded-lg'><AiFillCar /></div>
                        <div className='border-2 border-gray-950 px-2 justify-center w-fit rounded-lg'>Show once you remove the vehicle glass tint</div>
                    </div>
                    <Link>
                        <div className="relative z-0 lg:w-full mb-6 group flex justify-between mx-5 gap-12">
                            <Link to='/dop/paymentOption'>
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2"><AiOutlineSearch />Next</button>
                            </Link>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default IssuesWithoutFine
