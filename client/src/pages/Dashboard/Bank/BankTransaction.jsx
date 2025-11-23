import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;
import axios from "axios";

const BankTransaction = () => {
  const location = useLocation();
  const data = location.state;

  const [accountHolderData, setAccountHolderData] = useState("");

  const [statementData, setStatementData] = useState("");
  const [statement, setStatement] = useState();
  useEffect(() => {
    console.log(data);
    const fetchData = async () => {
      try {
        const statementResponse = await axios.post(
          `http://${server_port}:4000/api/banks/receiveByAccountNumber`,
          {
            data,
          }
        );
        console.log(statementResponse.data.rows);
        setStatementData(statementResponse.data.rows);
      } catch (error) {
        console.log(error);
      }

      try {
        const accountResponse = await axios.post(
          `http://${server_port}:4000/api/banks/receiveAccountDetailsByAccountNumber`,
          {
            data,
          }
        );
        console.log(accountResponse.data.rows);
        setAccountHolderData(accountResponse.data.rows);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <section className="mx-6 my-6">
        <div className="my-12 mx-6 bg-white py-4 rounded-lg text-black">
          {accountHolderData &&
            accountHolderData.map((data) => {
              return (
                <>
                  <div className="flex mx-2 justify-between">
                    <div className="flex gap-2">
                      <div>
                        <img
                          src={`http://localhost:4000${data.bank_image_logo}`}
                          className=" object-contain w-auto h-24"
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="text-lg">{data.bank_name}</div>
                        <div>{data.address}</div>
                        <div> + {data.phone_number}</div>
                      </div>
                    </div>
                    <div className="flex-col justify-items-end">
                      <div>CHECKING ACCOUNT STATEMENT</div>
                      <div>Page 1 of 1</div>
                    </div>
                  </div>
                  <div className="my-4 mx-2 flex flex-row justify-between">
                    <div className="flex flex-col">
                      <div>{data.customer_name}</div>
                    </div>
                    <div className="flex flex-row">
                      <div className="flex-col">
                        <div className="border-r-2 bg-red-200 border-white px-2">
                          Statement Period
                        </div>
                        <div className="border-l-2 border-white px-2">
                          2019-09-01 to 2019-09-31
                        </div>
                      </div>
                      <div className="flex-col">
                        <div className="border-r-2 bg-red-200 border-white px-2">
                          Account Number
                        </div>
                        <div className="border-l-2 border-white px-2">
                          {data.account_number}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}

          <div className="my-4 mx-2 grid grid-cols-8 gap-2 bg-red-200">
            <div className="border-2 border-white px-4 py-1">Date</div>
            <div className="border-2 border-white px-4 py-1 col-span-3">
              Description
            </div>
            <div className="border-2 border-white px-4 py-1">Ref.</div>
            <div className="border-2 border-white px-4 py-1">Withdrawals</div>
            <div className="border-2 border-white px-4 py-1">Deposits</div>
            <div className="border-2 border-white px-4 py-1">Balance</div>
          </div>
          {statementData &&
            statementData.map((data, key) => {
              return (
                <div className="my-4 mx-2 grid grid-cols-8 gap-2" key={key}>
                  <div className="border-2 border-white px-4 py-1">
                    {data.transaction_date}
                  </div>
                  <div className="border-2 border-white px-4 py-1 col-span-3">
                    {data.description}
                  </div>
                  <div className="border-2 border-white px-4 py-1">
                    {data.reference}
                  </div>
                  <div className="border-2 border-white px-4 py-1">
                    {data.withdrawal}
                  </div>
                  <div className="border-2 border-white px-4 py-1">
                    {data.deposit}
                  </div>
                  <div className="border-2 border-white px-4 py-1">
                    {data.balance}
                  </div>
                </div>
              );
            })}
          <div className="text-center">Page 1 of 1</div>
          <hr className="border-2 border-black mx-2 rounded-xl my-2" />
          <div className="text-center">
            This is a system generated statement
          </div>
        </div>
      </section>
    </>
  );
};

export default BankTransaction;
