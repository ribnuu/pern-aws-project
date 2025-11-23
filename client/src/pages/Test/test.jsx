import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { MaterialReactTable } from 'material-react-table';
import Map from '../../components/Map';
import GoogleMapTest from '../../components/GoogleMapTest';

const test = () => {

    const [renderedData , setRenderedData] = useState([])
  
    const fetchData = async () => {
      const response = await axios.get('http://localhost:4000/complaint/getAll');
      console.log(response.data)
      setRenderedData(response.data)
    }
  
    useEffect(() => {
      fetchData();
    } , [])

    const tableData = renderedData;

    

    
    const columns = useMemo(
        () => [
        {
            header: 'id',
            accessorKey: 'complaint_id', //simple accessorKey pointing to flat data
        },
        {
            header: 'Incident',
            accessorKey: 'incident', //simple accessorKey pointing to flat data
        },
        {
            header: 'Officer',
            accessorKey: 'officer_id', //simple accessorKey pointing to flat data
        },

        {
            header: 'Location',
            accessorKey: 'location', //simple accessorKey pointing to flat data
        },    ],
        [],
    );
    



  return (
    <section className='mx-12 my-12'>
        <div className=''>
            {/* <MaterialReactTable columns={columns} data={tableData} className='bg-black text-white' /> */}
        </div>
        <div>
            {/* <Map /> */}
            <GoogleMapTest />
        </div>

    </section>
  )
}

export default test
