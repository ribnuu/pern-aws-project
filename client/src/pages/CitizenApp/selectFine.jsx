import React from 'react'
import { AiFillCar } from 'react-icons/ai'
import { BiWalk } from 'react-icons/bi'
import { MdOutlineAttachMoney } from 'react-icons/md'
import { Link } from 'react-router-dom'


const selectFine = () => {
  return (
    <section className=''>
      <div className='mx-12 my-12 bg-white'>
        <div className='bg-white rounded-lg p-8 mt-4 flex  flex-col gap-4 text-gray-950'>
            <h1 className='text-gray-900 font-bold my-1 text-xl uppercase'>Select Fine</h1>
            <div className='flex border-2 hover:bg-green-500 border-gray-950 px-4 py-2 rounded-lg justify-between'>
              <div className='border-2 border-gray-950 px-2 my-auto justify-center rounded-lg'>25/05/2020</div>
              <div className='border-2 border-gray-950 px-2 my-auto justify-center'><AiFillCar /></div>
              <div className='border-2 border-gray-950 px-2 justify-center w-max'>Reckless Driving</div>
              <div className='border-2 border-gray-950 px-2 justify-center'>7500</div>
            </div>
            
            <div className='col-span-3 hover:bg-green-500 flex border-2 border-gray-950 px-4 py-2 rounded-lg justify-between'>
              <div className='border-2 border-gray-950 px-2 my-auto justify-center rounded-lg'>04/01/2022</div>
              <div className='border-2 border-gray-950 px-2 my-auto justify-center'><BiWalk /></div>
              <div className='border-2 border-gray-950 px-2 justify-center w-max'>Jay Walking</div>
              <div className='border-2 border-gray-950 px-2 justify-center'>5000</div>
            </div>
            <div className='col-span-3 flex border-2 hover:bg-green-500 border-gray-950 px-4 py-2 rounded-lg justify-between'>
              <div className='border-2 border-gray-950 px-2 my-auto justify-center rounded-lg'>14/08/2023</div>
              <div className='border-2 border-gray-950 px-2 my-auto justify-center'><AiFillCar /></div>
              <div className='border-2 border-gray-950 px-2 justify-center w-max'>Reckless Driving</div>
              <div className='border-2 border-gray-950 px-2 justify-center'>7500</div>
            </div>
            <div className='col-span-3 hover:bg-green-500 flex border-2 border-gray-950 px-4 py-2 rounded-lg justify-between'>
              <div className='border-2 border-gray-950 px-2 my-auto justify-center rounded-lg'>12/12/2020</div>
              <div className='border-2 border-gray-950 px-2 my-auto justify-center'><BiWalk /></div>
              <div className='border-2 border-gray-950 px-2 justify-center w-max'>Jay Walking</div>
              <div className='border-2 border-gray-950 px-2 justify-center'>5000</div>
            </div>
            <div className="lg:w-full mb-6 flex justify-center gap-2">
                <Link to='/cgp/paymentGateway' className=''>
                  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mx-auto w-full sm:w-auto px-5 py-2.5 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2"><MdOutlineAttachMoney />Pay</button>
                </Link>
            </div>
        </div>
      </div>
    </section>
  )
}

export default selectFine