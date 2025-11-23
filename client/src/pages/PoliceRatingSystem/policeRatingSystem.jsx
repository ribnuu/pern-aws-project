import React, { useState } from "react";
import "../../assets/starRating.css";
import { AiOutlineSearch } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import LicenseInfo from "../Character/LicenseInfo";
import axios from "axios";

const policeRatingSystem = () => {
  const [formData, setFormData] = useState({
    station: "",
    officer_name: "",
    description: "",
    badge_number: "",
    date: "",
    comments: "",
    rating: 5,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const insertResponse = await axios.post(
        "http://localhost:4000/policeRating/set",
        { formData }
      );
      console.log(insertResponse);
    } catch (error) {
      console.log(error);
    }
  };

  const [data, setData] = useState(false);

  return (
    <>
      <section className="mx-12 my-12">
        <div className="bg-white rounded-md  border border-black p-14 text-gray-950">
          <h1 className="text-gray-900 font-bold mx-auto  my-1 text-xl uppercase mb-2">
            Police Rating System
          </h1>
          <form className="text-black" onSubmit={handleSubmit}>
            {/* <div className="relative z-0 w-full mb-6 group ">
                    <label>Choose Station : </label>
                        <select name="province" id="province" form="province" className='bg-white'>
                            <option disabled selected value> -- select an option -- </option>
                            <option value="Wellawatte">Wellawatte</option>
                            <option value="Dehiwala">Dehiwala</option>
                            <option value="Pettah">Pettah</option>
                        </select>
                </div> */}
            <div className="relative z-0 w-full mb-6 group text-black mt-2 ">
              <label>Choose Station :</label>
              <select
                id="station"
                name="station"
                value={formData.station}
                onChange={handleChange}
              >
                <option value=""> --- select a station ---</option>
                <option value="Wellawatte">Wellawatte</option>
                <option value="Dehiwala">Dehiwala</option>
                <option value="Pettah">Pettah</option>
              </select>
            </div>
            <div></div>
            <div className="relative z-0 w-full mb-6 group ">
              <input
                type="text"
                name="officer_name"
                id="officer_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={formData.officer_name}
                onChange={handleChange}
              />
              <label
                htmlFor="officer_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                onChange={() => {}}
                value=""
              >
                Name of the officer
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group ">
              <input
                type="text"
                name="description"
                id="description"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={formData.description}
                onChange={handleChange}
              />
              <label
                htmlFor="port_number"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Description
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group ">
              <input
                type="number"
                name="badge_number"
                id="badge_number"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={formData.badge_number}
                onChange={handleChange}
              />
              <label
                htmlFor="port_number"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Badge Number
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group ">
              <input
                type="date"
                name="date"
                id="date"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={formData.date}
                onChange={handleChange}
              />
              <label
                htmlFor="port_number"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Date of the incident
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="comments"
                id="comments"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={formData.comments}
                onChange={handleChange}
              />
              <label
                htmlFor="comment"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Comments
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group cursor-pointer">
              <div className="badge badge-success m-[2px]">Friendly</div>
              <div className="badge badge-success m-[2px]">Assertive</div>
              <div className="badge badge-success m-[2px]">Well Mannered</div>
              <div className="badge badge-success m-[2px]">Faster Service</div>
              <div className="badge badge-success m-[2px]">Discipline</div>
              <div className="badge badge-success m-[2px]">Vivid Listener</div>
              <div className="badge badge-success m-[2px]">Cooperative</div>
              <div className="badge badge-success m-[2px]">Bold</div>
            </div>
            <div className="relative z-0 w-full mb-6 group cursor-pointer">
              <div className="badge badge-error m-[2px]">Misbehaved</div>
              <div className="badge badge-error m-[2px]">Rude</div>
              <div className="badge badge-error m-[2px]">Racist</div>
              <div className="badge badge-error m-[2px]">No obedience</div>
              <div className="badge badge-error m-[2px]">Ignorance</div>
              <div className="badge badge-error m-[2px]">Slow</div>
              <div className="badge badge-error m-[2px]">
                Doesn't know to talk
              </div>
              <div className="badge badge-error m-[2px]">
                Not available on anytime
              </div>
              <div className="badge badge-error m-[2px]">
                He doesn't give time for public
              </div>
            </div>

            {/* htmlFor was replaced from for */}
            <div className="flex">
              <p className="my-auto">Rating</p>
              <div className="rate">
                <input type="radio" id="star5" name="rae" value="5" />
                <label htmlFor="star5" title="text">
                  5 stars
                </label>
                <input type="radio" id="star4" name="rate" value="4" />
                <label htmlFor="star4" title="text">
                  4 stars
                </label>
                <input type="radio" id="star3" name="rate" value="3" />
                <label htmlFor="star3" title="text">
                  3 stars
                </label>
                <input type="radio" id="star2" name="rate" value="2" />
                <label htmlFor="star2" title="text">
                  2 stars
                </label>
                <input type="radio" id="star1" name="rate" value="1" />
                <label htmlFor="star1" title="text">
                  1 star
                </label>
              </div>
            </div>
            <div className="relative z-0 lg:w-full mb-6 groupflex justify-between gap-12">
              <button
                type="submit"
                onClick={() => setData(true)}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md  border border-black text-sm mx-auto w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2"
              >
                <AiOutlineSearch className="my-auto" />
                Rate{" "}
              </button>
            </div>
            {/* {
                        data && 
                        <>
                        <LicenseInfo />
                        <div className="relative z-0 lg:w-full mb-6 groupflex justify-between gap-12">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md  border border-black text-sm mx-auto w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2"><AiFillStar className='my-auto' />Rate</button>
                        </div>
                        </>
                    } */}
          </form>
        </div>
      </section>
    </>
  );
};

export default policeRatingSystem;
