import React, { useEffect, useState } from "react";
import DropdownTreeSelect from "react-dropdown-tree-select";
import "../../../assets/TreeView.css";
import toast, { Toaster } from "react-hot-toast";
import { getPagesByGroupIdApi } from "../../../../apis/PagesApiService";
import {
  assignGroupRightsApi,
  assignRoleRightsApi,
  assignUserRightsApi,
  getAllGroupsApi,
  getAllRolesApi,
  getButtonsApi,
  getComponentsApi,
  getSubComponentsApi,
  getUserButtonRightsByGroupIdApi,
  getUserButtonRightsByRoleIdApi,
  getUserButtonsRightsByUserIdApi,
  getUsersApi,
  revokeUserButtonsRightsByUserIdApi,
} from "../../../../apis/RightsApiService";
import AssignRightsFilters from "../AssignRightsFilters";
import { useDispatch, useSelector } from "react-redux";
import { SetAssignRightsSliceField } from "../../../../store/super-admin/AssignRightsSlice";
import SelectionGroupsSection from "../SelectionGroupsSection";
import SelectionRolesSection from "../SelectionRolesSection";
import SelectionUsersSection from "../SelectionUsersSection";

const AssignRightsTreeView = () => {
  // ! New
  const dispatch = useDispatch();
  const { selectedOption, selectedGroup, selectedRole, selectedUser } =
    useSelector((state) => state.assignRightsReducer);

  // !
  //Checked Buttons
  const [CheckedButtons, setCheckedButtons] = useState([]);

  //Make Null Buttons
  const [RevokeButtonsList, setRevokeButtonsList] = useState([]);

  const [SubComponentList, setSubComponentList] = useState([]);
  //Button

  const [ButtonList, setButtonList] = useState([]);

  // Component Data that gets called by the dropdown
  const [ComponentData, setComponentData] = useState([]);

  let nodes = [];

  const checkButtons = (nodes) => {
    let keyToCheck = "id";

    CheckedButtons.forEach((value) => {
      if (
        !nodes.some((node) => node[keyToCheck] == value) &&
        !RevokeButtonsList.includes(value)
      ) {
        RevokeButtonsList.push(value);
        console.log("Unchecked: " + value);
      }
    });

    RevokeButtonsList.forEach((value) => {
      if (nodes.some((node) => node[keyToCheck] == value)) {
        console.log("removed from revoke" + value);
        const index = RevokeButtonsList.indexOf(value);
        if (index !== -1) {
          RevokeButtonsList.splice(index, 1);
        }
      }
    });
  };

  const onChange = (currentNode, selectedNodes) => {
    console.log(selectedNodes);
    nodes = selectedNodes;
    checkButtons(selectedNodes);
  };

  const assignObjectPaths = (obj, stack) => {
    Object.keys(obj).forEach((k) => {
      const node = obj[k];
      if (typeof node === "object") {
        node.path = stack ? `${stack}.${k}` : k;
        assignObjectPaths(node, node.path);
      }
    });
  };

  assignObjectPaths(ComponentData);

  const [Count, setCount] = useState(0);

  // Handle groups and filter groups
  const [unchangedGroupsList, setUnchangedGroupsList] = useState([]);
  const [groupQuery, setGroupQuery] = useState("");
  const [userGroupId, setUserGroupId] = useState([]);
  const [selectGroupNull, setSelectGroupNull] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedOption && selectedRole) {
        getTreeViewDataForUserButtonRightsByRole();
      }
    };
    fetchData();
    return () => {};
  }, [selectedOption, selectedRole]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedOption == "Groups" && selectedGroup) {
        getTreeViewDataForUserButtonRightsByGroup();
      }
    };
    fetchData();
    return () => {};
  }, [selectedOption, selectedGroup]);

  useEffect(() => {
    setSelectGroupNull(false);
    const fetchData = async () => {
      setUserGroupId([]);
      getGroups();
      getUsers();
      getData(selectedUser);
      getRoles();
    };
    fetchData();
    return () => {};
  }, [selectedOption, selectedUser, Count]);

  // Select the user group
  const getData = async (user_id) => {
    let Component = [];
    let buttonsChecked = [];
    let buttonList = [];
    try {
      const componentResponse = await getComponentsApi();

      const subComponentResponse = await getSubComponentsApi();
      setSubComponentList(subComponentResponse.rows);

      const buttonResponse = await getButtonsApi();
      setButtonList(buttonResponse.rows);

      const ExistingButtonsResponse = await getUserButtonsRightsByUserIdApi(
        user_id
      );

      componentResponse.rows.forEach((componentElement) => {
        const componentChild = [];
        let parent_page_id = componentElement.pages_id;
        subComponentResponse.rows.forEach((subComponentElement) => {
          let component_pages_id = subComponentElement.parent_pages_id;
          let sub_pages_id = subComponentElement.sub_pages_id;
          if (parent_page_id === component_pages_id) {
            const subComponentChild = [];
            buttonResponse.rows.forEach((buttonElement) => {
              let button_component_pages_id = buttonElement.component_pages_id;
              if (button_component_pages_id === sub_pages_id) {
                subComponentChild.push({
                  label: `BTN : ` + buttonElement.button_display_name,
                  id: parseInt(buttonElement.ccc_master_buttons_id),
                  element: `But`,
                });
              }
            });
            componentChild.push({
              label: `SUB : ` + subComponentElement.sub_component_name,
              id: subComponentElement.sub_pages_id,
              children: subComponentChild,
              element: `Sub`,
            });
          }
        });
        buttonResponse.rows.forEach((buttonElement) => {
          let button_component_pages_id = buttonElement.component_pages_id;
          let button_id = buttonElement.ccc_master_buttons_id;
          if (button_component_pages_id == parent_page_id) {
            let buttonComponentChecked = false;
            ExistingButtonsResponse.rows.forEach((existingButtonElement) => {
              let existing_buttons_id = existingButtonElement.buttons_id;
              // Error lies past this block
              if (existing_buttons_id == button_id) {
                buttonComponentChecked = true;
                buttonsChecked.push(button_id);
              }
            });
            // Error before this. Check the logic
            buttonList.push(buttonElement.ccc_master_buttons_id);
            componentChild.push({
              label: `BTN : ` + buttonElement.button_display_name,
              id: parseInt(buttonElement.ccc_master_buttons_id),
              element: `But`,
              checked: buttonComponentChecked,
            });
          }
        });
        let addComponent = {
          label: `COM :` + componentElement.component_name,
          id: parseInt(componentElement.pages_id),
          children: componentChild,
          element: `Com`,
        };
        setButtonList(buttonList);
        setCheckedButtons(buttonsChecked);
        Component.push(addComponent);
        setComponentData(Component);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getTreeViewDataForUserButtonRightsByGroup = async () => {
    let Component = [];
    let buttonsChecked = [];
    let buttonList = [];
    try {
      const activePagesByGroupIdResponse = await getPagesByGroupIdApi(
        selectedGroup
      );
      const activePagesIds = activePagesByGroupIdResponse.map(
        (item) => item.pages_id
      );

      const componentResponse = await getComponentsApi();

      const subComponentResponse = await getSubComponentsApi();
      setSubComponentList(subComponentResponse.rows);

      const buttonResponse = await getButtonsApi();
      setButtonList(buttonResponse.rows);

      const ExistingButtonsResponse = await getUserButtonRightsByGroupIdApi(
        selectedGroup
      );

      componentResponse.rows.forEach((componentElement) => {
        const componentChild = [];
        let parent_page_id = componentElement.pages_id;

        subComponentResponse.rows.forEach((subComponentElement) => {
          let component_pages_id = subComponentElement.parent_pages_id;
          let sub_pages_id = subComponentElement.sub_pages_id;
          if (parent_page_id === component_pages_id) {
            const subComponentChild = [];
            buttonResponse.rows.forEach((buttonElement) => {
              let button_component_pages_id = buttonElement.component_pages_id;
              if (button_component_pages_id === sub_pages_id) {
                subComponentChild.push({
                  label: `BTN : ` + buttonElement.button_display_name,
                  id: parseInt(buttonElement.ccc_master_buttons_id),
                  element: `But`,
                });
              }
            });
            componentChild.push({
              label: `SUB : ` + subComponentElement.sub_component_name,
              id: subComponentElement.sub_pages_id,
              children: subComponentChild,
              element: `Sub`,
            });
          }
        });

        buttonResponse.rows.forEach((buttonElement) => {
          let button_component_pages_id = buttonElement.component_pages_id;
          let button_id = buttonElement.ccc_master_buttons_id;

          if (button_component_pages_id == parent_page_id) {
            let buttonComponentChecked = false;
            ExistingButtonsResponse.results.rows.forEach(
              (existingButtonElement) => {
                let existing_buttons_id = existingButtonElement.button_id;
                // Error lies past this block
                if (existing_buttons_id == button_id) {
                  buttonComponentChecked = true;
                  buttonsChecked.push(button_id);
                }
              }
            );

            // Error before this. Check the logic
            buttonList.push(buttonElement.ccc_master_buttons_id);
            componentChild.push({
              label: `BTN : ` + buttonElement.button_display_name,
              id: parseInt(buttonElement.ccc_master_buttons_id),
              element: `But`,
              // checked: activePagesIds.includes(componentElement.pages_id),
              checked: buttonsChecked.includes(
                buttonElement.ccc_master_buttons_id
              ),
              // checked: true,
            });
          }
        });

        let addComponent = {
          label: `COM :` + componentElement.component_name,
          id: parseInt(componentElement.pages_id),
          children: componentChild,
          element: `Com`,
          checked: activePagesIds.includes(componentElement.pages_id),
        };

        setButtonList(buttonList);
        setCheckedButtons(buttonsChecked);
        Component.push(addComponent);
        setComponentData(Component);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getTreeViewDataForUserButtonRightsByRole = async () => {
    let Component = [];
    let buttonsChecked = [];
    let buttonList = [];
    try {
      const componentResponse = await getComponentsApi();

      const subComponentResponse = await getSubComponentsApi();
      setSubComponentList(subComponentResponse.rows);

      const buttonResponse = await getButtonsApi();
      setButtonList(buttonResponse.rows);

      const ExistingButtonsResponse = await getUserButtonRightsByRoleIdApi(
        selectedRole
      );

      componentResponse.rows.forEach((componentElement) => {
        const componentChild = [];
        let parent_page_id = componentElement.pages_id;
        subComponentResponse.rows.forEach((subComponentElement) => {
          let component_pages_id = subComponentElement.parent_pages_id;
          let sub_pages_id = subComponentElement.sub_pages_id;
          if (parent_page_id === component_pages_id) {
            const subComponentChild = [];
            buttonResponse.rows.forEach((buttonElement) => {
              let button_component_pages_id = buttonElement.component_pages_id;
              if (button_component_pages_id === sub_pages_id) {
                subComponentChild.push({
                  label: `BTN : ` + buttonElement.button_display_name,
                  id: parseInt(buttonElement.ccc_master_buttons_id),
                  element: `But`,
                });
              }
            });
            componentChild.push({
              label: `SUB : ` + subComponentElement.sub_component_name,
              id: subComponentElement.sub_pages_id,
              children: subComponentChild,
              element: `Sub`,
            });
          }
        });
        buttonResponse.rows.forEach((buttonElement) => {
          let button_component_pages_id = buttonElement.component_pages_id;
          let button_id = buttonElement.ccc_master_buttons_id;
          if (button_component_pages_id == parent_page_id) {
            let buttonComponentChecked = false;
            ExistingButtonsResponse.results.rows.forEach(
              (existingButtonElement) => {
                let existing_buttons_id = existingButtonElement.button_id;
                // Error lies past this block
                if (existing_buttons_id == button_id) {
                  buttonComponentChecked = true;
                  buttonsChecked.push(button_id);
                }
              }
            );
            // Error before this. Check the logic
            buttonList.push(buttonElement.ccc_master_buttons_id);
            componentChild.push({
              label: `BTN : ` + buttonElement.button_display_name,
              id: parseInt(buttonElement.ccc_master_buttons_id),
              element: `But`,
              checked: buttonComponentChecked,
            });
          }
        });
        let addComponent = {
          label: `COM :` + componentElement.component_name,
          id: parseInt(componentElement.pages_id),
          children: componentChild,
          element: `Com`,
        };
        setButtonList(buttonList);
        setCheckedButtons(buttonsChecked);
        Component.push(addComponent);
        setComponentData(Component);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateGroupRightsToDatabase = async (user_group_id, nodes) => {
    if (user_group_id === "" || !userGroupId) {
      toast.error("Please select a group to proceed");
      return;
    }
    let i = 0;
    let componentsToSend = [];
    let subComponentToSend = [];
    let buttonToSend = [];
    while (i < nodes.length) {
      if (nodes[i].element == "Com") {
        let pages_id = nodes[i].id;
        componentsToSend.push(pages_id);
        SubComponentList.forEach((subList) => {
          let parent_page_id = subList.parent_pages_id;
          let sub_page_id = subList.sub_pages_id;
          if (parent_page_id == pages_id) {
            subComponentToSend.push(sub_page_id);
          }
          ButtonList.forEach((buttonList) => {
            let button_component_pages_id = buttonList.component_pages_id;
            let button_id = buttonList.ccc_master_buttons_id;
            if (button_component_pages_id == sub_page_id) {
              buttonToSend.push(button_id);
            }
          });
        });
        ButtonList.forEach((buttonList) => {
          let button_component_pages_id = buttonList.component_pages_id;
          let button_id = buttonList.ccc_master_buttons_id;
          if (button_component_pages_id == pages_id) {
            buttonToSend.push(button_id);
          }
        });
      } else if (nodes[i].element == "Sub") {
        let sub_pages_id = nodes[i].id;
        subComponentToSend.push(sub_pages_id);
        ButtonList.forEach((buttonList) => {
          let button_component_pages_id = buttonList.component_pages_id;
          let button_id = buttonList.ccc_master_buttons_id;
          if (button_component_pages_id == sub_pages_id) {
            buttonToSend.push(button_id);
          }
        });
      } else if (nodes[i].element == "But") {
        let button_id = nodes[i].id;
        ButtonList.forEach((ccc_master_buttons_id) => {
          let button_master_id = ccc_master_buttons_id;
          if (button_master_id == button_id) {
            buttonToSend.push(button_id);
          }
        });
      }
      i++;
    }
    try {
      const userGroupRightsResponse = await assignGroupRightsApi({
        user_group_id: user_group_id,
        buttonToSend: buttonToSend,
        subComponentToSend: subComponentToSend,
        componentsToSend: componentsToSend,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateRolesRightsToDatabase = async (user_role_id, nodes) => {
    try {
      let i = 0;
      let componentsToSend = [];
      let subComponentToSend = [];
      let buttonToSend = [];
      while (i < nodes.length) {
        if (nodes[i].element == "Com") {
          let pages_id = nodes[i].id;
          componentsToSend.push(pages_id);
          SubComponentList.forEach((subList) => {
            let parent_page_id = subList.parent_pages_id;
            let sub_page_id = subList.sub_pages_id;
            if (parent_page_id == pages_id) {
              subComponentToSend.push(sub_page_id);
            }
            ButtonList.forEach((buttonList) => {
              let button_component_pages_id = buttonList.component_pages_id;
              let button_id = buttonList.ccc_master_buttons_id;
              if (button_component_pages_id == sub_page_id) {
                buttonToSend.push(button_id);
              }
            });
          });
          ButtonList.forEach((buttonList) => {
            let button_component_pages_id = buttonList.component_pages_id;
            let button_id = buttonList.ccc_master_buttons_id;
            if (button_component_pages_id == pages_id) {
              buttonToSend.push(button_id);
            }
          });
        } else if (nodes[i].element == "Sub") {
          let sub_pages_id = nodes[i].id;
          subComponentToSend.push(sub_pages_id);
          ButtonList.forEach((buttonList) => {
            let button_component_pages_id = buttonList.component_pages_id;
            let button_id = buttonList.ccc_master_buttons_id;
            if (button_component_pages_id == sub_pages_id) {
              buttonToSend.push(button_id);
            }
          });
        } else if (nodes[i].element == "But") {
          let button_id = nodes[i].id;
          ButtonList.forEach((buttonList) => {
            let button_master_id = buttonList.ccc_master_buttons_id;
            if (button_master_id == button_id) {
              buttonToSend.push(button_id);
            }
          });
        }
        i++;
      }
      try {
        const idList = nodes.map((item) => item.id);
        const userRolesRightsResponse = await assignRoleRightsApi({
          user_role_id: user_role_id,
          button: idList,
          subComponents: subComponentToSend,
          components: componentsToSend,
        });
        if (userRolesRightsResponse.success) {
          toast.success(userRolesRightsResponse.msg);
        } else {
          toast.success(userRolesRightsResponse.msg);
        }
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateUserRightsToDatabase = async (user_id, nodes) => {
    try {
      let i = 0;
      let componentsToSend = [];
      let subComponentToSend = [];
      let buttonToSend = [];
      console.log(nodes);
      while (i < nodes.length) {
        if (nodes[i].element == "Com") {
          let pages_id = nodes[i].id;
          componentsToSend.push(pages_id);
          SubComponentList.forEach((subList) => {
            let parent_page_id = subList.parent_pages_id;
            let sub_page_id = subList.sub_pages_id;
            if (parent_page_id == pages_id) {
              subComponentToSend.push(sub_page_id);
            }
            ButtonList.forEach((buttonList) => {
              let button_component_pages_id = buttonList.component_pages_id;
              let button_id = buttonList.ccc_master_buttons_id;
              if (button_component_pages_id == sub_page_id) {
                buttonToSend.push(button_id);
              }
            });
          });
          ButtonList.forEach((buttonList) => {
            let button_component_pages_id = buttonList.component_pages_id;
            let button_id = buttonList.ccc_master_buttons_id;
            if (button_component_pages_id == pages_id) {
              buttonToSend.push(button_id);
            }
          });
        } else if (nodes[i].element == "Sub") {
          let sub_pages_id = nodes[i].id;
          subComponentToSend.push(sub_pages_id);
          ButtonList.forEach((buttonList) => {
            let button_component_pages_id = buttonList.component_pages_id;
            let button_id = buttonList.ccc_master_buttons_id;
            if (button_component_pages_id == sub_pages_id) {
              buttonToSend.push(button_id);
            }
          });
        } else if (nodes[i].element == "But") {
          let button_id = nodes[i].id;
          console.log(button_id);
          console.log(button_id);
          ButtonList.forEach((buttonList) => {
            let button_master_id = buttonList;
            if (button_master_id == button_id) {
              console.log("Send" + button_id);
              buttonToSend.push(button_id);
            }
          });
        }
        i++;
      }
      try {
        console.log(buttonToSend, subComponentToSend, componentsToSend);
        await assignUserRightsApi({
          user_id: user_id,
          button: buttonToSend,
          subComponents: subComponentToSend,
          components: componentsToSend,
        });
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const revokeUserButtonsRightsByUserId = async (
    user_id,
    RevokeButtonsList
  ) => {
    await revokeUserButtonsRightsByUserIdApi({
      user_id: user_id,
      revokeButtonsList: RevokeButtonsList,
    });
  };

  const getGroups = async () => {
    try {
      const groupResponse = await getAllGroupsApi();
      if (groupResponse.rowCount > 0) {
        setUnchangedGroupsList(groupResponse.rows);
        dispatch(
          SetAssignRightsSliceField({
            field: "groupsList",
            value: groupResponse.rows,
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getRoles = async () => {
    try {
      const rolesResponse = await getAllRolesApi();
      if (rolesResponse.rowCount > 0) {
        dispatch(
          SetAssignRightsSliceField({
            field: "rolesList",
            value: rolesResponse.rows,
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSelectGroupNull(false);
    try {
      setUserGroupId([]);
      dispatch(
        SetAssignRightsSliceField({
          field: "selectedGroup",
          value: "",
        })
      );

      if (selectedOption == "Users") {
        updateUserRightsToDatabase(selectedUser, nodes);
        revokeUserButtonsRightsByUserId(selectedUser, RevokeButtonsList);
      } else if (selectedOption == "Groups") {
        updateGroupRightsToDatabase(selectedGroup, nodes);
      } else if (selectedOption == "Roles") {
        updateRolesRightsToDatabase(selectedRole, nodes);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-5 mt-8 bg-gray-800 p-4 rounded-lg py-4">
      {/* <div className="mx-5 mt-8 bg-white rounded-lg shadow dark:border dark:bg-gray-800 border border-black p-2"> */}

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow dark:border md:mt-0 w-full xl:p-0 dark:bg-gray-800 dark:border-white">
          <AssignRightsFilters />

          {selectedOption && selectedOption == "Groups" && (
            <SelectionGroupsSection />
          )}

          {/* Roles */}
          {selectedOption && selectedOption == "Roles" && (
            <SelectionRolesSection />
          )}

          {/* User */}
          {selectedOption && selectedOption == "Users" && (
            <SelectionUsersSection />
          )}
        </div>

        <div className="bg-white rounded-lg shadow dark:border md:mt-0 w-full xl:p-0 dark:bg-gray-800 dark:border-white col-span-2">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {ComponentData && (
              <div className="grid grid-cols-1 h-screen">
                <DropdownTreeSelect
                  data={ComponentData}
                  showDropdown={"initial"}
                  onChange={onChange}
                  className="mdl-demo text-black rounded-md px-1 w-full"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="w-full justify-center btn bg-blue-600 mt-4"
        >
          Update
        </button>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default AssignRightsTreeView;
