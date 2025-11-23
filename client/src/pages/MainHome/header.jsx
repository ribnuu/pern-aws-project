import React from "react";
import logo from "/logo.jpg";

const Header = () => {
  return (
    <>
      <nav className="flex justify-between items-center px-8 py-4">
        {/* <div className="text-xl font-bold">Elite Cyber Task Force</div> */}
        <img
          src={logo}
          className="w-20 border border-red-500 rounded-md p-3 my-4"
        />
        <div>
          <a href="/login" className="text-gray-300 hover:text-white px-4">
            Home
          </a>
          <a href="#" className="text-gray-300 hover:text-white px-4">
            Services
          </a>
          <a href="#" className="text-gray-300 hover:text-white px-4">
            About Us
          </a>
          <a href="#" className="text-gray-300 hover:text-white px-4">
            Contact
          </a>
        </div>
      </nav>
    </>
  );
};

export default Header;
