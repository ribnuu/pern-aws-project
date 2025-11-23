import React, { useEffect } from "react";
import { toggleStockCustomerInstitutionPersonIsDeletedStatusApi } from "../../../apis/POSStockCustomerInstitutionApiService";
import { useDispatch, useSelector } from "react-redux";
import {
  RemoveUSerFromTheUSersList,
  SetCustomerInstitutionSliceField,
  UpdateUserInTheUsersList,
} from "../../../store/point-of-sales/CustomerInstitutionSlice";
import { posGetStockCustomerPersonDataByMobileNumberApi } from "../../../apis/POSStockCustomerPersonApiService";

const InstitutionCustomerPersonTable = ({ companyData, usersData = [] }) => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.customerInstitutionReducer);

  useEffect(() => {
    if (usersData.length > 0) {
      dispatch(
        SetCustomerInstitutionSliceField({
          field: "users",
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
            field: "users",
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
    dispatch(UpdateUserInTheUsersList({ id: id, field: name, value: value }));
  };

  const handleRemoveUser = async (id) => {
    // dispatch(RemoveUSerFromTheUSersList(id));
    try {
      const matchingUser = users.find((user) => user.id === id);
      await toggleStockCustomerInstitutionPersonIsDeletedStatusApi(
        companyData.id,
        id
      );
      dispatch(
        UpdateUserInTheUsersList({
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
        <h3 className="text-xl font-semibold m-5">Add/Edit Staff</h3>
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
            {users.map((user) => (
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
                    onChange={async (e) => {
                      handleChange(e, user.id);
                      if (e.target.value.length >= 9) {
                        const resp =
                          await posGetStockCustomerPersonDataByMobileNumberApi(
                            e.target.value
                          );
                        if (resp && resp.success) {
                          // user.mobile_number = "12312";
                          dispatch(
                            UpdateUserInTheUsersList({
                              id: user.id,
                              field: "name",
                              value: resp?.data?.name ? resp.data.name : "",
                            })
                          );
                          dispatch(
                            UpdateUserInTheUsersList({
                              id: user.id,
                              field: "address",
                              value: resp?.data?.address
                                ? resp.data.address
                                : "",
                            })
                          );
                        }
                      }
                    }}
                    className="w-full p-2 border border-gray-300 rounded"
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
        {/* <div className="mt-4 flex justify-end">
        <button
          onClick={handleSaveUsers}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          Save All
        </button>
      </div> */}
      </div>
    </section>
  );
};

export default InstitutionCustomerPersonTable;
