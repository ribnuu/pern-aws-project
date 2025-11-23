import React from 'react'

const myRating = () => {
  return (
    <section className='mx-12 my-12'>
          <h1 className='text-gray-900 font-bold mx-auto my-1 text-xl uppercase'>My Rating</h1>
        <div className='bg-white text-black rounded-lg px-2 py-4'>
            Average Rating : 4.5/5
        </div>
        <div>
            Should create a component that pulls data dynamically. Show last 5 comments
        </div>
    </section>
  )
}

export default myRating