import React, { useState } from 'react'
import { AiFillFacebook, AiFillInstagram } from 'react-icons/ai'
import { FaSnapchatSquare, FaTwitterSquare } from 'react-icons/fa'


const socialMedia = () => {
    
const [facebook , setFacebook] = useState(false);
const [instagram , setInstagram] = useState(false);
const [twitter , setTwitter] = useState(false);
const [snapchat , setSnapchat] = useState(false);

  return (
    <section className='mx-12 my-12'>
        <h1 className='text-xl text-white'>My Social Media</h1>
        <div className='grid grid-cols-4'>
            <div className='px-2 py-2 text-9xl' onClick={() => setFacebook(!facebook)}><AiFillFacebook /></div>
            <div className='px-2 py-2 text-9xl' onClick={() => setInstagram(!instagram)}><AiFillInstagram /></div>
            <div className='px-2 py-2 text-9xl'onClick={() => setTwitter(!twitter)}><FaTwitterSquare /></div>
            <div className='px-2 py-2 text-9xl'onClick={() => setSnapchat(!snapchat)}><FaSnapchatSquare /></div>
        </div>
        {
                facebook && 
                <div className='text-white my-2'>
                    <label>
                        Facebook : 
                    </label>
                    <input type='text' />
                    <button className='px-4 py-2 rounded-lg mx-2 bg-white text-black'>Submit</button>
                </div>
        }
        {
            instagram && 
            <div className='text-white my-2'>
                    <label>
                        Instagram : 
                    </label>
                <input type='text' />
                <button className='px-4 py-2 rounded-lg mx-2 bg-white text-black'>Submit</button>

            </div>
        }
        {
            twitter &&
            <div className='text-white my-2'>
                    <label>
                        Twitter : 
                    </label>
                <input type='text' />
                <button className='px-4 py-2 rounded-lg mx-2 bg-white text-black'>Submit</button>

            </div>
        }
        {
            snapchat &&
            <div className='text-white my-2'>
                    <label>
                        Snapchat : 
                    </label>
                <input type='text' />
                <button className='px-4 py-2 rounded-lg mx-2 bg-white text-black'>Submit</button>

            </div>
        }
    </section>
  )
}

export default socialMedia