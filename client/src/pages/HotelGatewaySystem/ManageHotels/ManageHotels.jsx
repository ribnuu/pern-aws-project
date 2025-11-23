import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import {
  getAllHotelsApi,
  getHotelByIdApi,
  updateHotelByIdAPi,
} from "../../../apis/CccHotelGatewaySystemApiService";
import {
  loadData,
  resetState,
  setFormSliceFormData,
  updateFormSliceField,
} from "../../../store/form/FormSlice";
import HotelsList from "./HotelsList";
import ManageHotelsTabView from "./ManageHotelsTabView";
import CircularLoadingSvgOne from "../../../components/Svgs/CircularLoadingSvgOne";
import LISpinnerWithTextTwo from "../../../components/LoadingIndicators/LISpinnerWithTextTwo";

const ManageHotels = () => {
  const dispatch = useDispatch();
  const { searchTerm, selectedItemId, formData, changedFormData, loading } =
    useSelector((state) => state.formReducer);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingHotelById, setLoadingHotelById] = useState(false);

  const handleUpdateHotel = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      if (!selectedItemId) {
        toast.error("Please select a hotel to update");
        return;
      }

      if (Object.keys(changedFormData)?.length <= 0) {
        toast.error("You haven't made any changes");
        return;
      }
      const response = await updateHotelByIdAPi(
        selectedItemId,
        changedFormData
      );

      if (response && response.success) {
        toast.success("updated hotel sucessfully");
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
        apiFunction: getAllHotelsApi,
        attributes: ["name", "id"],
      })
    );
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingHotelById(true);
        const data = await getHotelByIdApi(selectedItemId);
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
      <div class="block md:hidden">
        {/* <!-- Mobile view section --> */}
        <section className="my-5">
          <div className="mx-5 mt-5 flex flex-col md:flex-row md:justify-between items-start gap-4">
            {/* First box for search and institution list */}
            <div
              className="w-full md:w-1/3 bg-white dark:bg-gray-800 p-5 rounded-md border border-black flex flex-col"
              style={{
                maxHeight: "500px", // Max height for the first box, after this it becomes scrollable
                overflowY: "auto", // Allow scrolling when content exceeds maxHeight
                flexGrow: 1, // Ensures it grows to fill available space
              }}
            >
              {/* Search Component */}
              <div className="relative w-full mb-4">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search institution"
                  value={searchTerm}
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
              <HotelsList />
            </div>

            {/* Second box for InstitutionCreateForm */}
            <div
              className="w-full md:w-2/3 bg-white dark:bg-gray-800 p-5 rounded-md border border-black flex flex-col"
              style={{
                flexGrow: 1, // Ensures it grows to fill available space
              }}
            >
              {loadingHotelById && <LISpinnerWithTextTwo />}

              {formData && formData?.id && !loadingHotelById && (
                <ManageHotelsTabView formData={formData} />
              )}
            </div>
          </div>
        </section>
      </div>

      <div class="hidden md:block">
        {/* <!-- Web view section --> */}
        <section className="my-5">
          <div className="mx-5 mt-5 flex flex-col md:flex-row md:justify-between items-start gap-4">
            {/* First box for search and institution list */}
            <div
              className="w-full md:w-1/3 bg-white dark:bg-gray-800 p-5 rounded-md border border-black flex flex-col flex-grow"
              style={{ maxHeight: "1300px", minHeight: "1300px" }}
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
              <HotelsList />
            </div>

            {/* Second box for InstitutionCreateForm */}
            <div
              className="w-full md:w-2/3 bg-white dark:bg-gray-800 p-5 rounded-md border border-black flex flex-col flex-grow"
              style={{ maxHeight: "1300px", minHeight: "1300px" }}
            >
              {loadingHotelById && <LISpinnerWithTextTwo />}

              {formData && formData?.id && !loadingHotelById && (
                <ManageHotelsTabView formData={formData} />
              )}
            </div>
          </div>
        </section>
      </div>

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

export default ManageHotels;
