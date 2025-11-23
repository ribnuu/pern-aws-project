import React from 'react'

const personalTrackConnections = () => {
  return (
    <section className='mx-12 my-12'>
      <form>
        <div className="relative z-0 w-full mb-6 flex justify-stretch group">
            <div className='w-10/12'>
              <input type="text" name="MAC" id="MAC" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="MAC" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" onChange={() => {}} value=''>NIC</label>
            </div>
            <div className='text-black flex mx-auto my-auto gap-2 px-2 py-2 bg-gray-400 rounded-lg'>
              <p className=''>
                Load Symantec Diagram
              </p>
            </div>
        </div>
      </form>
        <div>
            Whoever an individual has been associating with is tracked.Let's say my phone was near my friend's phone for 45 minutes today, that can be tracked. We specify a start date and end date and then system will list out associated people including the people who sat next to me in a bus or train. <br />
            Instead we also can let the system draw a live or past map of people who I associated with<br /><br />
            We should be able to draw a symantec diagram for a murdered person or missing person. The diagram will show all the people connected to the missing or murdered person or suspect person.
        </div>

    </section>
  )
}

export default personalTrackConnections