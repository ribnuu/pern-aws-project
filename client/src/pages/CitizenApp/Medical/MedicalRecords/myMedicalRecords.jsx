import React from 'react'
import { Link } from 'react-router-dom'

const myMedicalRecords = () => {
  return (
    <section className='mx-12 my-12'>
            <div className=' grid grid-cols-1 lg:grid lg:grid-cols-3 gap-4 text-sm font-black py-12 uppercase hover:text-blue-500'>
              <Link to='/cgp/legalAdvice'>
                <div className='bg-white text-gray-950 rounded-lg px-8 py-4 cursor-pointer' >
                    My treatment
                </div>
              </Link>
          </div>
          <div>
              My past visit to the government hospital are recorded here
          </div>
    </section>

  )
}

export default myMedicalRecords
