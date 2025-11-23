import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  customsRecieveCompanyCasesByNicApi,
  customsRecieveCustomsCompanyByNicApi,
  customsRecieveDeclarationsByNicApi,
  customsRecieveIndividualByNICApi,
  customsRecieveIndividualCasesByNicApi,
  customsRecieveIndividualCurrencyDeclaratonByNICApi,
  customsRecieveVehiclesByNicApi,
} from "../../../apis/CustomsApiService";

const CustomsDashboard = () => {
  const [customsIndividualData, setCustomsIndividualData] = useState([]);
  const [currencyDeclaration, setCurrencyDeclaration] = useState([]);
  const [individualCasesData, setindividualCasesData] = useState([]);
  const [vehiclesCustomsData, setVehiclesCustomsData] = useState([]);
  const [customsCompanyData, setCustomsCompanyData] = useState([]);
  const [companyCasesData, setCompanyCasesData] = useState([]);
  const [individualDeclaration, setIndividualDeclaration] = useState([]);

  const params = useParams();
  const nic_number = params.customsNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const individualImport = await customsRecieveIndividualByNICApi(
          nic_number
        );
        setCustomsIndividualData(individualImport.rows);
      } catch (error) {
        console.error(error);
      }
      try {
        const currencyDeclarationImport =
          await customsRecieveIndividualCurrencyDeclaratonByNICApi(nic_number);
        setCurrencyDeclaration(currencyDeclarationImport.rows);
      } catch (error) {
        console.error(error);
      }
      try {
        const individualDeclaration =
          customsRecieveDeclarationsByNicApi(nic_number);
        setIndividualDeclaration(individualDeclaration.rows);
      } catch (error) {
        console.error(error);
      }

      try {
        const individualCases = await customsRecieveIndividualCasesByNicApi(
          nic_number
        );
        setindividualCasesData(individualCases.rows);
      } catch (error) {
        console.error(error);
      }

      try {
        const vehicleCustomResponse = await customsRecieveVehiclesByNicApi(
          nic_number
        );
        setVehiclesCustomsData(vehicleCustomResponse.rows);
      } catch (error) {
        console.error(error);
      }
      try {
        const customCompanyResponse =
          await customsRecieveCustomsCompanyByNicApi(nic_number);
        setCustomsCompanyData(customCompanyResponse.rows);
      } catch (error) {
        console.error(error);
      }
      try {
        const customCompanyCasesResponse =
          await customsRecieveCompanyCasesByNicApi(nic_number);
        setCompanyCasesData(customCompanyCasesResponse.rows);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="mx-12 lg:my-12 my-8">
      {customsIndividualData && (
        <div>
          <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg">
            <div className="mx-auto my-auto text-2xl">
              Individual Import - {nic_number}
              <br />
              <span className="text-xs">Items imported under individuals</span>
            </div>
          </div>
          <div>
            {customsIndividualData && (
              <div className="grid lg:grid-cols-2 gap-4 my-4">
                {customsIndividualData.map((data, key) => {
                  return (
                    <div
                      className="bg-white text-black rounded-lg justify_center"
                      key={key}
                    >
                      <div className="flex flex-col px-2 py-6 rounded-b-lg">
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Quantity</div>
                          <div className="col-span-3">{data.quantity}</div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Date time</div>
                          <div className="col-span-3">{data.date_time}</div>
                        </div>

                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Goods</div>
                          <div className="col-span-3">{data.goods}</div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Estimated Worth</div>
                          <div className="col-span-3">
                            {data.estimated_worth}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Tax</div>
                          <div className="col-span-3">{data.tax}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {currencyDeclaration && (
        <div>
          <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg">
            <div className="mx-auto my-auto text-2xl">
              Currency Declaration - {nic_number}
              <br />
              <span className="text-xs">
                Currency brought in and out of the country after declaring on
                the passport
              </span>
            </div>
          </div>
          <div>
            {currencyDeclaration && (
              <div className="grid lg:grid-cols-2 gap-4 my-4">
                {currencyDeclaration.map((data, key) => {
                  return (
                    <div
                      className="bg-white text-black rounded-lg justify_center"
                      key={key}
                    >
                      <div className="flex flex-col px-2 py-6 rounded-b-lg">
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Currency type</div>
                          <div className="col-span-3">{data.currency_type}</div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Currency Value</div>
                          <div className="col-span-3">
                            {data.currency_value}
                          </div>
                        </div>

                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Date Time</div>
                          <div className="col-span-3">{data.datetime}</div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Travel bound</div>
                          <div className="col-span-3">{data.travel_bound}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {individualCasesData && (
        <div>
          <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg">
            <div className="mx-auto my-auto text-2xl">
              Customs Cases - {nic_number}
              <br />
              <span className="text-xs">
                Investiagtion or cases or raids against this individual
              </span>
            </div>
          </div>
          <div>
            {individualCasesData && (
              <div className="grid lg:grid-cols-2 gap-4 my-4">
                {individualCasesData.map((data, key) => {
                  return (
                    <div
                      className="bg-white text-black rounded-lg justify_center"
                      key={key}
                    >
                      <div className="flex flex-col px-2 py-6 rounded-b-lg">
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Case Number</div>
                          <div className="col-span-3">{data.case_number}</div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Case Details</div>
                          <div className="col-span-3">{data.case_details}</div>
                        </div>

                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Date Time</div>
                          <div className="col-span-3">{data.case_datetime}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {individualDeclaration && (
        <div>
          <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg">
            <div className="mx-auto my-auto text-2xl">
              Declaration - {nic_number}
              <br />
              <span className="text-xs">
                The goods that were detained and required declaration
              </span>
            </div>
          </div>
          <div>
            {individualDeclaration && (
              <div className="grid lg:grid-cols-2 gap-4 my-4">
                {individualDeclaration.map((data, key) => {
                  return (
                    <div
                      className="bg-white text-black rounded-lg justify_center"
                      key={key}
                    >
                      <div className="flex flex-col px-2 py-6 rounded-b-lg">
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Goods</div>
                          <div className="col-span-3">{data.goods}</div>
                        </div>

                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Quantity</div>
                          <div className="col-span-3">{data.quantity}</div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Est. Worth</div>
                          <div className="col-span-3">
                            {data.estimated_worth}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Tax</div>
                          <div className="col-span-3">{data.tax}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {vehiclesCustomsData && (
        <div>
          <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg">
            <div className="mx-auto my-auto text-2xl">
              Vehicle Number - {nic_number}
              <br />
              <span className="text-xs">
                Vehicles imported by this individual
              </span>
            </div>
          </div>
          <div>
            {vehiclesCustomsData && (
              <div className="grid lg:grid-cols-2 gap-4 my-4">
                {vehiclesCustomsData.map((data, key) => {
                  return (
                    <div
                      className="bg-white text-black rounded-lg justify_center"
                      key={key}
                    >
                      <div className="flex flex-col px-2 py-6 rounded-b-lg">
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Vehicle Model</div>
                          <div className="col-span-3">{data.vehicle_model}</div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Vehicle Make</div>
                          <div className="col-span-3">{data.vehicle_make}</div>
                        </div>

                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Date Time</div>
                          <div className="col-span-3">{data.date_time}</div>
                        </div>

                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Estimated Worth</div>
                          <div className="col-span-3">
                            {data.estimated_worth}
                          </div>
                        </div>

                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Tax</div>
                          <div className="col-span-3">{data.tax}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {customsCompanyData && (
        <div>
          <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg">
            <div className="mx-auto my-auto text-2xl">
              Company Import - {nic_number}
              <br />
              <span className="text-xs">
                Imported goods by the companies registered under customs
                <br />
              </span>
            </div>
          </div>
          <div>
            {customsCompanyData && (
              <div className="grid lg:grid-cols-2 gap-4 my-4">
                {customsCompanyData.map((data, key) => {
                  console.log(data);
                  return (
                    <div
                      className="bg-white text-black rounded-lg justify_center"
                      key={key}
                    >
                      <div className="flex flex-col px-2 py-6 rounded-b-lg">
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Company Number</div>
                          <div className="col-span-3">
                            {data.company_number}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Role</div>
                          <div className="col-span-3">{data.job_role}</div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Quantity</div>
                          <div className="col-span-3">{data.quantity}</div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Date time</div>
                          <div className="col-span-3">{data.date_time}</div>
                        </div>

                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Goods</div>
                          <div className="col-span-3">{data.goods}</div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Estimated Worth</div>
                          <div className="col-span-3">
                            {data.estimated_worth}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Tax</div>
                          <div className="col-span-3">{data.tax}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {companyCasesData && (
        <div>
          <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg">
            <div className="mx-auto my-auto text-2xl">
              Company Cases - {nic_number}
              <br />
              <span className="text-xs">
                INVESTIAGTION OR CASES OR RAIDS AGAINST THIS COMPANY
                <br />
              </span>
            </div>
          </div>
          <div>
            {companyCasesData && (
              <div className="grid lg:grid-cols-2 gap-4 my-4">
                {companyCasesData.map((data, key) => {
                  console.log(data);
                  return (
                    <div
                      className="bg-white text-black rounded-lg justify_center"
                      key={key}
                    >
                      <div className="flex flex-col px-2 py-6 rounded-b-lg">
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Company Number</div>
                          <div className="col-span-3">
                            {data.company_number}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Role</div>
                          <div className="col-span-3">{data.job_role}</div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Details</div>
                          <div className="col-span-3">{data.case_details}</div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Date time</div>
                          <div className="col-span-3">{data.case_datetime}</div>
                        </div>

                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Case Number</div>
                          <div className="col-span-3">{data.case_number}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default CustomsDashboard;
