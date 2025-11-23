import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetAssignRightsSliceField } from "../../../store/super-admin/AssignRightsSlice";
import { getAllGroupsApi } from "../../../apis/RightsApiService";

const SelectionGroupsNewSection = () => {
  const dispatch = useDispatch();
  const { queryForGroupNew, groupsNewList, selectedGroupNew, selectedOption } =
    useSelector((state) => state.assignRightsReducer);

  const getGroups = async () => {
    try {
      const groupResponse = await getAllGroupsApi();
      if (groupResponse.rowCount > 0) {
        dispatch(
          SetAssignRightsSliceField({
            field: "groupsNewList",
            value: groupResponse.rows,
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      getGroups();
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
          value={queryForGroupNew}
          onChange={(e) => {}}
          placeholder="Search Group ..."
          className="bg-white text-black rounded-md py-1 px-2 w-full"
        />
      </div>
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <div className="grid grid-cols-1">
          {groupsNewList && (
            <div>
              {groupsNewList.map((data, key) => {
                let highlight = "";
                if (selectedGroupNew == data.user_group_id) {
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
                            field: "selectedGroupNew",
                            value: data.user_group_id,
                          })
                        );
                      }}
                      className={`${highlight}`}
                    >
                      {data.user_group_name}
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

export default SelectionGroupsNewSection;
