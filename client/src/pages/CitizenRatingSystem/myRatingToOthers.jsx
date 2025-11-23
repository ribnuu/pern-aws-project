import React from 'react'
import person from '../../assets/person5.jpg'
import { Link } from 'react-router-dom'

const myRatingToOthers = () => {
    const data = [
        {
            photo:'',
            name : 'Chris',
            comments : 'He saved me from drowning',
            date : '28/05/2022',
            rate : '5'
        },
        {
          photo:'',
          name : 'Chris',
          comments : 'He saved me from drowning',
          date : '28/05/2022',
          rate : '5'
      },
      {
        photo:'',
        name : 'Chris',
        comments : 'He saved me from drowning',
        date : '28/05/2022',
        rate : '5'
    },
    ]
  return (
    <section className='mx-12 my-12'>
          <h1 className='text-center text-xl uppercase'>My Rating to others</h1>
        <div className="grid grid-cols-2  gap-4 mx-12 my-12">
     
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
                   Commentator name :
                 </div>
                 <div>
                     {data.name}
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
             <div className='flex gap-2 my-2'>
               <div>
                   Rating  :
               </div>
               <div className=''>
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
             <div className='my-2'>
              <Link to='/crs/rate'>
               <button className='btn btn-blue-200'>Edit Rating</button>
              </Link>
             </div>
           </div>
         </div>
         </>
       ))}
        </div>
    </section>
  )
}

export default myRatingToOthers