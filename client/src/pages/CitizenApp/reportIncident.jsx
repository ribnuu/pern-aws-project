import React, { useEffect, useState } from 'react'
import { BiCurrentLocation } from 'react-icons/bi'
import { GrAdd } from 'react-icons/gr'

const reportIncident = () => {
  return (
    <section>
      <div className="mx-12 my-12 bg-white p-4 rounded-lg">
        <h1 className="text-gray-900 font-bold mx-auto my-1 text-xl uppercase">
          Report Incident
        </h1>
        <form onSubmit={() => {}}>
          <div className="relative z-0 w-full mb-6 group text-black mt-2 ">
            <label>Choose incident</label>
            <select
              name="province"
              id="province"
              form="province"
              className="bg-white px-2"
            >
              <option disabled selected value>
                {" "}
                -- select an incident --{" "}
              </option>
              <option value="">Missing Person</option>
              <option value="">Missing Vehicle</option>
              <option value="">Missing Devices</option>
              <option value="">Murder</option>
              <option value="">Theft</option>
              <option value="">Other</option>
            </select>
          </div>
          <div className="relative z-0 w-full mb-6 flex justify-stretch group">
            <div className="w-2/3">
              <input
                type="text"
                name="MAC"
                id="MAC"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="MAC"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                onChange={() => {}}
                value=""
              >
                Location
              </label>
            </div>
            <div className="text-black flex mx-auto my-auto gap-2 px-2 py-2 bg-gray-400 rounded-lg">
              <BiCurrentLocation className="my-auto" />
              <p className="">Auto detect location</p>
            </div>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="serial"
              id="serial"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="serial"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              onChange={() => {}}
              value=""
            >
              Vehicle involved(if any)
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="nickname"
              id="nickname"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="nickname"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              onChange={() => {}}
              value=""
            >
              People around (if any)
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="nickname"
              id="nickname"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="nickname"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              onChange={() => {}}
              value=""
            >
              Any officer (if any)
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group flex flex-col gap-2  text-black">
            <div className="flex gap-2">
              <label>Add Media</label>
              <input type="file" />
            </div>
            <div>
              Add any .pdf , .docx , .jpg , .png , .jpeg , .mp4 , .mp3
              <br />
              Add video , audio , photo and other files
            </div>
          </div>

          <div className="relative z-0 w-full mb-6 group text-black flex gap-4 text-xs">
            <input type="radio" id="Profile" name="access" value="Profile" />
            <label htmlFor="css">Complaint from me</label>
            <br />
            <input
              type="radio"
              id="Anonymous"
              name="access"
              value="Anonymous"
            />
            <label htmlFor="javascript">Anonymous complaint</label>
          </div>
          <div className="relative z-0 mx-auto w-48 mb-6 group flex justify-between gap-12">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2"
            >
              <GrAdd />
              Report Incident
            </button>
          </div>
        </form>
      </div>
      People can report anything anonymously to the police department
      <br /> so that they are not scared that their details will not go to the
      police department or to the criminal.
      <br />
      People are rewarded on crpyto currency for anonymously giving information
      to the police department
      <br /> about crimes or criminals Once the report Incident is clicked ,
      automatically acknowldegment is received on the notification section
      <br />
      <br />
      And it the citizen is scared of something that take place against them or
      scared to access a particular place of the road then from there app they
      can chose to share the location of the police department at their will and
      wish so if they do so that pattern is tracked so that those pattern are
      analyzed to see which are the area that people are not feeling safe so
      that region are can be taken into consideration to check whether there are
      people who don't feel safe or whether there are any goons on the way,
      there is no enough street lighting or there is no safety regards to
      animals
      <br />
      Sometimes stray dogs
      <br />
      Aggressive dogs
      <br />
      Dogs chasing the people
      <br />
      Dog bites
      <br />
      So, all those can be considered from the pattern where people are not
      feeling safe to go and use a particular area
    </section>
  );
}

export default reportIncident