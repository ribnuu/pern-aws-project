import React from 'react'
import { MdOutlineAssignmentInd } from 'react-icons/md'
import { Link } from 'react-router-dom'

const assignRoles = () => {
  return (
    <section className=''>
      <div className='mx-12 my-12 bg-white'>
        <div className='bg-white rounded-lg p-8 mt-4'>
        <form onSubmit={() => {}}>
          <div className="relative z-0 w-full mb-6 group flex flex-col text-center gap-4">
            <select className="select w-full text-gray-950 border-2 border-gray-950 rounded-lg">
              <option disabled selected>Select the user</option>
              <option>Asitha</option>
              <option>Tennakoon</option>
              <option>Peter</option>
              <option>Williams</option>
              <option>Anna</option>
            </select>
            <select className="select w-full text-gray-950 border-2 border-gray-950 rounded-lg">
              <option disabled selected>Select the role</option>
              <option>DIG</option>
              <option>Constable</option>
              <option>Traffic Police</option>
            </select>
          </div>
              <div className="relative z-0 lg:w-full mb-6 groupflex justify-between gap-12">
                <Link to='/ums/assign'>
                  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mx-auto w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2"><MdOutlineAssignmentInd className='my-auto' />Assign User</button>
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

export default assignRoles