import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const policeDashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {}, []);
  return (
    <section className="mx-5 pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 text-sm gap-2 font-black mt-12">
        {/* <Link to="/police/dashboard/addStation">
          <div className="grid flex-grow h-14 card bg-white rounded-md place-items-center border border-black">
            Add Station
          </div>
        </Link> */}
        <button onClick={() => navigate("/police/dashboard/addStation")}>
          <div className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase">
            Add Station
          </div>
        </button>
        {/* <Link to="/police/dashboard/addSTF">
          <div className="grid flex-grow h-14 card bg-white rounded-md place-items-center border border-black">
            Add STF Camp
          </div>
        </Link> */}
        <button onClick={() => navigate("/police/dashboard/addSTF")}>
          <div className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase">
            Add STF Camp
          </div>
        </button>
        {/* <Link to="/police/dashboard/addDesignation">
          <div className="grid flex-grow h-14 card bg-white rounded-md place-items-center border border-black">
            Add Designation
          </div>
        </Link> */}
        <button onClick={() => navigate("/police/dashboard/addDesignation")}>
          <div className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase">
            Add Designation
          </div>
        </button>
        {/* <Link to="/police/dashboard/addPoliceOfficer">
          <div className="grid flex-grow h-14 card bg-white rounded-md place-items-center border border-black">
            Add Police Officer
          </div>
        </Link> */}
        <button onClick={() => navigate("/police/dashboard/addPoliceOfficer")}>
          <div className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase">
            Add Police Officer
          </div>
        </button>
        {/* <Link to="/police/dashboard/assignPoliceOfficer">
          <div className="grid flex-grow h-14 card bg-white rounded-md place-items-center border border-black">
            Assign Police Officer
          </div>
        </Link> */}
        <button
          onClick={() => navigate("/police/dashboard/assignPoliceOfficer")}
        >
          <div className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase">
            Assign Police Officer
          </div>
        </button>
      </div>
    </section>
    // <section className="mx-12 my-12 text-black border">
    //   <div className="md:grid md:grid-cols-3 w-full lg:gap-4 flex flex-col gap-5">
    //     <Link to="/police/dashboard/addStation">
    //       <div className="grid flex-grow h-14 card bg-white rounded-md place-items-center border border-black">
    //         Add Station
    //       </div>
    //     </Link>
    //     <Link to="/police/dashboard/addSTF">
    //       <div className="grid flex-grow h-14 card bg-white rounded-md place-items-center border border-black">
    //         Add STF Camp
    //       </div>
    //     </Link>
    //     <Link to="/police/dashboard/addDesignation">
    //       <div className="grid flex-grow h-14 card bg-white rounded-md place-items-center border border-black">
    //         Add Designation
    //       </div>
    //     </Link>
    //     <Link to="/police/dashboard/addPoliceOfficer">
    //       <div className="grid flex-grow h-14 card bg-white rounded-md place-items-center border border-black">
    //         Add Police Officer
    //       </div>
    //     </Link>
    //     <Link to="/police/dashboard/assignPoliceOfficer">
    //       <div className="grid flex-grow h-14 card bg-white rounded-md place-items-center border border-black">
    //         Assign Police Officer
    //       </div>
    //     </Link>
    //   </div>
    // </section>
  );
};

export default policeDashboard;
