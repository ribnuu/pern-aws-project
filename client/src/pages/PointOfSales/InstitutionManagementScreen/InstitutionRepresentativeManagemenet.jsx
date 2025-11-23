import React, { useEffect } from "react";
// import { toggleStockCustomerInstitutionPersonIsDeletedStatusApi } from "../../../apis/POSStockCustomerInstitutionApiService";
import { useDispatch, useSelector } from "react-redux";
import {
  // RemoveUSerFromTheUSersList,
  SetCustomerInstitutionSliceField,
  UpdateRepInTheRepresentativesList,
} from "../../../store/point-of-sales/CustomerInstitutionSlice";
import { posGetStockCustomerPersonDataByMobileNumberApi } from "../../../apis/POSStockCustomerPersonApiService";

const InstitutionRepresentativeManagemenet = ({
  companyData,
  usersData = [],
}) => {
  const dispatch = useDispatch();

  const { representatives } = useSelector(
    (state) => state.customerInstitutionReducer
  );

  useEffect(() => {
    if (usersData.length > 0) {
      dispatch(
        SetCustomerInstitutionSliceField({
          field: "representatives",
          value: [
            ...usersData,
            {
              id: Date.now(),
              name: "",
              address: "",
              mobile_number: "",
              isEdited: true,
            },
          ], // Initialize with an empty customer
        })
      );
    } else {
      if (companyData && companyData.id) {
        dispatch(
          SetCustomerInstitutionSliceField({
            field: "representatives",
            value: [
              {
                id: Date.now(),
                name: "",
                address: "",
                mobile_number: "",
                isEdited: true,
              },
            ], // Initialize with an empty customer
          })
        );
      }
    }
  }, [usersData]);

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    dispatch(
      UpdateRepInTheRepresentativesList({ id: id, field: name, value: value })
    );
  };

  const handleRemoveUser = async (id) => {
    try {
      const matchingUser = representatives.find((user) => user.id === id);
      dispatch(
        UpdateRepInTheRepresentativesList({
          id: id,
          field: "is_deleted",
          value: !matchingUser.is_deleted,
        })
      );
    } catch (error) {}
  };

  return (
    <section className="mx-5 bg-gray-50 my-6 rounded-md dark:bg-gray-900 border border-black">
      <div className="mx-5 my-5">
        <h3 className="text-xl font-semibold m-5">Add/Edit Representative</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mobile Number
              </th>
              <th className="px-6 py-3 bg-gray-50"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {representatives.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={(e) => handleChange(e, user.id)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    name="address"
                    value={user.address}
                    onChange={(e) => handleChange(e, user.id)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    name="mobile_number"
                    value={user.mobile_number}
                    // onChange={(e) => handleChange(e, user.id)}
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={async (e) => {
                      e.preventDefault();
                      //
                      handleChange(e, user.id);
                      if (e.target.value.length >= 9) {
                        try {
                          const resp =
                            await posGetStockCustomerPersonDataByMobileNumberApi(
                              e.target.value
                            );
                          if (resp && resp.success) {
                            //
                            dispatch(
                              UpdateRepInTheRepresentativesList({
                                id: user.id,
                                field: "name",
                                value: resp?.data?.name ? resp.data.name : "",
                              })
                            );
                            dispatch(
                              UpdateRepInTheRepresentativesList({
                                id: user.id,
                                field: "address",
                                value: resp?.data?.address
                                  ? resp.data.address
                                  : "",
                              })
                            );
                          }
                        } catch (error) {
                          console.log(error);
                        }
                      }
                    }}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleRemoveUser(user.id)}
                    // className="text-red-600 hover:text-red-900"
                    className={`${
                      user.is_deleted ? "text-green-600" : "text-red-600"
                    } hover:text-red-900`}
                  >
                    {user.is_deleted ? "Activate" : "Remove"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default InstitutionRepresentativeManagemenet;
