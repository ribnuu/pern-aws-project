import {
  POS_REPS_COMMISSION_GENERATE_PDF_REPORT,
  POS_REPS_COMMISSION_GET_ALL_REPS_COMMISSIONS,
} from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";

export const getAllRepsCommissionsDataApi = async ({ filters = {} }) => {
  try {
    const params = new URLSearchParams();

    // Add filters as query parameters
    Object.keys(filters).forEach((key) => {
      if (filters[key] !== undefined && filters[key] !== null) {
        params.append(key, filters[key]);
      }
    });

    const response = await API_ENDPOINT.get(
      `${POS_REPS_COMMISSION_GET_ALL_REPS_COMMISSIONS}?${params.toString()}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const posRepsCommissionGeneratePdfApi = async ({ filters = {} }) => {
  try {
    const params = new URLSearchParams();

    // Add filters as query parameters
    Object.keys(filters).forEach((key) => {
      if (filters[key] !== undefined && filters[key] !== null) {
        params.append(key, filters[key]);
      }
    });

    const response = await API_ENDPOINT.get(
      `${POS_REPS_COMMISSION_GENERATE_PDF_REPORT}?${params.toString()}`,
      {
        responseType: "blob", // Important for handling binary data
      }
    );
    // Create a new Blob object using the response data
    const blob = new Blob([response.data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    // link.download = `${billNumber}.pdf`;
    link.download = `reps_commission_pay.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild();
  } catch (error) {
    console.error("Error downloading the PDF:", error);
    throw error;
  }
};
