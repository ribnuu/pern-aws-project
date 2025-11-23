import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import {
  HandleChangeFormData,
  loadData,
  resetState,
  setFormSliceFormData,
  updateFormSliceField,
} from "../../../store/form/FormSlice";
import CircularLoadingSvgOne from "../../../components/Svgs/CircularLoadingSvgOne";
import LISpinnerWithTextTwo from "../../../components/LoadingIndicators/LISpinnerWithTextTwo";
import HouseHolders from "./HouseHolders";
import ManageHouseHoldersTabView from "./ManageHouseHoldersTabView";
import {
  getAllHouseHoldersApi,
  getHouseHoldersDataByHouseHolderIdApi,
  updateHouseHoldersDataByHouseHolderIdApi,
} from "../../../apis/HouseHoldersApiService";

const ManageHouseHoldersList = () => {
  const dispatch = useDispatch();
  const { searchTerm, selectedItemId, formData, changedFormData, loading } =
    useSelector((state) => state.formReducer);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingHotelById, setLoadingHotelById] = useState(false);

  const handleUpdateHotel = async (e) => {
    // return;
    e.preventDefault();

    //update house as a not verified

    dispatch(HandleChangeFormData({ key: "confirmed", value: false }));

    try {
      console.log(JSON.stringify(changedFormData, null, 2));
      setIsLoading(true);

      //  console.log(formData.find(item => item. === selectedItemId));

      if (!selectedItemId) {
        toast.error("Please select a hotel to update");
        return;
      }

      if (Object.keys(changedFormData)?.length <= 0) {
        toast.error("You haven't made any changes");
        return;
      }
      const response = await updateHouseHoldersDataByHouseHolderIdApi(
        selectedItemId,
        changedFormData
      );

      if (response && response.success) {
        toast.success("updated house sucessfully");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(
      loadData({
        apiFunction: getAllHouseHoldersApi,
        attributes: [
          "id",
          "street_address",
          "address_line_2",
          "province_id",
          "confirmed",
        ],
      })
    );
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingHotelById(true);
        const data = await getHouseHoldersDataByHouseHolderIdApi(
          selectedItemId
        );
        if (data && data?.success) {
          dispatch(setFormSliceFormData(data.data));
        }
      } catch (error) {
      } finally {
        setLoadingHotelById(false);
      }
    };
    if (selectedItemId) {
      fetchData();
    }
  }, [selectedItemId]);

  return (
    <>
      <section className="my-5">
        <div className="mx-5 mt-5 flex flex-col md:flex-row md:justify-between items-start gap-4">
          {/* First box for search and institution list */}
          <div
            className="w-full md:w-1/5 bg-white dark:bg-gray-800 p-5 rounded-md border border-black flex flex-col flex-grow"
            style={{ maxHeight: "2000px", minHeight: "2000px" }}
          >
            {/* Search Component */}
            <div className="relative w-full mb-4">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search institution"
                value={searchTerm}
                // onChange={(e) => dispatch(updateSearchTerm(e.target.value))}
                onChange={(e) =>
                  dispatch(
                    updateFormSliceField({
                      field: "searchTerm",
                      value: e.target.value,
                    })
                  )
                }
                className="w-full pl-10 pr-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* List of Hotels */}
            <HouseHolders />
          </div>

          {/* Second box for InstitutionCreateForm */}
          <div
            className="w-full md:w-4/5 bg-white dark:bg-gray-800 p-5 rounded-md border border-black flex flex-col flex-grow"
            style={{ maxHeight: "2000px", minHeight: "2000px" }}
          >
            {loadingHotelById && <LISpinnerWithTextTwo />}

            {formData && formData?.id && !loadingHotelById && (
              <ManageHouseHoldersTabView formData={formData} />
            )}
          </div>
        </div>
      </section>

      {formData && formData?.id && (
        <div className="mx-5">
          <button
            onClick={handleUpdateHotel}
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-200"
          >
            {isLoading && <CircularLoadingSvgOne />}
            {isLoading ? "Updating..." : "Update"}
          </button>
        </div>
      )}

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default ManageHouseHoldersList;
