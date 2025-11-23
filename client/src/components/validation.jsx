import React from "react";

const validation = () => {
  return (
    <section className="mx-12 my-12">
      <div>
        1. All urls has to be 3 letters routing. For example localhost /
        nse.Every single page should have 3 routings url
        <br />
        <br />
        2. All the page has to have a header [navbar] by default. Search button
        , chat,help,vide and audio call. All of them completly appear as default
        <br />
        <br />
        3. Check each and every form for database connections to see whether the
        connection is properly established and terminated after the task is done
        <br />
        <br />
        4. 16 Digits number series
        <br />
        1001 - police user id
        <br />
        1002 - Workstation id
        <br />
        1003 - Login session id
        <br />
        1004 - Pages Id
        <br />
        1006 - Sub Id
        <br />
        1007 - Buttons Id
        <br />
        1008 - POS bill number
        <br />
        <br />
        <div>
          <h2>Complaints</h2>
          <div className="text-green-500">1011 - Missing Nic</div>
          <div className="text-green-500">1012 - Missing Passport</div>
          <div className="text-green-500">1013 - Missing License</div>
          <div className="text-green-500">1014 - Missing Person</div>
          <div className="text-green-500">1015 - Assault</div>
          <div className="text-green-500">1016 - Missing Vehicle</div>
        </div>
      </div>
    </section>
  );
};

export default validation;
