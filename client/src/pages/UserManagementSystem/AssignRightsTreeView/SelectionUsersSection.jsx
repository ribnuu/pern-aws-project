import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetAssignRightsSliceField } from "../../../store/super-admin/AssignRightsSlice";
import { getUsersApi } from "../../../apis/RightsApiService";

const SelectionUsersSection = () => {
  const dispatch = useDispatch();
  const { queryForGroup, selectedUser, usersList, selectedOption } =
    useSelector((state) => state.assignRightsReducer);

  const getUsers = async () => {
    try {
      const userResponse = await getUsersApi();
      // setTestOne(GroupsResponse);
      if (userResponse.rowCount > 0) {
        dispatch(
          SetAssignRightsSliceField({
            field: "usersList",
            value: userResponse.rows,
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      getUsers();
    };
    fetchData();
    return () => {};
  }, [selectedOption, selectedUser]);

  return (
    <div className="bg-white rounded-lg shadow dark:border md:mt-0 w-full xl:p-0 dark:bg-gray-800 dark:border-white">
      <div className="items-center mx-2 mt-2">
        <input
          type="search"
          name="groupSearch"
          value={queryForGroup}
          onChange={(e) => {}}
          placeholder="Search Users ..."
          className="bg-white text-black rounded-md py-1 px-2 w-full"
        />
      </div>
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <div className="grid grid-cols-1">
          {usersList && (
            <div>
              {usersList.map((data, key) => {
                let highlight = "";
                if (selectedUser == data.user_id) {
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
                            field: "selectedUser",
                            value: data.user_id,
                          })
                        );
                      }}
                      className={`${highlight}`}
                    >
                      {data.username}
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

export default SelectionUsersSection;
