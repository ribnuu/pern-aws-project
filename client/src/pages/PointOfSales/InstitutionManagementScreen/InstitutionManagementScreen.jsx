import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import CircularLoadingSvgOne from "../../../components/Svgs/CircularLoadingSvgOne";
import InstitutionCreateForm from "./InstitutionCreateForm";
import {
  createOrUpdateListOfPersonsInCustomerInstitutionApi,
  createStockCustomerInstitutionApi,
  getAllCustomerPersonsByCustomerInstituionId,
  getAllStockCustomerInstitutions,
  getStockCustomerInstitutionLogoByInstitutionIdApi,
  updateStockCustomerInstitutionApi,
} from "../../../apis/POSStockCustomerInstitutionApiService";
import InstitutionCustomerPersonTable from "./InstitutionCustomerPersonTable";
import { useDispatch, useSelector } from "react-redux";
import InstitutionRepresentativeManagemenet from "./InstitutionRepresentativeManagemenet";
import {
  createOrUpdateListOfRepresentatiesInInstitutionApi,
  getAllRepresentativesByInstitutionId,
} from "../../../apis/POSRepresentativesApiService";
import { useLocation } from "react-router-dom";
import { getStockCustomerInstitutionByInsId } from "../../../apis/POSStockCustomerPersonApiService";
import { SetCustomerInstitutionSliceField } from "../../../store/point-of-sales/CustomerInstitutionSlice";
import InstitutionsList from "./InstitutionsList";
import LISpinnerWithTextTwo from "../../../components/LoadingIndicators/LISpinnerWithTextTwo";
import { FaSearch } from "react-icons/fa";

const InstitutionManagementScreen = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { users, representatives, searchTermForInstitutions } = useSelector(
    (state) => state.customerInstitutionReducer
  );

  const selectedInstitutionId = useSelector(
    (state) => state.customerInstitutionReducer.institutionId
  );

  const institutionId = location?.state?.institutionId || selectedInstitutionId;

  const initialState = {
    name: "",
    // address: "",
    phone_1: "",
    phone_2: "",
    mobile_number: "",
    email: "",
    web: "",
    companyLogo: "",
    location_url: "",
    latitude: "",
    longitude: "",
    // representative_id: "",
    // addressdata
    street_address: "",
    address_line_2: "",
    city_id: null,
    city: "",
    district_id: null,
    district: "",
    province_id: null,
    province: "",
    postal_code: "",
    country: "Sri Lanka",
    is_active: true,
    active_status_change_reason: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [usersInTheCompany, setUsersInTheCompany] = useState([]);
  const [repsInTheCompany, setRepsInTheCompany] = useState([]);
  const [isLoadingInsById, setIsLoadingInsById] = useState(false);

  const handleSaveUsers = async () => {
    const editedUsers = users.filter((user) => user.isEdited);
    const validUsers = editedUsers.filter(
      (user) => user.name && user.address && user.mobile_number
    );
    try {
      await createOrUpdateListOfPersonsInCustomerInstitutionApi(
        formData.id,
        validUsers
      );
      console.log("Edited and valid users to save:", validUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveReps = async () => {
    const editedReps = representatives.filter((rep) => rep.isEdited);
    const validReps = editedReps.filter(
      (rep) => rep.name && rep.address && rep.mobile_number
    );
    try {
      await createOrUpdateListOfRepresentatiesInInstitutionApi(
        formData.id,
        validReps
      );
      console.log("Edited and valid reps to save:", validReps);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateInstitution = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await createStockCustomerInstitutionApi({
        ...formData,
        // name: searchTerm,
      });

      if (response && response.success) {
        toast.success("Created new institution sucessfully");
        setFormData(initialState);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateInstitution = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (!formData.country) {
        toast.error("Input country");
        return;
      }
      const response = await updateStockCustomerInstitutionApi({
        ...formData,
        representatives,
      });
      await handleSaveUsers();
      await handleSaveReps();

      if (response && response.success) {
        toast.success("updated institution sucessfully");
        setFormData(initialState);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormDataChange = (newFormData) => {
    setFormData(newFormData);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (formData.id) {
        try {
          setIsLoadingInsById(true);
          const response = await getAllCustomerPersonsByCustomerInstituionId(
            formData.id
          );
          if (response?.success && response?.data) {
            setUsersInTheCompany(response.data.rows);
          } else {
            setUsersInTheCompany([]);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoadingInsById(false);
        }
      }
    };

    fetchData();
  }, [formData.id]);

  useEffect(() => {
    const fetchData = async () => {
      if (formData.id) {
        try {
          const response = await getAllRepresentativesByInstitutionId(
            formData.id
          );
          if (response?.success && response?.data) {
            setRepsInTheCompany(response.data.rows);
          } else {
            setRepsInTheCompany([]);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [formData.id]);

  useEffect(() => {
    const fetchData = async () => {
      if (formData.id) {
        try {
          const response =
            await getStockCustomerInstitutionLogoByInstitutionIdApi(
              formData.id
            );
          if (response && response.success) {
            setFormData((prevFormData) => ({
              ...prevFormData,
              companyLogo: response.data,
            }));
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [formData.id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingInsById(true);

        const response = await getStockCustomerInstitutionByInsId(
          institutionId,
          true
        );
        if (response && response.success) {
          setFormData({
            ...formData,
            ...response.data,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingInsById(false);
      }
    };

    fetchData();
  }, [institutionId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllStockCustomerInstitutions("id,name", "");
        if (response.success && response.data) {
          dispatch(
            SetCustomerInstitutionSliceField({
              field: "institutions",
              value: response.data, // Initialize with an empty customer
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="my-5">
        <div className="mx-5 mt-5 flex flex-col md:flex-row md:justify-between items-start gap-4">
          {/* First box for search and institution list */}
          <div
            className="w-full md:w-1/3 bg-white dark:bg-gray-800 p-5 rounded-md border border-black flex flex-col flex-grow"
            style={{ maxHeight: "2000px", minHeight: "2000px" }}
          >
            {/* Search Component */}
            <div className="relative w-full mb-4">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search institution"
                value={searchTermForInstitutions}
                onChange={(e) =>
                  dispatch(
                    SetCustomerInstitutionSliceField({
                      field: "searchTermForInstitutions",
                      value: e.target.value,
                    })
                  )
                }
                className="w-full pl-10 pr-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* List of Institutions */}
            <InstitutionsList />
          </div>

          {/* Second box for InstitutionCreateForm */}
          <div
            className="w-full md:w-2/3 bg-white dark:bg-gray-800 p-5 rounded-md border border-black flex flex-col flex-grow"
            style={{ maxHeight: "2000px", minHeight: "2000px" }}
          >
            {isLoadingInsById && <LISpinnerWithTextTwo />}
            {formData && !isLoadingInsById && (
              <InstitutionCreateForm
                formData={formData}
                onFormDataChange={handleFormDataChange}
              />
            )}
          </div>
        </div>
      </section>

      {formData?.id && (
        <InstitutionCustomerPersonTable
          usersData={usersInTheCompany}
          companyData={formData}
        />
      )}

      {formData?.id && (
        <InstitutionRepresentativeManagemenet
          usersData={repsInTheCompany}
          companyData={formData}
        />
      )}

      {formData && formData.id && (
        <div className="mx-5">
          <button
            onClick={handleUpdateInstitution}
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-200"
          >
            {isLoading && <CircularLoadingSvgOne />}
            {isLoading ? "Updating..." : "Update"}
          </button>
        </div>
      )}

      {!formData.id && (
        <div className="mx-5">
          <button
            onClick={handleCreateInstitution}
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-200"
          >
            {isLoading && <CircularLoadingSvgOne />}
            {isLoading ? "Creating..." : "Create"}
          </button>
        </div>
      )}

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default InstitutionManagementScreen;
