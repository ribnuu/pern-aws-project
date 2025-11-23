import React from 'react'

const myComplaint = () => {
    const data = [
        {
            id : "1",
            message : "Find my car",
            isReward : 1,
            reward : "100,000"
        },
        {
            id: "2",
            message : "Find my NIC",
            isReward : 0,
            reward : "1,000"
        },
        {
            id: "2",
            message : "Find my Phone",
            isReward : 1,
            reward : "10,000"
        },
    ]
  return (
    <section className='mx-12 my-12'>
        <div className='grid grid-cols-1 gap-4'>
            {
                data.map((data) => {
                    let reward = ''
                    if(data.isReward === 1 ){
                        reward = <div>
                            {
                                data.reward
                            }
                        </div>
                    } else {
                        reward = <div className='flex gap-2' >
                        <div className='text-md'>
                           Reward :  <input type='number' className='bg-white text-black rounded-lg' />
                        </div>
                        <div className='bg-green-300 px-2 rounded-sm'>
                            Add reward
                        </div>
                        </div>
                    }
                    return(
                        <div className='flex bg-white px-4 py-2 rounded-lg text-black justify-items-center'  key={data.id}>
                            <div className='grid grid-cols-12 gap-4 bg-gray-300 rounded-lg w-full justify-items-start px-4 '>
                                <div className='flex flex-col col-span-11 my-2'>
                                    <div className='text-xl'>
                                        Complaint No : 
                                       {
                                        data.id
                                       }
                                    </div>
                                    <div className='text-xs'>
                                        {
                                            data.message
                                        }
                                    </div>
                                    {
                                        reward
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })
            }

        </div>
        <div className='my-12'>
            When someone loses a property[ID, LICENSE ,PASSPORT] . They will go and place the complaint once the complaint is placed , the placed complaints are shown inside my Complaints[CGP] where the citizens can go and declare the rewards for their missing properties<br />
            Once they declare the reward, it cannot be undone and they must pay the reward<br />
            Citizens can also see the feedback or a follow up or an update regarding the complaint so that citizens feel confident that the police is doing their duty<br />
        </div>

    </section>
  )
}

export default myComplaint