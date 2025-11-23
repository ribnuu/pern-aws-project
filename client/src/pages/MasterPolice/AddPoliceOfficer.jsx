import axios from 'axios'
import React, { useState } from 'react'

const AddPoliceOfficer = () => {

    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        address: '',
        date_of_birth: '',
        gender: '',
        training_completed: '',
        notes: '',
        badge_number: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const insertResponse = await axios.post('http://localhost:4000/police/master-police/addPoliceUser', { formData });
            console.log(insertResponse)
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new police officer</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        {/* username */}
                        <div className="sm:col-span-2">
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add a police officer</label>
                            <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Officer Name" required="" value={formData.username} onChange={handleChange} />
                        </div>
                        {/* first name */}
                        <div className="w-full sm:col-span-2">
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                            <input type="text" name="first_name" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="First Name" required="" value={formData.first_name} onChange={handleChange} />
                        </div>
                        {/* last name */}
                        <div className="w-full sm:col-span-2">
                            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                            <input type="text" name="last_name" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Last Name" required="" value={formData.last_name} onChange={handleChange} />
                        </div>

                        {/* email */}
                        <div className="w-full sm:col-span-2">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Address</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Email Address" required="" value={formData.email} onChange={handleChange} />
                        </div>
                        {/* badge_number */}
                        <div className="w-full sm:col-span-2">
                            <label htmlFor="badge_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Badge Number</label>
                            <input type="text" name="badge_number" id="badge_number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Badge Number" required="" value={formData.badge_number} onChange={handleChange} />
                        </div>

                        {/* phone_number */}
                        <div className="w-full sm:col-span-2">
                            <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                            <input type="tel" name="phone_number" id="phone_number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Phone Number" required="" value={formData.phone_number} onChange={handleChange} />
                        </div>
                        {/* address */}

                        <div className="sm:col-span-2">
                            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                            <textarea id="address" name="address" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Address Here" value={formData.address} onChange={handleChange}></textarea>
                        </div>

                        {/* dob */}
                        <div className="w-full sm:col-span-2">
                            <label htmlFor="date_of_birth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of birth</label>
                            <input type="date" name="date_of_birth" id="date_of_birth" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder=" " onChange={handleChange} value={formData.date_of_birth} />

                        </div>

                        {/* gender */}
                        <div>
                            <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose gender</label>
                            <select id="gender" name='gender' value={formData.gender} onChange={handleChange} className="select select-bordered w-full bg-gray-700">
                                <option selected="">Choose Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        {/* training_completed */}

                        <div>
                            <label htmlFor="Training" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Training Completed</label>
                            <select id="training" name='training_completed' value={formData.training_completed} onChange={handleChange} className="select select-bordered w-full bg-gray-700">
                                <option selected="">Select Response</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>

                        {/* notes */}
                        <div className="sm:col-span-2">
                            <label htmlFor="notes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notes</label>
                            <textarea id="notes" name="notes" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Any Notes Here" value={formData.notes} onChange={handleChange}></textarea>
                        </div>

                        {/* <div>
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                            <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option selected="">Select category</option>
                                <option value="TV">TV/Monitors</option>
                                <option value="PC">PC</option>
                                <option value="GA">Gaming/Console</option>
                                <option value="PH">Phones</option>
                            </select>
                        </div> */}
                        {/* <div>
                            <label htmlFor="item-weight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Weight (kg)</label>
                            <input type="number" name="item-weight" id="item-weight" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="12" />
                        </div>  */}

                    </div>
                    <div className='mx-auto justify-center'>
                        <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-600    rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 mx-auto">
                            Add User
                        </button>
                    </div>
                </form>
            </div>
            <div>
                Get the fingerprint also in the system through the mobile phone sensor or a fingerprint sensor and use that data for duty sign in or sign off.
            </div>
        </section>
    )
}

export default AddPoliceOfficer
