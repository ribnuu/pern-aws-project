import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const StateBankAccount = () => {
  const navigate = useNavigate();

  const [accountData, setAccountData] = useState("");
  const [accountCount, setAccountCount] = useState(0);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [account_number, setAccountNumber] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accountNumber = event.target.elements.account_number.value;
    console.log(accountNumber, startDate, endDate);
    navigate("/bank/transaction-info/", {
      state: { startDate, endDate, accountNumber },
    });
  };

  const params = useParams();
  const nic_number = params.accountNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountResponse = await axios.post(
          `http://${server_port}:4000/api/state-banks/receiveByNic`,
          {
            nic_number,
          }
        );
        setAccountData(accountResponse.data.rows);
        setAccountCount(accountResponse.data.rowCount);
        console.log(accountResponse.data.rows);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="mx-12 lg:my-12 my-8">
      <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg">
        <div className="mx-auto my-auto text-2xl">STATE / BANKS ACCOUNTS</div>
        <p className="mx-4 text-right">
          <span className="text-5xl mx-2">{accountCount}</span>
          <span className="my-auto">accounts(s) maintained</span>
        </p>
      </div>
      {
        accountData && (
          <div className="grid gap-20">
            {accountData.map((data, key) => {
              return (
                <div className="bg-white my-2 text-black rounded-lg" key={key}>
                  <div className="flex gap-2 justify-between">
                    <div className="rounded-lg my-auto ">
                      <img
                        src={`http://localhost:4000/images/${data.bank_image_path}`}
                        className="lg:w-40 lg:h-48     w-24 h-32 object-cover -my-16 ml-4 rounded-lg"
                      />
                    </div>
                    <div className="my-4">
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-4">Name</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-7 ml-12">
                          {data.customer_name}
                        </div>
                      </div>
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-4">Account Number</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-7 ml-12">
                          {data.account_number}
                        </div>
                      </div>
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-4">Type</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-7 ml-12">
                          {data.account_type}
                        </div>
                      </div>
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-4">Bank</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-7 ml-12">
                          {data.bank_name}
                        </div>
                      </div>
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-4">Opening Date</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-7 ml-12">
                          {data.account_opening_date}
                        </div>
                      </div>
                    </div>
                    <div className="mx-16 my-auto">
                      <form onSubmit={handleSubmit}>
                        <div className="flex flex-col mx-auto gap-2">
                          <input
                            type="hidden"
                            name="account_number"
                            defaultValue={data.account_number}
                          />
                          <input
                            type="date"
                            name="start_date"
                            className="rounded-lg px-2 py-1 text-white"
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                          />
                          <input
                            type="date"
                            name="end_date"
                            className="rounded-lg px-2 py-1 text-white"
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                          />
                          <button
                            type="submit"
                            className="bg-blue-500 px-2 py-1 rounded-lg text-xs"
                          >
                            View Statement
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )

        // <div className=''>
        //     {
        //         accountData.map((data, key) => {
        //             const nicIdNumber = data.nic_number
        //             return (
        //                 <div className='bg-white text-gray-950 gap-12 p-2 flex rounded-lg my-12 text-xs lg:text-lg' key={key}>
        //                     <div className='grid grid-cols-2 lg:justify-between'>
        //                         <div className='rounded-lg my-auto '>
        //                             <img src={`http://localhost:4000/images/${data.bank_image_path}`} className='lg:w-48 lg:h-52     w-24 h-32 object-cover -my-16 ml-4 rounded-lg' />
        //                         </div>
        //                         <div className='mx-auto my-auto'>
        //
        //                             <div className='lg:grid lg:grid-cols-12'>
        //                                 <div className='lg:col-span-4'>
        //                                     Type
        //                                 </div>
        //                                 <div className='hidden lg:col-span-1'>|
        //                                 </div>
        //                                 <div className='lg:col-span-7 ml-12'>
        //                                     {
        //                                         data.account_type
        //                                     }
        //                                 </div>
        //                             </div>
        //                             <div className='lg:grid lg:grid-cols-12'>
        //                                 <div className='lg:col-span-4'>
        //                                     Balance
        //                                 </div>
        //                                 <div className='hidden lg:col-span-1'>|
        //                                 </div>
        //                                 <div className='lg:col-span-7 ml-12'>
        //                                     {
        //                                         data.balance
        //                                     }
        //                                 </div>
        //                             </div>
        //                             <div className='lg:grid lg:grid-cols-12'>
        //                                 <div className='lg:col-span-4'>
        //                                     Acc No
        //                                 </div>
        //                                 <div className='hidden lg:col-span-1'>|
        //                                 </div>
        //                                 <div className='lg:col-span-7 ml-12'>
        //                                     {
        //                                         data.account_number
        //                                     }
        //                                 </div>
        //                             </div>
        //                             <div className='lg:grid lg:grid-cols-12'>
        //                                 <div className='lg:col-span-4'>
        //                                     Bank Name
        //                                 </div>
        //                                 <div className='hidden lg:col-span-1'>|
        //                                 </div>
        //                                 <div className='lg:col-span-7 ml-12'>
        //                                     {
        //                                         data.bank_name
        //                                     }
        //                                 </div>
        //                             </div>
        //                             <div className='lg:grid lg:grid-cols-12'>
        //                                 <div className='lg:col-span-4'>
        //                                     Opening Date
        //                                 </div>
        //                                 <div className='hidden lg:col-span-1'>|
        //                                 </div>
        //                                 <div className='lg:col-span-7 ml-12'>
        //                                     {
        //                                         data.account_opening_date
        //                                     }
        //                                 </div>
        //                             </div>
        //                             <div className='lg:grid lg:grid-cols-12'>
        //                                 <div className='lg:col-span-4'>
        //                                     View
        //                                 </div>
        //                                 <div className='hidden lg:col-span-1'>|
        //                                 </div>
        //                                 <div className='lg:col-span-7 ml-12'>
        //                                     <Link to={`/bank/transaction-info/${data.account_number}`}>More</Link>

        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             )

        //         })
        //     }
        // </div>
      }
    </section>
  );
};

export default StateBankAccount;
