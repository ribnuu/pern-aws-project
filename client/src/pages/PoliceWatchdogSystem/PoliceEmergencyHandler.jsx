import React, { useState } from 'react'
const PoliceEmergencyHandler = () => {
    const [detailsOne , setDetailsOne] = useState(false)
    const [detailsTwo , setDetailsTwo] = useState(false)
    const [detailsThree , setDetailsThree] = useState(false)


    function handleDetailsOne(){
      console.log('working')
      setDetailsOne((prev)=>!prev);
      setDetailsTwo(false);
      setDetailsThree(false);

    }

    function handleDetailsTwo(){
        console.log('working')
      setDetailsTwo((prev)=>!prev);
      setDetailsOne(false)
      setDetailsThree(false);
      }
      function handleDetailsThree(){
        console.log('working')
        setDetailsOne(false)
        setDetailsTwo(false)
        setDetailsThree((prev)=>!prev);
      }
  return (
    <>
    <div className='text-gray-950 '>
          <div className='lg:grid lg:grid-cols-3 gap-4 '>
            <div className='rounded-lg px-2 py-2 my-4 flex flex-col gap-2 text-gray-950 bg-white' onClick={handleDetailsOne}>
            <div className='border-2 border-gray-950 w-full rounded-lg'>
              CCNU 0519 2023 0001
              </div>
              <div className='mx-2'>
                075885254
              </div>
              <div className='mx-2'>
                Location : Kollupititya Keels Super Market
              </div>
            </div>
            <div className='rounded-lg px-2 py-2 my-4 flex flex-col gap-2 text-gray-950 bg-white'onClick={handleDetailsTwo}>
              <div className='border-2 border-gray-950 w-full rounded-lg'>
              CCNU 0519 2023 0002
              </div>
              <div className='mx-2'>
                077744006
              </div>
              <div className='mx-2'>
                Location : Kollupititya Keels Super Market
              </div>
            </div>
            <div className='rounded-lg px-2 py-2 my-4 flex flex-col gap-2 text-gray-950 bg-white' onClick={handleDetailsThree}>
              <div className='border-2 border-gray-950 w-full rounded-lg'>
              CCNU 0519 2023 0003
              </div>
              <div className='mx-2'>
                075885254
              </div>
              <div className='mx-2'>
                Location : Kollupititya Keels Super Market
              </div>
            </div>
          </div>
        </div>
        {
          detailsOne &&
        <div className='bg-white rounded-lg text-gray-950'>
          <div>
            Details Section CCNU 0519 2023 0001
          </div>
          <div>
            Person stabbed with a knife
          </div>
        </div>
        }
        {
          detailsTwo &&
        <div className='bg-white rounded-lg text-gray-950'>
          <div>
            Details Section CCNU 0519 2023 0002
          </div>
          <div>
            Hit and Run
          </div>
        </div>
        }
        {
          detailsThree &&
        <div className='bg-white rounded-lg text-gray-950'>
          <div>
            Details Section CCNU 0519 2023 0003
          </div>
          <div>
            A gang fight
          </div>
        </div>
        }
        
    </>

  )
}

export default PoliceEmergencyHandler