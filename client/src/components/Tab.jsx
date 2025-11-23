import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Tab = ({ nicTabUpdate, nicNumber, passportTabUpdate, passportNumber, licenseTabUpdate, licenseNumber }) => {

  const [bgColor, setBgColor] = useState("bg-green-500");
  const [nicNumberToNavigate, setNicNumberToNavigate] = useState('')
  const [passportNumberToNavigate, setPassportNumberToNavigate] = useState('')

  // if (nicNumber) {
  //   setNicNumberToNavigate(nicNumber);
  // }

  // if (passportNumber) {
  //   setPassportNumberToNavigate(passportNumber)
  // }

  // run an if check if we have data returned or not
  useEffect(() => {

    const interval = setInterval(() => {
      setBgColor((prevColor) => {
        return prevColor === "bg-green-500" ? "bg-blue-500" : "bg-green-500";
      });
    }, 500);

    return () => clearInterval(interval);
  }, [nicTabUpdate]);


  return (
    <div><div className='bg-white flex flex-wrap text-gray-950 p-2 gap-2 rounded-lg'>
      <Link to='/police/police-dashboard' className='w-min px-1 border-2 border-gray-950 rounded-md'>Police</Link>
      <div className='w-min px-1 border-2 border-gray-950 rounded-md'>Immigration</div>
      <div className='w-min px-1 border-2 border-gray-950 rounded-md'>Ministry</div>
      <div className='w-min px-1 border-2 border-gray-950 rounded-md'>Examination</div>
      {
        !nicTabUpdate &&
        <div className='w-min px-1 border-2 border-gray-950 rounded-md'>NIC</div>
      }
      {
        nicTabUpdate &&
        <Link to={`/nic/nic-info/${nicNumber}`} className={`w-min px-1 border-2 border-gray-950 rounded-md ${bgColor}`}>NIC</Link>
      }
      {
        !passportTabUpdate &&
        <div className='w-min px-1 border-2 border-gray-950 rounded-md'>Passport</div>
      }
      {
        passportTabUpdate &&
        <Link to={`/passport/passport-info/${passportNumber}`} className={`w-min px-1 border-2 border-gray-950 rounded-md ${bgColor}`}>PASSPORT</Link>
      }
      {
        !licenseTabUpdate &&
        <div className='w-min px-1 border-2 border-gray-950 rounded-md'>License</div>
      }
      {
        licenseTabUpdate &&
        <Link to={`/license/license-info/${licenseNumber}`} className={`w-min px-1 border-2 border-gray-950 rounded-md ${bgColor}`}>LICENSE</Link>
      }
      <Link to='/ccc' className='w-min px-1 border-2 border-gray-950 rounded-md'>CCC</Link>
    </div>
    </div>
  )
}

export default Tab