import React from 'react'
import police from '../assets/police.jpg'
import { Link } from 'react-router-dom'

const policeDetails = () => {
    const data = [
        {name: "Peter Cullen", badgeNumber: "44083", comments:"Friendly , Well Mannered", ratingAverage : 4},
        {name: "Peter Cullen", badgeNumber: "22025", comments:"Rude", ratingAverage : 5},
        {name: "Peter Cullen", badgeNumber: "11402", comments:"He did not listen to me", ratingAverage : 5},
        {name: "Peter Cullen", badgeNumber: "99052", comments:"He sorted my problems immediately", ratingAverage : 1},
        {name: "Peter Cullen", badgeNumber: "54663", comments:"Obedient" , ratingAverage : 3.5}
    ]
  return (
    <>
    <div>
            Give star and rate the police officer by the way of dealing , how they deal with things , division wise best perfomer will be announced on tge portal. Portals show everyone who well performs. Also shows which officers are ranked with most stars and mor feedbacks. Based on that they will have respective promotion. Public opinion is used to promotion. Bad comments dealing will be given with no promotion. Portal will also show top 10 officers for the day dynamically and keeps on changing
        </div>
    <form>
        <div className="relatie z-0 w-full mb-2 group bg-white text-black flex justify-around rounded-lg px-2 py-2 mx-12 my-12">
          <div>
            <label>Choose District : </label>
            <select name="province" id="province" form="province" className="bg-white px-2">
              <option disabled selected value> -- select a district -- </option>
              <option value="Colombo">Colombo</option>
              <option value="Ratmalana">Ratmalana</option>
              <option value="Wattala">Wattala</option>
              <option value="Jaffna">Jaffna</option>
              <option value="Gampaha">Gampaha</option>
            </select>
          </div>
          <div>
            <label>Choose Province : </label>
            <select name="province" id="province" form="province" className="bg-white px-2">
              <option disabled selected value> -- select a province -- </option>
              <option value="Western">Western</option>
              <option value="Eastern">Eastern</option>
              <option value="Northern">Northern</option>
              <option value="Southern">Southern</option>
            </select>
          </div>
        </div>
        <div className='flex justify-center'>
            <div className="relative z-0 mb-2 group">
                <input type="text" name='dbType' id="" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange="" value="" required />
                <label htmlFor="" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Badge Number</label>
            </div>
        </div>
        <div className='relative z-0 w-full justify-center group flex'>
            <div>
            <label>Sort </label>
            <select name="province" id="province" form="province" className="bg-white px-2">
              <option disabled selected value> -- select a sort -- </option>
              <option value="Top">Top 10</option>
              <option value="Low">Low 10</option>
            </select>
          </div>
        </div>

        </form>
    <div className='mx-12 my-12 bg-white text-gray-950 gap-12 p-2 flex rounded-lg'>
        
       <div className="grid grid-cols-2  gap-4 mx-12 my-12">
     
     {data.map((data)=>(
         <>
         <div className='bg-gray-200 p-4 text-black text-sm rounded-lg flex space-between gap-6'>
           <div className='rounded-lg w-auto h-auto'>
             <img src={police} className='h-auto w-56'/>
           </div>
           <div className='my-4'>
             <h1>Police Officer Rating</h1>
             <div className='flex gap-2' >
                 <div>
                   Owners name :
                 </div>
                 <div>
                     {data.name}
                 </div>
             </div>
             <div className='flex gap-2'>
               <div>
                   Badge number :
               </div>
               <div>
               {data.badgeNumber}
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
                   Rating Average :
               </div>
               <div>
                 {data.ratingAverage}
               </div>
             </div>
             <div>
              <Link to='/myRating'>
               <button className='btn btn-blue-200'>View Comments</button>
              </Link>
             </div>
           </div>
         </div>
         </>
       ))}
        </div>
    </div>
    </>
  )
}

export default policeDetails
