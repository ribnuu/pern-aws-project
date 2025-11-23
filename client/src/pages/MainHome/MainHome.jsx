import React, { useEffect, useState } from "react";
import NullHome from "../../components/nullHome";
import Login from "../../components/Login";
import { useSelector } from "react-redux";
import EctfLandingPage from "./EctfLandingPage";

const MainHome = () => {
  // const uuid = useSelector((state) => state.authReducer.userId);

  // const [userid, setUserid] = useState(null);

  // useEffect(() => {
  //   const user_id = localStorage.getItem("user_id");
  //   setUserid(user_id);
  //   debugger;
  // }, []);

  // useEffect(() => {
  //   if (uuid && uuid !== "") {
  //     setUserid(localStorage.getItem("user_id"));
  //   } else {
  //     setUserid(null);
  //   }
  // }, [uuid]);

  const uuid = useSelector((state) => state.authReducer.userId);
  const [userid, setUserid] = useState(null);

  useEffect(() => {
    // Check local storage first, if not set, fallback to the reducer (uuid)
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserid(storedUserId);
    } else if (uuid) {
      setUserid(uuid); // If there's no local storage value, fallback to uuid from the reducer
    } else {
      setUserid(null); // Set to null if neither is found
    }
  }, [uuid]);

  if (userid) {
    return <PageWithLocalStorage />;
  } else {
    return <PageWithoutLocalStorage />;
  }
};

const PageWithLocalStorage = () => {
  return <NullHome />;
};

const PageWithoutLocalStorage = () => {
  // return <EctfLandingPage />;
  return <Login />;
};

export default MainHome;
