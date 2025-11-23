import React from 'react'
import { Link } from 'react-router-dom'

const seekLegalAdviceHome = () => {
  return (
    <div>
        <section className='mx-12 my-1 px-102'>
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
              <Link to='/cgp/legalAdvice'>
                <div className='bg-white text-gray-950 rounded-lg px-8 py-4 cursor-pointer' >
                    PROBLEM WITH DRIVING RELATED OFFENCES
                </div>
              </Link>
              <Link to='/cgp/legalAdvice'>
                <div className='bg-white text-gray-950 rounded-lg px-8 py-4 cursor-pointer' >
                    LAND OR PROPERTY RELATED ISSUES
                </div>
              </Link>
              <Link to='/cgp/legalAdvice'>
                <div className='bg-white text-gray-950 rounded-lg px-8 py-4 cursor-pointer' >
                    DOMESTIC VIOLENCE
                </div>
              </Link>
          </div>
        </section>
        <div className='mx-12'>
            Public will go and present their problems in this page to get advice about their problems.<br /> and lawyer or legal representative will adice the publiv on how things are done and what are the documents required for each and every different types of cases.<br /><br />
            Lawyer who doesn't work under the police department can voluntarily join this portal and instruct the public with regards to legal advices and guidelines freely.<br /><br />
            After verifying their profession that they are a lawyer , they will be given free access to the portal to login and post legal advices to the public freely.<br />
        </div>
    </div>
  )
}

export default seekLegalAdviceHome
