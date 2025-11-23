import React from 'react'
import { Link } from 'react-router-dom'

const appointmentHome = () => {
  return (
    <div>
      <section className='mx-12 my-1 px-102'>
        <div className=' grid grid-cols-1 lg:grid lg:grid-cols-3 gap-4 text-sm font-black py-12 uppercase'>
          <Link to='/cgp'>
            <div className='bg-white text-gray-950 rounded-lg px-8 py-4 cursor-pointer' >
              Vehicle Revenue Office
            </div>
          </Link>
          <Link to='/cgp'>
            <div className='bg-white text-gray-950 rounded-lg px-8 py-4 cursor-pointer' >
              Insurance Renewal
            </div>
          </Link>
          <Link to='/cgp'>
            <div className='bg-white text-gray-950 rounded-lg px-8 py-4 cursor-pointer' >
              RMV
            </div>
          </Link>
          <Link to='/cgp/meet'>
            <div className='bg-white text-gray-950 rounded-lg px-8 py-4 cursor-pointer' >
              Meet a police officer
            </div>
          </Link>
          <Link to='/clearance'>
            <div className='bg-white text-gray-950 rounded-lg px-8 py-4 cursor-pointer' >
              Apply for police clearance
            </div>
          </Link>
          <Link to='/clearance'>
            <div className='bg-white text-gray-950 rounded-lg px-8 py-4 cursor-pointer' >
              Get Birth Certificates Copies
            </div>
          </Link>
          <Link to='/cgp/appointment/courtCases'>
            <div className='bg-white text-gray-950 rounded-lg px-8 py-4 cursor-pointer' >
              Court Cases
            </div>
          </Link>
          <Link to='/cgp/'>
            <div className='bg-white text-gray-950 rounded-lg px-8 py-4 cursor-pointer' >
              EMISSION CERTIFICATE
            </div>
          </Link>
          <Link to='/cgp/'>
            <div className='bg-white text-gray-950 rounded-lg px-8 py-4 cursor-pointer' >
              DRIVERS LICENSE
            </div>
          </Link>
          <Link to='/cgp/'>
            <div className='bg-white text-gray-950 rounded-lg px-8 py-4 cursor-pointer' >
              VEHICLE INSURANCE
            </div>
          </Link>
          <Link to='/cgp/'>
            <div className='bg-white text-gray-950 rounded-lg px-8 py-4 cursor-pointer' >
              REVENUE LICENSE
            </div>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default appointmentHome