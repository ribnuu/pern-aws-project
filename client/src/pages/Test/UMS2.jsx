import React, { useState, useEffect } from "react";
import { getUsersApi } from "../../apis/RightsApiService";

function Searchdata() {
  const [userData, setUserdata] = useState([]);
  const [userDataTwo, setUserDataTwo] = useState([]);
  const [filterdata, setFilterdata] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const getUserdata = async () => {
      const reqData = await getUsersApi();
      const resData = await reqData.rows;
      setUserdata(resData);
      setUserDataTwo(resData);
      setFilterdata(resData);
    };
    getUserdata();
  }, []);

  const handlesearch = (event) => {
    const getSearch = event.target.value;
    if (getSearch.length > 0) {
      const searchdata = filterdata.filter((item) =>
        item.username.toLowerCase().includes(getSearch)
      );
      setUserdata(searchdata);
    } else {
      setUserdata(filterdata);
    }
    setQuery(getSearch);
  };

  return (
    <section>
      <div>
        <div className="row mt-3">
          <div className="col-md-12 mt-3 mb-3">
            <h3 className="mb-3">Search record Datatable in React Js</h3>
            <div className="col-md-6">
              <input
                type="text"
                name="searchOne"
                value={query}
                className="form-control"
                onChange={(e) => handlesearch(e)}
                placeholder="Search..."
              />
            </div>
          </div>

          <div className="col-md-12">
            <table className="table" style={{ color: "#fff" }}>
              <thead>
                <tr>
                  <th>Sr. No </th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((getUser, index) => (
                  <tr key={index}>
                    <td>{index + 1} </td>
                    <td>{getUser.username}</td>
                    <td>{getUser.last_name}</td>
                    <td>{getUser.email}</td>
                    <td>{getUser.gender}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Searchdata;
