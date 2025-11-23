import axios from "axios";
import React, { useEffect, useState } from "react";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const LinksNavbar = () => {
  const [message, setmessage] = useState(
    "React server is not communicating with node server"
  );
  const [log, setLog] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const etfResponse = await axios.get(`http://${server_port}:4000/new`);
        setmessage(etfResponse.data.msg);
        setLog(etfResponse.data.toString());
      } catch (error) {
        console.error(error);
        setLog(error.toString());
      }
    };

    fetchData();
  }, []);
  // return <div className="mx-12 my-12">{message}</div>;
  return (
    <>
      <div className="mx-12 my-12">{message}</div>
      <div className="mx-12 my-12">{log}</div>
      <div className="mx-12 my-12">{server_port}</div>
    </>
  );
};

export default LinksNavbar;
