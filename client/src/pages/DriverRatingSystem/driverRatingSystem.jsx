import React from "react";
import { Link } from "react-router-dom";

const driverRatingSystem = () => {
  const data = [
    {
      numberPlate: "CAX - 4087",
      date: "28-03-2022",
      location: "Wellawatte Junction",
      rating: 4,
    },
    {
      numberPlate: "AAA - 9187",
      date: "14-09-2023",
      location: "Borella Junction",
      rating: 5,
    },
    {
      numberPlate: "BDC - 1124",
      date: "13-12-2022",
      location: "Dehiwala Junction",
      rating: 1,
    },
    {
      numberPlate: "CAB - 0871",
      date: "28-03-2022",
      location: "Pettah Junction",
      rating: 2,
    },
  ];
  return (
    <section className="mx-12 my-12">
      <form>
        <div className="relatie z-0 w-full mb-2 group bg-white text-black flex justify-around rounded-md  border border-black px-2 py-2">
          <div>
            <label>Choose District : </label>
            <select
              name="province"
              id="province"
              form="province"
              className="bg-white px-2"
            >
              <option disabled selected value>
                {" "}
                -- select a district --{" "}
              </option>
              <option value="Colombo">Colombo</option>
              <option value="Ratmalana">Ratmalana</option>
              <option value="Wattala">Wattala</option>
              <option value="Jaffna">Jaffna</option>
              <option value="Gampaha">Gampaha</option>
            </select>
          </div>
          <div>
            <label>Choose Province : </label>
            <select
              name="province"
              id="province"
              form="province"
              className="bg-white px-2"
            >
              <option disabled selected value>
                {" "}
                -- select a province --{" "}
              </option>
              <option value="Western">Western</option>
              <option value="Eastern">Eastern</option>
              <option value="Northern">Northern</option>
              <option value="Southern">Southern</option>
            </select>
          </div>
        </div>
        <div className="flex justify-center mb-4">
          <div className="relative z-0 mb-2 group">
            <input
              type="text"
              name="dbType"
              id=""
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange=""
              value=""
              required
            />
            <label
              htmlFor=""
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Number Plate
            </label>
          </div>
        </div>
        <div className="relative z-0 w-full justify-center group flex mb-4">
          <div>
            <label>Sort </label>
            <select
              name="province"
              id="province"
              form="province"
              className="bg-white px-2 text-black"
            >
              <option disabled selected value>
                {" "}
                -- select a sort --{" "}
              </option>
              <option value="Top">Top 10</option>
              <option value="Low">Low 10</option>
            </select>
          </div>
        </div>
      </form>

      <div className="grid grid-cols-2 gap-4">
        {data.map((data) => (
          <>
            <div className="bg-gray-200 p-4 text-black text-sm rounded-md  border border-black flex space-between gap-6">
              <div className="my-4">
                <h1>Driver Rating</h1>
                <div className="flex gap-2">
                  <div>Number plate :</div>
                  <div>{data.numberPlate}</div>
                </div>
                <div className="flex gap-2">
                  <div>Date :</div>
                  <div>{data.date}</div>
                </div>
                <div className="flex gap-2">
                  <div>Location :</div>
                  <div>{data.location}</div>
                </div>
                <div className="flex gap-2">
                  <div>Rating :</div>
                  <div className="my-auto">
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

                    {data.rating}
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </>
        ))}
      </div>
      <div className="my-12">
        If any number plate is reported more than once that is also reported
        here
      </div>
    </section>
  );
};

export default driverRatingSystem;
