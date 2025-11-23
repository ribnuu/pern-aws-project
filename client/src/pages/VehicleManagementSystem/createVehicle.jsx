import { Link } from 'react-router-dom'
import { AiOutlineUserAdd } from 'react-icons/ai'


const createVehicle = () => {
  return (
    <section className=''>
    <div className='mx-12 my-12 bg-white'>
      <div className='bg-white rounded-lg p-8 mt-4'>
      <form onSubmit={() => {}}>
        <div className="relative z-0 w-full mb-6 group">
            <input type="text" name="vehicle_number" id="vehicle_number" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="vehicle_number" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" onChange={() => {}} value=''>Vehicle Number</label>
        </div>
       
        <div className="relative z-0 w-full mb-6 group">
            <input type="make/model" name="make/model" id="make/model" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="make/model" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" onChange={() => {}} value=''>Make / Model</label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
            <input type="number" name="year" id="vehicle_number" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="port_number" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" onChange={() => {}} value=''>Year</label>
        </div>
        <div className='relative z-0 w-full mb-6 group border-gray-950 border-2 rounded-lg'>
          <select className="select w-full text-gray-950">
            <option disabled selected>Select the branch</option>
            <option>Wellawatte</option>
            <option>Dehiwala</option>
            <option>Pettah</option>
            <option>Mount Lavinia</option>
          </select>
        </div>
        <div className='relative z-0 w-full mb-6 group border-gray-950 border-2 rounded-lg'>
          <select className="select w-full text-gray-950">
            <option disabled selected>Select the Department</option>
            <option>Police</option>
            <option>Examination</option>
            <option>Immigration</option>
            <option>Militiary</option>
          </select>
        </div>
           
            <div className="relative z-0 lg:w-full mb-6 groupflex justify-between gap-12">
              <Link to='/vms/assign'>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mx-auto w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2"><AiOutlineUserAdd className='my-auto' />Create A Vehicle</button>
              </Link>
            </div>
          {/* Should we also have a remove option */}
          {/* <Link to='/connection'> */}
        {/* </Link> */}
        </form>
      </div>        
    </div>
  </section>
  )
}

export default createVehicle