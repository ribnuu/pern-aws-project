import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CourtCaseSystem = () => {

    const [mountLaviniaCourt , setMountLaviniaCourt] = useState(false)
    const [nugegodaCourt , setNugegodaCourt] = useState(false)
    const [aluthKadeCourt , setAluthKadeCourt] = useState(false)

    function handleMountLaviniaCourt(){
        setMountLaviniaCourt((prev) => !prev)
        setNugegodaCourt(false)
        setAluthKadeCourt(false)
    }

    function handleNugegodaCourt(){
        setNugegodaCourt((prev) => !prev)
        setMountLaviniaCourt(false)
        setAluthKadeCourt(false)
    }

    function handleAluthKadeCourt(){
        setAluthKadeCourt((prev) => !prev)
        setNugegodaCourt(false)
        setMountLaviniaCourt(false)
    }


  return (
    <section className='mx-12 my-12'>
        <div>
            This page is used by the courts to schedule cases day<br />
            Cases are taken on a particular time basis<br />
            Otherwise ppl will come and wait whole day<br />
            Courts premises are crowded<br />
            To control the crowd and to prevent pandemics like Covid being spread within the courts premises<br />
            This appointment systems are good<br />
            Each court has a login screen <br />
            Each court will make available time slot for the public to take their cases for hearing<br />
        </div>
        <form>   
                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div class="relative mt-4">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="." required />
                    <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
        </form>
          <div className=' grid grid-cols-1 lg:grid lg:grid-cols-3 gap-4 text-sm font-black py-12 uppercase hover:text-blue-500'>
                <div className='bg-white text-gray-950 rounded-lg px-8 py-4 cursor-pointer' onClick={handleMountLaviniaCourt}>
                    Mount Lavinia Court
                </div>
                <div className='bg-white text-gray-950 rounded-lg px-8 py-4 cursor-pointer' onClick={handleNugegodaCourt}>
                    Nugegoda Court
                </div>
                <div className='bg-white text-gray-950 rounded-lg px-8 py-4 cursor-pointer' onClick={handleAluthKadeCourt} >
                    Aluth Kade Court
                </div>
          </div>
        {
            mountLaviniaCourt && 
            <div className=' grid grid-cols-1 lg:grid lg:grid-cols-3 gap-4 text-sm font-black uppercase hover:text-blue-500'>
                <Link to='/pas/set'>
                    <div className='bg-white text-gray-950 rounded-lg px-8 py-4 cursor-pointer'>
                        MT - Court A
                    </div>   
                </Link>
                <Link to='/pas/set'>
                    <div className='bg-white text-gray-950 rounded-lg px-8 py-4 cursor-pointer' >
                       MT - Court B
                    </div>
                </Link>
                <Link to='/pas/set'>
                    <div className='bg-white text-gray-950 rounded-lg px-8 py-4 cursor-pointer' >
                        MT -Court C
                    </div>
                </Link>
            </div>
        }
        {
            nugegodaCourt && 
            <div className=' grid grid-cols-1 lg:grid lg:grid-cols-3 gap-4 text-sm font-black uppercase hover:text-blue-500'>
                <Link to='/pas/set'>
                    <div className='bg-white text-gray-950 rounded-lg px-8 py-4 cursor-pointer'>
                       NG - Court A
                    </div>
                </Link>
                <Link to='/pas/set'>
                    <div className='bg-white text-gray-950 rounded-lg px-8 py-4 cursor-pointer' >
                       NG - Court B
                    </div>
                </Link>
                <Link to='/pas/set'>
                    <div className='bg-white text-gray-950 rounded-lg px-8 py-4 cursor-pointer' >
                        NG -Court C
                    </div>
                </Link>

            </div>
        }
        {
            aluthKadeCourt && 
            <div className=' grid grid-cols-1 lg:grid lg:grid-cols-3 gap-4 text-sm font-black uppercase hover:text-blue-500'>
                <Link to='/pas/set'>
                    <div className='bg-white text-gray-950 rounded-lg px-8 py-4 cursor-pointer'>
                       AK - Court A
                    </div>
                </Link>
                <Link to='/pas/set'>
                    <div className='bg-white text-gray-950 rounded-lg px-8 py-4 cursor-pointer' >
                        AK - Court B
                    </div>
                </Link>

                <Link to='/pas/set'>
                    <div className='bg-white text-gray-950 rounded-lg px-8 py-4 cursor-pointer' >
                        AK - Court C
                    </div>
                </Link>
            </div>
        }
    </section>

        
  )
}

export default CourtCaseSystem