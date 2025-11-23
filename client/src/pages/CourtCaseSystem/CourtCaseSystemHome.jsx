import React from 'react'
import { Link } from 'react-router-dom'

const CourtCaseSystemHome = () => {
  return (
    <section className='mx-12 my-12'>
        <div className=' grid grid-cols-1 lg:grid lg:grid-cols-3 gap-4 text-sm font-black py-12'>
            <div className='bg-white text-gray-950 rounded-lg px-8 py-4'>
                <Link to='/ccs/schedule'>
                    Court Case Schedule            
                </Link>
            </div>
            <div className='bg-white text-gray-950 rounded-lg px-8 py-4'>
                <Link to='/ccs/dem'>
                    Digital Evidence Manager           
                </Link>
            </div>
            <div className='bg-white text-gray-950 rounded-lg px-8 py-4'>
                <Link to='/ccs/com'>
                    Court Order Management            
                </Link>
            </div>
        </div>
    </section>
  )
}

export default CourtCaseSystemHome