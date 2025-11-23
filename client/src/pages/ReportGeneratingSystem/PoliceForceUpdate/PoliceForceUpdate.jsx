import React from 'react'
import { Link } from 'react-router-dom'

const PoliceForceUpdate = () => {
    return (
        <section className='mx-12 my-12'>
            <div className='my-4'>
                This screen is used to get total update of a station.<br />

                Choose a station, it shows all minor details like below
            </div>
            <div className=' grid grid-cols-1 lg:grid lg:grid-cols-3 gap-4 text-sm font-black'>
                <Link to='dehiwala'>
                    <div className='bg-white text-gray-950 rounded-lg px-8 py-4'>
                        DEHIWALA POLICE STATION
                    </div>
                </Link>
                <Link to='wellawatte'>
                    <div className='bg-white text-gray-950 rounded-lg px-8 py-4'>
                        WELLAWATTE POLICE STATION
                    </div>
                </Link>
            </div>
        </section>
    )
}

export default PoliceForceUpdate
