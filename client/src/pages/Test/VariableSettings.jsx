import React from "react";

const VariableSettings = () => {
  return (
    <section className="mx-12 my-12">
      This page should have a dropdown to select the time for the temp table
      search in the server.
      <br />
      Server ip address , server_port are defined in the database.
      CCC_master_settings
      <br />
      <br />
      16.Inactive sessions to be logged out, the timelimit when the session to
      be logged out can be changed by the oic of the station, database will hold
      a record of who changed the session timeout timelimit and when did they
      change
      <br />
      <br />
      7.Under ccc settings obtain the value from the admin via dropdown to
      change server function running time span to check the who else search temp
      table
    </section>
  );
};

export default VariableSettings;
