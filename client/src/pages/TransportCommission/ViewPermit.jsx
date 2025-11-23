import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const ViewPermit = () => {
  const [renderedData, setRenderedData] = useState([]);

  const fetchData = async () => {
    const response = await axios.post(
      `http://${server_port}:4000/api/transport-commission/getAll`
    );
    console.log(response.data);
    setRenderedData(response.data.rows);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const tableData = renderedData;

  const columns = useMemo(
    () => [
      {
        header: "id",
        accessorKey: "department_transport_commission_id",
        size: "20", //simple accessorKey pointing to flat data
      },
      {
        header: "Permit Start Date",
        accessorKey: "permit_start_date", //simple accessorKey pointing to flat data
      },
      {
        header: "Permit End Date",
        accessorKey: "permit_end_date", //simple accessorKey pointing to flat data
      },

      {
        header: "Routes Number",
        accessorKey: "routes_number", //simple accessorKey pointing to flat data
      },
      {
        header: "Routes Permit Number",
        accessorKey: "routes_permit_number", //simple accessorKey pointing to flat data
      },
      {
        header: "Routes Start",
        accessorKey: "routes_start", //simple accessorKey pointing to flat data
      },
      {
        header: "Routes End",
        accessorKey: "routes_end", //simple accessorKey pointing to flat data
      },
      {
        header: "Vehicle Number",
        accessorKey: "vehicle_number", //simple accessorKey pointing to flat data
      },
    ],
    []
  );

  return (
    <section className="">
      <div className="">
        <MaterialReactTable
          columns={columns}
          data={tableData}
          className="bg-black text-white text-3xl"
          muiTableBodyCellProps={{
            sx: {
              fontSize: "10px",
            },
          }}
        />
      </div>
      <div>{/* <Map /> */}</div>
    </section>
  );
};

export default ViewPermit;
