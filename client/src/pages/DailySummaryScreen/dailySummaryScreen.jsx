import React, { useState } from "react";
import PoliceDetails from "../../components/policeDetails";
import { Link } from "react-router-dom";

const dailySummaryScreen = () => {
  const [selectActive, setSelectActive] = useState(false);
  const [district, setDistrict] = useState(false);
  const [division, setDivision] = useState(false);
  const [policeDetails, setPoliceDetails] = useState(false);

  const [updates, setUpdates] = useState(false);

  return (
    <section className="mx-12 my-12">
      <div className=" grid grid-cols-1 lg:grid lg:grid-cols-3 xl:grid-cols-4 md:text-xs gap-2 text-sm font-black mt-12 uppercase">
        <div className="bg-white text-gray-950 rounded-md  border border-black px-8 py-2">
          <Link to="">Police Complaints</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-md  border border-black px-8 py-2">
          <Link to="">Staff Attendance</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-md  border border-black px-8 py-2">
          <Link to="">Police Vehicles</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-md  border border-black px-8 py-2">
          <Link to="">Staff Sickness</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-md  border border-black px-8 py-2">
          <Link to="">Staff Duty Locations</Link>
        </div>
      </div>
      <div className="my-4">
        Each province under one sdig
        <br />
        <br />
        For example Central Province has 2 districts Kandy and Nuwareliya
        <br />
        <br />
        Kandy Districts has 4 divisions
        <br />
        Matale Kandy Deldeniya Gampola
        <br />
        <br />
        Kandy subdivision has 4 sub divisions
        <br />
        Sub1 sub2 sub3 sub4
      </div>
      <div>
        STATION OIC VIEW,TRAFFIC DIG VIEW,DISTRICT DIG VIEW,PROVINCE SDG VIEW,
        IGP VIEW, DIG or all superior staff can see who is on duty where
        <br />
        <br />
      </div>
      <div className=" my-12 bg-white p-4 rounded-md  border border-black text-black">
        <h1 className="text-gray-900 font-bold mx-auto  my-1 text-xl uppercase">
          DSS - Daily Summary Screen
        </h1>
        <div className="grid grid-cols-3 gap-4">
          <div
            className="bg-white text-gray-950 rounded-md  border border-black px-8 py-4"
            onClick={() => {
              setSelectActive(!selectActive);
            }}
          >
            Stations under me
          </div>
          <div
            className="bg-white text-gray-950 rounded-md  border border-black px-8 py-4"
            onClick={() => {
              setUpdates(!updates);
            }}
          >
            Daily Updates
          </div>
          <div
            className="bg-white text-gray-950 rounded-md  border border-black px-8 py-4"
            onClick={() => setPoliceDetails(!policeDetails)}
          >
            Police Officer Rating
          </div>
        </div>
        {selectActive && (
          <div className="my-12">
            {selectActive && (
              <div className="flex">
                <form>
                  <label>Choose a province:</label>
                  <select
                    name="province"
                    id="province"
                    form="province"
                    onChange={() => {
                      setDistrict(true);
                    }}
                  >
                    <option disabled selected value>
                      {" "}
                      -- select an option --{" "}
                    </option>
                    <option value="Western">Western</option>
                    <option value="Southern">Southern</option>
                    <option value="Central">Central</option>
                    <option value="Eastern">Eastern</option>
                    <option value="Northern">Northern</option>
                    <option value="Uva">Uva</option>
                  </select>
                </form>
              </div>
            )}

            {district && (
              <div className="flex">
                <form>
                  <label>Choose a district:</label>
                  <select
                    name="cars"
                    id="cars"
                    form="carform"
                    onClick={() => {
                      setDivision(true);
                    }}
                  >
                    <option value="Western">Colombo</option>
                    <option value="Southern">Kandy</option>
                    <option value="Central">Galle</option>
                    <option value="Eastern">Matara</option>
                    <option value="Northern">Jaffna</option>
                    <option value="Uva">Trinco</option>
                  </select>
                </form>
              </div>
            )}
            {division && (
              <div className="flex">
                <form>
                  <label>Choose a division:</label>
                  <select
                    name="cars"
                    id="cars"
                    form="carform"
                    onChange={() => {
                      setDivision(true);
                    }}
                  >
                    <option disabled selected value>
                      {" "}
                      -- select an option --{" "}
                    </option>
                    <option value="Dehiwala">Dehiwala</option>
                    <option value="Wellawatte">Wellawatte</option>
                    <option value="Bambalapitiya">Bambalapitiya</option>
                    <option value="Mount">Mount Lavinia</option>
                  </select>
                </form>
              </div>
            )}
          </div>
        )}
        {policeDetails && <PoliceDetails />}
        {updates && (
          <div className="bg-white text-gray-950  ">
            <div className=" grid grid-cols-1 lg:grid lg:grid-cols-4 gap-4 text-sm font-black py-12">
              <div className="flex justify-between   rounded-md  border border-black px-8 py-4">
                <div>Wanted</div>
                <div className="text-green-500 text-lg">3</div>
              </div>
              <div className="flex justify-between   rounded-md  border border-black px-8 py-4">
                <div>Wanted</div>
                <div className="text-green-500 text-lg">3</div>
              </div>
              <div className="flex justify-between   rounded-md  border border-black px-8 py-4">
                <div>Missing</div>
                <div className="text-green-500 text-lg">1</div>
              </div>
              <div className="flex justify-between   rounded-md  border border-black px-8 py-4">
                <div>Robberies</div>
                <div className="text-green-500 text-lg">2</div>
              </div>
              <div className="flex justify-between   rounded-md  border border-black px-8 py-4">
                <div>Murder</div>
                <div className="text-green-500 text-lg">0</div>
              </div>
              <div className="flex justify-between   rounded-md  border border-black px-8 py-4">
                <div>Assault</div>
                <div className="text-green-500 text-lg">5</div>
              </div>
              <div className="flex justify-between   rounded-md  border border-black px-8 py-4">
                <div>Drugs</div>
                <div className="text-green-500 text-lg">4</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default dailySummaryScreen;
