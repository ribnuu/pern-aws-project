import mobile from "../../assets/mobile.jpg"

const BlacklistedPhones = () => {
  const data = [
      {name: "Peter Cullen", imeiNumber: "52fdfd", blacklistedDate : "2023-05-1", address:"189 , Railway Road , Kollupitiya", model:"Android", make:"Japan"},
      {name: "Peter Cullen", imeiNumber: "52fdfd",blacklistedDate : "2023-05-1", address:"189 , Railway Road , Kollupitiya", model:"Android", make:"Japan"},
      {name: "Peter Cullen", imeiNumber: "52fdfd",blacklistedDate : "2023-05-1", address:"189 , Railway Road , Kollupitiya", model:"Android", make:"Japan"},
      {name: "Peter Cullen", imeiNumber: "52fdfd",blacklistedDate : "2023-05-1", address:"189 , Railway Road , Kollupitiya", model:"Android", make:"Japan"},
      {name: "Peter Cullen", imeiNumber: "52fdfd",blacklistedDate : "2023-05-1", address:"189 , Railway Road , Kollupitiya", model:"Android", make:"Japan"},
  ]

return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data.map((data)=>(
          <>
          <div className='bg-gray-200 p-4 text-black text-sm w-102 rounded-lg flex space-between gap-6'>
            <div className='rounded-lg w-auto h-auto'>
              <img src={mobile} className='h-[100px] w-[120px]'/>
            </div>
            <div className='my-4'>
              <h1>Black listed Phones</h1>
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
                    imei number :
                </div>
                <div>
                {data.imeiNumber}
                </div>
              </div>
              <div className='flex gap-2'>
                <div>
                    Owners Address :
                </div>
                <div>
                  {data.address}
                </div>
              </div>
              <div className='flex gap-2'>
                <div>
                    Model :
                </div>
                <div>
                  {data.model}
                </div>
              </div>
              <div className='flex gap-2'>
                <div>
                    Make :
                </div>
                <div>
                  {data.make}
                </div>
              </div>  
              <div>
                <div className="badge badge-info flex m-[2px]">
                  Drug Distribution
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </div>
                <div className="badge badge-success m-[2px]">
                  Armed Distribution
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </div>
                <div className="badge badge-warning m-[2px]">
                  Murder
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </div>
                <div className="badge badge-error m-[2px]">
                  Robbery
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </div>
              </div>
            </div>
          </div>
          </>
        ))}
      </div>
      <div className="py-4 px-20">
          Whenever a new case comes up , particular icon will light up with audio alarm.
          If there is a person missing match found, the missing person tab will blink with audio alarm.
          At same time , if a critical arise , that critical case [PEH] will also blink similarly
        </div>
    </section>
)
}

export default BlacklistedPhones