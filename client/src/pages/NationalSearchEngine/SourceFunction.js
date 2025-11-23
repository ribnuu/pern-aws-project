import axios from "axios";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

export const updateWesDepartmentForeignEmploymentBureauTrue = async (
  userId,
  workStationId
) => {
  try {
    const updateWesDEPFResponse = await axios.post(
      `http://${server_port}:4000/api/feb/updateDFEBToTrue`,
      {
        userId,
        workStationId,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateWesDepartmentVehicleEmissionTrue = async (
  userId,
  workStationId
) => {
  try {
    const updateWesDVEResponse = await axios.post(
      `http://${server_port}:4000/api/vehicle-emission/updateDVEToTrue`,
      {
        userId,
        workStationId,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateWesDepartmentEPFTrue = async (userId, workStationId) => {
  try {
    const updateWesDEPFResponse = await axios.post(
      `http://${server_port}:4000/api/epf/updateDEPFToTrue`,
      {
        userId,
        workStationId,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateWesDriverOffensePortalTrue = async (
  userId,
  workStationId
) => {
  try {
    const updateWesDEPFResponse = await axios.post(
      `http://${server_port}:4000/api/dop/updateDDOPToTrue`,
      {
        userId,
        workStationId,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateWesDepartmentForeignEmploymentBureauFalse = async (
  userId,
  workStationId
) => {
  try {
    const updateWesDEPFResponse = await axios.post(
      `http://${server_port}:4000/api/feb/updateDFEBToFalse`,
      {
        userId,
        workStationId,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateWesDepartmentVehicleEmissionFalse = async (
  userId,
  workStationId
) => {
  try {
    const updateWesDVEResponse = await axios.post(
      `http://${server_port}:4000/api/vehicle-emission/updateDVEToFalse`,
      {
        userId,
        workStationId,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateWesDepartmentEPFFalse = async (userId, workStationId) => {
  try {
    const updateWesDEPFResponse = await axios.post(
      `http://${server_port}:4000/api/epf/updateDEPFToFALSE`,
      {
        userId,
        workStationId,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateWesDriverOffensePortalFalse = async (
  userId,
  workStationId
) => {
  try {
    const updateWesDEPFResponse = await axios.post(
      `http://${server_port}:4000/api/dop/updateDDOPToFalse`,
      {
        userId,
        workStationId,
      }
    );
  } catch (error) {
    console.log(error);
  }
};
