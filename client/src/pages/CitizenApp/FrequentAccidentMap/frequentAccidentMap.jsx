import React from 'react'
import { Link } from 'react-router-dom'

const frequentAccidentMap = () => {
  return (
    <section className='mx-12 my-12'>
        <div className=' grid grid-cols-1 lg:grid lg:grid-cols-3 gap-4 text-sm font-black py-12'>
            <div className='bg-white text-gray-950 rounded-lg px-8 py-4'>
                <Link to='/cgp/fam/report'>
                    Report
                </Link>
            </div>
        </div>
        <div>
            This map will distinguish locations in two different colours the real locations through the police portal notifed in blue colour and other locations notifed by citizens in green colour
            <br />
            Using this screen , the screen will help public to notify the government and fellow citizens about dangerous and frequent spots where accidents taking place
            <br />
            <br />
            This screen will load a map that will notify locations where accidents takes place. We will also be able to see if there are multiple accidents taking place within a specific area range or within a specific radius<br /> ex - Within 2.5 km radius
        </div>
    </section>
  )
}

export default frequentAccidentMap