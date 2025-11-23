import React from 'react'
import { Link } from 'react-router-dom'
import person from '../../assets/person3.jpg'

const otherRatingToMine = () => {
    const data = [
        {
            photo:'',
            Rated : 'Jenny',
            comments : 'He did good deed at the train station',
            date : '28/05/2023',
            rate : '4'
        },
        {
            photo:'',
            Rated : 'Jenny',
            comments : 'Misbehaved',
            date : '28/05/2023',
            rate : '1'
        },
        {
            photo:'',
            Rated : 'Jenny',
            comments : 'Supported at street',
            date : '28/05/2023',
            rate : '4'
        },
        {
            photo:'',
            Rated : 'Jenny',
            comments : 'Helped my daughter',
            date : '28/05/2023',
            rate : '5'
        },
        
    ]
  return (
    <section className='mx-12 my-12'>
          <h1 className='text-center text-xl uppercase'>Others rating to me</h1>
          <div className='my-2'>
            <h3 className='text-center my-2'>
                Summary
            </h3>
            <div className='bg-gray-200 p-4 text-black rounded-lg flex space-betweeen gap-4'>
                <div className='flex'>
                    <p className='my-auto'>Summary Rating</p>
                        <div className='rate my-auto'>
                            <input type="radio" id="star5" name="rae" value="5" />
                            <label htmlFor="star5" title="text">5 stars</label>
                            <input type="radio" id="star4" name="rate" value="4" />
                            <label htmlFor="star4" title="text">4 stars</label>
                            <input type="radio" id="star3" name="rate" value="3" />
                            <label htmlFor="star3" title="text">3 stars</label>
                            <input type="radio" id="star2" name="rate" value="2" />
                            <label htmlFor="star2" title="text">2 stars</label>
                            <input type="radio" id="star1" name="rate" value="1" />
                            <label htmlFor="star1" title="text">1 star</label>
                        </div>
                    </div>
                <div className='my-auto'>
                    4.8 / 5
                </div>
                

            </div>
            
          </div>
            <div className="grid grid-cols-2  gap-4">
        
        {data.map((data)=>(
            <>
            <div className='bg-gray-200 p-4 text-black text-sm rounded-lg flex space-between gap-6'>
                <div className='rounded-lg w-auto h-auto'>
                    <img src={person} className='h-auto w-56'/>
                </div>
            <div className='my-4'>
                <h1>My Rating</h1>
                <div className='flex gap-2' >
                    <div>
                    Rated to:
                    </div>
                    <div>
                        {data.Rated}
                    </div>
                </div>
                <div className='flex gap-2'>
                <div>
                    Comments :
                </div>
                <div>
                    {data.comments}
                </div>
                </div>
                <div className='flex gap-2'>
                <div>
                    Rating :
                </div>
                <div>
                    <div className='rate my-auto'>
                        <input type="radio" id="star5" name="rae" value="5" />
                        <label htmlFor="star5" title="text">5 stars</label>
                        <input type="radio" id="star4" name="rate" value="4" />
                        <label htmlFor="star4" title="text">4 stars</label>
                        <input type="radio" id="star3" name="rate" value="3" />
                        <label htmlFor="star3" title="text">3 stars</label>
                        <input type="radio" id="star2" name="rate" value="2" />
                        <label htmlFor="star2" title="text">2 stars</label>
                        <input type="radio" id="star1" name="rate" value="1" />
                        <label htmlFor="star1" title="text">1 star</label>
                    </div>
                    {data.rate}
                </div>
                </div>
                <div className='flex gap-2'>
                <div>
                    Date of Rating :
                </div> 
                <div>
                    {data.date}
                </div>
                </div>
            </div>
            </div>
            </>
        ))}
            </div>
    </section>
  )
}

export default otherRatingToMine