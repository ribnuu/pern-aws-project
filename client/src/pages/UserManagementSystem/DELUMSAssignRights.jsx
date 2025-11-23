// import axios from "axios";
// import React, { useContext, useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;
// import data from "../Test/data.json";
// import DropdownTreeSelect from "react-dropdown-tree-select";
// import "../../assets/TreeView.css";

// const DELUMSAssignRights = () => {
//   const [Nodes, setNodes] = useState([]);
//   const [UpdateUserToDatabase, setUpdateUserToDatabase] = useState("");
//   const dbData = [
//     {
//       label: "User Management System",
//       // tagClassName: "special",
//       id: "100400000000004",
//       children: [
//         {
//           label: "CREATE ROLES",
//           id: "1005000000000001",
//         },
//         {
//           label: "ASSIGN GROUP",
//           id: "1005000000000002",
//         },
//         {
//           label: "CREATE GROUP",
//           id: "1005000000000003",
//         },
//         {
//           label: "ASSIGN WORK STATION - USER",
//           id: "1005000000000004",
//         },
//         {
//           label: "ASSIGN POLICE STATION - WORKSTATION",
//           id: "1005000000000005",
//         },
//       ],
//     },
//   ];
//   const [ComponentData, setComponentData] = useState([]);

//   const onChange = (currentNode, selectedNodes) => {
//     console.log("path::", currentNode.path);
//     console.log(selectedNodes);
//     setNodes(selectedNodes);
//   };

//   const assignObjectPaths = (obj, stack) => {
//     Object.keys(obj).forEach((k) => {
//       const node = obj[k];
//       if (typeof node === "object") {
//         node.path = stack ? `${stack}.${k}` : k;
//         assignObjectPaths(node, node.path);
//       }
//     });
//   };
//   assignObjectPaths(ComponentData);

//   const onBlur = (action) => {
//     console.log(action);
//     console.log("Blur");
//   };

//   const [componentList, setComponentList] = useState([]);
//   const [SubComponentList, setSubComponentList] = useState([]);
//   const [ButtonList, setButtonList] = useState([]);
//   const [groupsList, setGroupsList] = useState([]);
//   const [unchangedGroupsList, setUnchangedGroupsList] = useState([]);
//   const [groupQuery, setGroupQuery] = useState("");

//   const [userGroupId, setUserGroupId] = useState([]);

//   //Handle group users and filter group users
//   const [groupUserQuery, setGroupUserQuery] = useState("");

//   //Handle all Users and filter all users
//   const [users, setUsers] = useState([]);
//   const [unChangedUsers, setUnchangedUsers] = useState([]);
//   const [allUsersQuery, setAllUsersQuery] = useState([]);

//   const [userGroupToHighlight, setUserGroupToHighlight] = useState(1);

//   const [allUsers, setAllUsers] = useState([]);

//   const [nullGroupUser, setNullGroupUser] = useState([]);

//   const [selectGroupNull, setSelectGroupNull] = useState(false);

//   // Select the user group

//   const handleGroupSearch = (event) => {
//     const getGroupSearch = event.target.value;
//     if (getGroupSearch.length > 0) {
//       const searchData = unchangedGroupsList.filter((item) =>
//         item.user_group_name.toLowerCase().includes(getGroupSearch)
//       );
//       setGroupsList(searchData);
//     } else {
//       setGroupsList(unchangedGroupsList);
//     }
//     setGroupQuery(getGroupSearch);
//   };

//   const handleAllUsersSearch = (event) => {
//     const getAllUsersSearch = event.target.value;
//     console.log(getAllUsersSearch);
//     if (getAllUsersSearch.length > 0) {
//       const searchData = unChangedUsers.filter((item) =>
//         item.username.toLowerCase().includes(getAllUsersSearch)
//       );
//       setUsers(searchData);
//     } else {
//       setUsers(unChangedUsers);
//     }
//     setAllUsersQuery(getAllUsersSearch);
//   };

//   // Rename to userId or user
//   const handleUserGroup = (group_id) => {
//     setUserGroupToHighlight(group_id);
//   };

//   const handleUserAddToGroup = (user_id) => {
//     if (userGroupId.includes(user_id)) {
//       setUserGroupId((userGroupId) =>
//         userGroupId.filter((id) => id !== user_id)
//       );
//     } else {
//       setUserGroupId((userGroupId) => [...userGroupId, user_id]);
//     }
//   };

//   const handleUserRemoveFromGroup = (user_id) => {
//     if (userGroupId.includes(user_id)) {
//       setUserGroupId(userGroupId.filter((item) => item !== user_id));
//       if (!nullGroupUser.includes(user_id)) {
//         setNullGroupUser((nullGroupUser) => [...nullGroupUser, user_id]);
//       } else {
//         setNullGroupUser((nullGroupUser) =>
//           nullGroupUser.filter((id) => id !== user_id)
//         );
//       }
//     }
//   };

//   const handleAllUsers = (user_id) => {
//     if (!userGroupId.includes(user_id)) {
//       handleUserAddToGroup(user_id);
//     } else {
//       handleUserRemoveFromGroup(user_id);
//     }
//   };

//   const sendRightsData = async (nodes) => {
//     try {
//       const userGroupUpdateResponse = await axios.post(
//         `http://${server_port}:4000/api/rights/assignUserRights`,
//         {
//           nodes: nodes,
//         }
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getUsers = async () => {
//     try {
//       const userResponse = await axios.post(
//         `http://${server_port}:4000/api/user/getUsers`
//       );

//       if (userResponse.data.rowCount > 0) {
//         userResponse.data.rows.forEach((element) => {
//           if (userGroupToHighlight == element.user_group) {
//             handleAllUsers(element.user_id);
//           }
//         });
//         setAllUsers(userResponse.data.rows);
//         setUsers(userResponse.data.rows);
//         setUnchangedUsers(userResponse.data.rows);
//       } else {
//         setUserGroupId([]);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSelectGroupNull(false);
//     if (userGroupToHighlight == "") {
//       setSelectGroupNull(true);
//     } else {
//       try {
//         const r1 = await sendRightsData(Nodes);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };

//   const getSubComponents = async (e) => {
//     try {
//       const subComponentsReponse = await axios.post(
//         `http://${server_port}:4000/api/pages/getSubComponents`
//       );
//       if (subComponentsReponse.data.rowCount > 0) {
//         setSubComponentList(subComponentsReponse.data.rows);
//         console.log(subComponentsReponse);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getData = async (e) => {
//     try {
//       const componentResponse = await axios.post(
//         `http://${server_port}:4000/api/pages/getComponents`
//       );
//       const buttonResponse = await axios.post(
//         `http://${server_port}:4000/api/pages/getButtons`
//       );
//       const subComponentsReponse = await axios.post(
//         `http://${server_port}:4000/api/pages/getSubComponents`
//       );

//       componentResponse.data.rows.forEach((componentElement) => {
//         const subComponentChild = [];
//         let pages_id = componentElement.pages_id;
//         subComponentsReponse.data.rows.forEach((subComponentElement) => {
//           let component_pages_id = subComponentElement.parent_page_id;
//           let children_page_id = parseInt(subComponentElement.children_page_id);
//           if (pages_id === component_pages_id) {
//             const buttonChild = [];
//             buttonResponse.data.rows.forEach((buttonElement) => {
//               let button_component_pages_id = buttonElement.component_pages_id;
//               if (button_component_pages_id == children_page_id) {
//                 buttonChild.push({
//                   label: `BTN : ` + buttonElement.button_display_name,
//                   id: parseInt(buttonElement.ccc_master_buttons_id),
//                 });
//               }
//             });
//             subComponentChild.push({
//               label: `SUB : ` + subComponentElement.component_name,
//               id: children_page_id,
//               children: buttonChild,
//             });
//           }
//         });
//         buttonResponse.data.rows.forEach((buttonElement) => {
//           let button_component_pages_id = buttonElement.component_pages_id;
//           if (button_component_pages_id == pages_id) {
//             subComponentChild.push({
//               label: `BTN : ` + buttonElement.button_display_name,
//               id: parseInt(buttonElement.ccc_master_buttons_id),
//             });
//           }
//         });
//         let addComponent = {
//           label: `COM : ` + componentElement.component_name,
//           comp_id: parseInt(componentElement.pages_id),
//           id: parseInt(componentElement.pages_id),
//           children: subComponentChild,
//         };

//         ComponentData.push(addComponent);
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     setSelectGroupNull(false);
//     const fetchData = async () => {
//       setUserGroupId([]);
//       getUsers();
//       getSubComponents();
//       getData();
//     };
//     fetchData();
//     return () => {};
//   }, [userGroupToHighlight]);

//   return (
//     <section className="bg-gray-800 p-4 rounded-lg py-4">
//       {selectGroupNull && (
//         <div className="w-1/2">
//           <div className="flex justify-center my-2 mb-4">
//             <div className="alert alert-error">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="stroke-current shrink-0 h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//               <span>Please select a group</span>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="grid lg:grid-cols-3 gap-4">
//         <div className=" dark:border-white w-full md:mt-0  xl:p-0 shadow flex flex-col gap-2">
//           <div className="bg-white rounded-lg shadow dark:border md:mt-0 w-full xl:p-0 dark:bg-gray-800 dark:border-white">
//             <div className="items-center mx-2 m-1 grid grid-cols-3 justify-around gap-1">
//               <div className="bg-yellow-500  text-center rounded-lg">User</div>
//               <div className="bg-yellow-500 text-center rounded-lg">Roles</div>
//               <div className="bg-yellow-500 text-center rounded-md">Group</div>
//             </div>
//           </div>
//           <div className="bg-white rounded-lg shadow dark:border md:mt-0 w-full xl:p-0 dark:bg-gray-800 dark:border-white">
//             <div className="items-center mx-2 mt-2">
//               <input
//                 type="search"
//                 name="groupSearch"
//                 value={allUsersQuery}
//                 onChange={(e) => handleAllUsersSearch(e)}
//                 placeholder="Search Users ..."
//                 className="bg-white text-black rounded-md py-1 px-2 w-full"
//               />
//             </div>
//             <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//               <div className="grid grid-cols-1">
//                 {users && (
//                   <div>
//                     {users.map((data, key) => {
//                       let highlight = "";
//                       if (userGroupToHighlight == data.user_id) {
//                         highlight = "text-green-500";
//                       } else {
//                         highlight = "";
//                       }
//                       return (
//                         <div key={key}>
//                           <div
//                             onClick={() => handleUserGroup(data.user_id)}
//                             className={highlight}
//                           >
//                             {data.username}
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="rounded-lg shadow dark:border md:mt-0 w-full xl:p-0 dark:bg-gray-800 dark:border-white col-span-2">
//           <div className=" space-y-4 md:space-y-6 sm:py-7 sm:px-1">
//             <div className="h-auto">
//               <DropdownTreeSelect
//                 data={ComponentData}
//                 showDropdown={"initial"}
//                 onChange={onChange}
//                 onBlur={onBlur}
//                 className="mdl-demo text-white rounded-md px-1 w-full"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//       <form onSubmit={handleSubmit}>
//         <button
//           type="submit"
//           className="w-full justify-center btn bg-blue-600 mt-4"
//         >
//           Update
//         </button>
//       </form>
//     </section>
//   );
// };

// export default DELUMSAssignRights;
