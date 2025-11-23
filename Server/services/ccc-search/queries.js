const setUpAssociationsCCC = require("../../models/ccc");
const { Op } = require("sequelize");

const searchUserByGroupIdRoleIdAndSearchTermQuery = async (
  groupId,
  roleId,
  searchTerm
) => {
  try {
    // if (!groupId || !roleId) {
    //   throw new Error("Missing group or role id");
    // }
    const { CccUserMasterfile, CccUserAffiliations } = setUpAssociationsCCC();
    const response = await CccUserMasterfile.findAll({
      where: {
        [Op.or]: [
          {
            username: {
              [Op.iLike]: `%${searchTerm}%`, // Case-insensitive search
            },
          },
          {
            nic_number: {
              [Op.iLike]: `%${searchTerm}%`, // Case-insensitive search
            },
          },
          {
            email: {
              [Op.iLike]: `%${searchTerm}%`, // Case-insensitive search
            },
          },
          {
            mobile_number: {
              [Op.iLike]: `%${searchTerm}%`, // Case-insensitive search
            },
          },
        ],
      },
      // include: [
      //   {
      //     model: CccUserAffiliations,
      //     as: "affiliations",
      //     where: {
      //       group_id: groupId,
      //       role_id: roleId,
      //     },
      //     attributes: [],
      //   },
      // ],
      include: [
        {
          model: CccUserAffiliations,
          as: "affiliations",
          where: {
            ...(groupId && { group_id: groupId }), // Only include if groupId is provided
            ...(roleId && { role_id: roleId }), // Only include if roleId is provided
          },
          attributes: [],
        },
      ],
      limit: 20,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  searchUserByGroupIdRoleIdAndSearchTermQuery,
};
