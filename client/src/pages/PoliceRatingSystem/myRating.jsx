import React from 'react'

const myRating = () => {
    const data = [
        {
            rating : 3 , comment : 'Miserable', person : 'John' , NIC : '200145755215'
        } ,
        { 
            rating : 5 , comment : 'Fast Service', person : 'Wick' , NIC : '200145755215'
        }, 
        {   rating : 1 , comment : 'Miserable', person : 'Sam' , NIC : '199945755215'
        },
        {
           rating : 4 , comment : 'Miserable', person : 'Witwicky' , NIC : '197545755215', 
        } 
    ]
  return (
    <section className='mx-12 my-12'>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-12 my-12">
     
     {data.map((data)=>(
         <>
         <div className='bg-gray-200 p-4 text-black text-sm w-102 rounded-lg flex space-between gap-6'>
           <div className='my-4'>
             <h1>Comments</h1>
             <div className='flex gap-2' >
                 <div>
                   Commentator name :
                 </div>
                 <div>
                     {data.person}
                 </div>
             </div>
             <div className='flex gap-2'>
               <div>
                   Rating :
               </div>
               <div>
               {data.rating}
               </div>
             </div>
             <div className='flex gap-2'>
               <div>
                   Comment :
               </div>
               <div>
                 {data.comment}
               </div>
             </div>
             <div className='flex gap-2'>
               <div>
                   NIC of Commentator :
               </div>
               <div>
                 {data.NIC}
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

export default myRating