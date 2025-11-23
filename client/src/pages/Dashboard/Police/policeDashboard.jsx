import { Link } from "react-router-dom";

const PoliceHeadquarters = () => {
  return (
    <section className="mx-12 my-12 text-black">
      <div className="md:grid md:grid-cols-3 w-full lg:gap-4 flex flex-col gap-5">
        <div className="grid flex-grow h-14 card bg-white rounded-box place-items-center border border-black">
          <Link to="/police/dashboard/addStation" className="">
            Add Station{" "}
          </Link>
        </div>
        <div className="grid flex-grow h-14 card bg-white rounded-box place-items-center border border-black">
          <Link to="/police/dashboard/addSTF">Add STF Camp</Link>
        </div>
        <Link to="/police/dashboard/addDesignation">
          <div className="grid flex-grow h-14 card bg-white rounded-box place-items-center">
            Add Designation
          </div>
        </Link>
        <Link to="/police/dashboard/addPoliceOfficer">
          <div className="grid flex-grow h-14 card bg-white rounded-box place-items-center">
            Add Police Officer
          </div>
        </Link>
        <Link to="/police/dashboard/assignPoliceOfficer">
          <div className="grid flex-grow h-14 card bg-white rounded-box place-items-center">
            Assign Police Officer
          </div>
        </Link>
      </div>
    </section>
  );
};

export default PoliceHeadquarters;
