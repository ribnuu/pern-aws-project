import React from 'react'
import { Link } from 'react-router-dom'

const legalAdviceHome = () => {
  return (
    <div>
        <section className='mx-12 my-1 px-102'>
          <div className=' grid grid-cols-1 lg:grid lg:grid-cols-3 gap-4 text-sm font-black py-12 uppercase hover:text-blue-500'>
              <Link to='/cgp/legalAdvice'>
                <div className='bg-white text-gray-950 rounded-lg px-8 py-4 cursor-pointer' >
                  Meet a lawyer
                </div>
              </Link>
              <Link to='/cgp/legalAdvice'>
                <div className='bg-white text-gray-950 rounded-lg px-8 py-4 cursor-pointer' >
                  Provide free advice
                </div>
              </Link>
              <Link to='/cgp/legalAdvice/seek'>
                <div className='bg-white text-gray-950 rounded-lg px-8 py-4 cursor-pointer' >
                    Seek legal advice
                </div>
              </Link>
          </div>
          <div>
          So the police interviewing department will be answering questions and doubts raised by the public whenever the public raises a query on how the arrest should be done so that you will be advised by the legal department therefore when they advise them it will go as a FAQ and when the next person comes and ask the same question they will not answer and they will refer the FAQ number because it is already answered by the law department. People can post their questions and legal department will give hints and guidelines for each and every case.
          </div>
        </section>
    </div>
  )
}

export default legalAdviceHome
