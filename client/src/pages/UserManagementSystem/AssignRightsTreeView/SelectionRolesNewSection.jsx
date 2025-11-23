import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetAssignRightsSliceField } from "../../../store/super-admin/AssignRightsSlice";
import { getAllRolesApi } from "../../../apis/RightsApiService";

const SelectionRolesNewSection = () => {
  const dispatch = useDispatch();
  const { queryForRoleNew, selectedRoleNew, rolesNewList, selectedOption } =
    useSelector((state) => state.assignRightsReducer);

  const getRoles = async () => {
    try {
      const rolesResponse = await getAllRolesApi();
      if (rolesResponse.rowCount > 0) {
        dispatch(
          SetAssignRightsSliceField({
            field: "rolesNewList",
            value: rolesResponse.rows,
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      getRoles();
    };
    fetchData();
    return () => {};
  }, [selectedOption]);

  return (
    <div className="bg-white rounded-lg shadow dark:border md:mt-0 w-full xl:p-0 dark:bg-gray-800 dark:border-white">
      <div className="items-center mx-2 mt-2">
        <input
          type="search"
          name="groupSearch"
          value={queryForRoleNew}
          onChange={(e) => {}}
          placeholder="Search Roles ..."
          className="bg-white text-black rounded-md py-1 px-2 w-full"
        />
      </div>
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <div className="grid grid-cols-1">
          {rolesNewList && (
            <div>
              {rolesNewList.map((data, key) => {
                let highlight = "";
                if (selectedRoleNew == data.user_role_id) {
                  highlight = "text-green-500";
                } else {
                  highlight = "";
                }
                return (
                  <div key={key}>
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(
                          SetAssignRightsSliceField({
                            field: "selectedRoleNew",
                            value: data.user_role_id,
                          })
                        );
                      }}
                      className={`${highlight}`}
                    >
                      {data.user_role_name}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectionRolesNewSection;
