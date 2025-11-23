import { CCC_DEPARTMENT_DRIVERS_LICENSE_DISPATCHES_CREATE } from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";

export const createDepartmentDriverLicenseDispatchRecordApi = async (
  reqBody
) => {
  try {
    const response = await API_ENDPOINT.post(
      CCC_DEPARTMENT_DRIVERS_LICENSE_DISPATCHES_CREATE,
      reqBody
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
