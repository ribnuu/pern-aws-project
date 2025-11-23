import React, { useState } from 'react'
import { AiOutlineComment } from 'react-icons/ai'
import { BiHome } from 'react-icons/bi'

const NewsOrAnnouncement = () => {

    const [active , setActive] = useState(true)
    const [protestData , setProtestData] = useState(false)
    const [curfewData , setCurfewData] = useState(false)

    const data = [
        {
            id : 1,
            headlines : "Protest",
            date : "28-03-2022",
            description: "Protest happening at the moment near Galle Face",
            body : "Road Blocks established at every corner",
            comment : 20
        },
        {
            id : 2,
            headlines : "Curfew in Western Province",
            date : "30-05-2023",
            description: "Police actively acting on this curfew",
            body : "Public are not allowed to roam around the city when a curfew is ongoing. They are adviced to remain indoors or immediately evacuate to their houses",
            comment : 30

        },
    ]
  return (
    <section className='mx-12 my-12'>
        {
            active && 
         <div className='bg-white rounded-lg p-4 my-4'>
           <h1 className='uppercase text-xl text-black mx-2 my-4'>News</h1>
            <div className="grid grid-cols-1  gap-4 my-4">
           {
            data.map((data) => (
              <div className='bg-gray-200 p-4 text-black text-sm w-102 rounded-lg space-between gap-6' onClick={() => {
                if(data.id === 1){

                    setProtestData(!protestData)
                    setActive(!active)
                }
        }}>
                <div className='' >
                  <div className='flex gap-2' >
                      <div>
                        Headline :
                      </div>
                      <div>
                          {data.headlines}
                      </div>
                  </div>
                </div>
                <div className='flex gap-2'>
                  <div>
                      Description :
                  </div>
                  <div>
                    {data.description}
                  </div>
                </div>
                <div className='flex gap-2'>
                  <div>
                      Body / Details :
                  </div>
                  <div>
                    {data.body}
                  </div>
                </div>
                <div className='flex gap-2'>
                  <div className='my-auto'>
                    <AiOutlineComment />
                  </div>
                  <div>
                    {data.comment}
                  </div>
                </div>
              </div>
            ))
           }
           </div>
        </div>
        }
        {
            protestData && 
            <div className='text-xl'>
                {
                    <>
                     <div className='bg-red-200 text-3xl p-4 text-black w-102 rounded-lg space-between gap-6'>
                     <div className='' onClick={() => {
                         setProtestData(!protestData)
                         setActive(!active)
                     }}>
                        <div onClick={() => setActive(true)}>
                            <BiHome />
                        </div>
                       <div className='flex gap-2' >
                           <div>
                             Headline :
                           </div>
                           <div>
                               {data[0].headlines}
                           </div>
                       </div>
                     </div>
                     <div className='flex gap-2'>
                       <div>
                           Description :
                       </div>
                       <div>
                         {data[0].description}
                       </div>
                     </div>
                     <div className='flex gap-2'>
                       <div>
                           Body / Details :
                       </div>
                       <div>
                         {data[0].body}
                       </div>
                     </div>
                   <div className='bg-white text-sm rounded-lg px-4 py-2'>
                    <span className='text-xl'>
                        Comments of Citizen
                    </span>
                    <div className='flex flex-col'>
                        <div className='text-xl'>
                            Abdul Malik : 
                        </div>
                        <div>
                            Let's stop this together
                        </div>
                        <div className='text-xl'>
                            Thanush : 
                        </div>
                        <div>
                            Let's be at home and support the cause 
                        </div>
                    
                    </div>
                   </div>
                   </div>
                   </>

                }

            </div>
        }
         {
            curfewData && 
            <div className='text-xl'>
                {
                    <>
                     <div className='bg-red-200 text-3xl p-4 text-black w-102 rounded-lg space-between gap-6'>
                     <div className='' onClick={() => {
                         setProtestData(!protestData)
                         setActive(!active)
                     }}>
                        
                        
                       <div className='flex gap-2' >
                           <div>
                             Headline :
                           </div>
                           <div>
                               {data[1].headlines}
                           </div>
                       </div>
                     </div>
                     <div className='flex gap-2'>
                       <div>
                           Description :
                       </div>
                       <div>
                         {data[1].description}
                       </div>
                     </div>
                     <div className='flex gap-2'>
                       <div>
                           Body / Details :
                       </div>
                       <div>
                         {data[1].body}
                       </div>
                     </div>
                   </div>
                   
                   </>

                }

            </div>
        }
    </section>
  )
}

export default NewsOrAnnouncement