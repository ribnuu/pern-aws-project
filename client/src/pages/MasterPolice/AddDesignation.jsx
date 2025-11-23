import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AddDesignation = () => {

    const [formData , setFormData ] = useState({
        designation_name : '',
    })
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
       }));
    };
      
    const handleSubmit = async (e) => {
       console.log(formData.designation_name)
       e.preventDefault();
        try {
            const insertResponse = await axios.post('http://localhost:4000/police/master-police/addDesignation' , { formData });
            console.log(insertResponse)
        } catch (error) {
        console.log(error)
        }
    };

  return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Designation</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="designation_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Designation Name</label>
                            <input type="text" name="designation_name" id="designation_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Designation Name" required="" value={formData.designation_name} onChange={handleChange} />
                        </div>
                    </div>
                    <div className='mx-auto justify-center'>
                        <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-600    rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 mx-auto">
                            Add Designation
                        </button>
                    </div>
                </form>
            </div>
            </section>
  )
}

export default AddDesignation
