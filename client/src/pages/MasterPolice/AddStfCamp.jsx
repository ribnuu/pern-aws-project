import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AddStfCamp = () => {

    const [formData , setFormData ] = useState({
        stfcamp_name : '',
        stfcamp_address : '',
        stfcamp_mail : '',
        stfcamp_contact_landline: '',
        stfcamp_contact_mobile : '',
    })
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
       }));
    };
      
    const handleSubmit = async (e) => {
       console.log(formData.stfcamp_name)
       e.preventDefault();
        try {
            const insertResponse = await axios.post('http://localhost:4000/police/master-police/addSTF' , { formData });
            console.log(insertResponse)
        } catch (error) {
        console.log(error)
        }
    };

      
    const [districtData , setDistrictData] = useState([]);

    const fetchDistrictData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/police/master-police/getDistricts')
            setDistrictData(response.data)
                    
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchDistrictData();
    }, [])


  return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new STF Camp</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="stfcamp_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add a STFCamp Name</label>
                            <input type="text" name="stfcamp_name" id="stfcamp_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type STF Camp Name" required="" value={formData.stfcamp_name} onChange={handleChange} />
                        </div>
                        <div className="w-full sm:col-span-2">
                            <label htmlFor="stfcamp_mail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">STFCamp Mail</label>
                            <input type="email" name="stfcamp_mail" id="stfcamp_mail" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Station Mail" required="" value={formData.stfcamp_mail} onChange={handleChange} />
                        </div>
                        <div className="w-full">
                            <label htmlFor="stfcamp_contact_landline" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">STFCamp  Contact Landline</label>
                            <input type="number" name="stfcamp_contact_landline" id="stfcamp_contact_landline" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="0112 559 559" value={formData.stfcamp_contact_landline} onChange={handleChange} />
                        </div>
                        <div className="w-full">
                            <label htmlFor="stfcamp_contact_mobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">STFCamp Contact Mobile</label>
                            <input type="number" name="stfcamp_contact_mobile" id="stfcamp_contact_mobile" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formData.stfcamp_contact_mobile} onChange={handleChange} placeholder="0777 559 559" />
                        </div>
                        <div>
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose District</label>
                            <select id="category" className="select select-bordered w-full bg-gray-700">
                                <option selected="">Select District</option>
                                    {
                                        districtData.map((data) => {
                                            console.log(data.district_id , data.district_name)
                                            return (
                                                <option value={data.district_id}>
                                                    {
                                                        data.district_name
                                                    }
                                                </option>
                                            )
                                        } )
                                    }
                                
                            </select>
                        </div>
                        {/* <div>
                            <label htmlFor="item-weight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Weight (kg)</label>
                            <input type="number" name="item-weight" id="item-weight" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="12" />
                        </div>  */}
                        <div className="sm:col-span-2">
                            <label htmlFor="stfcamp_address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">STF Camp Address</label>
                            <textarea id="stfcamp_address" name="stfcamp_address" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="STFCamp Address Here" value={formData.stfcamp_address} onChange={handleChange}></textarea>
                        </div>
                    </div>
                    <div className='mx-auto justify-center'>
                        <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-600    rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 mx-auto">
                            Add STFCamp
                        </button>
                    </div>
                </form>
            </div>
            </section>
  )
}

export default AddStfCamp
