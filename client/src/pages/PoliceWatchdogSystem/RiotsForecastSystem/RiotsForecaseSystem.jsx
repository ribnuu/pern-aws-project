import React from "react";

const RiotsForecaseSystem = () => {
  const protocolName = `${window.location.protocol}`;
  const hostname = `${window.location.hostname}`;
  const host = `${window.location.host}`;
  const origin = `${window.location.origin}`;
  const port = `${window.location.port}`;
  return (
    <section className="mx-12 my-12">
      <div>{protocolName}</div>
      <div>{hostname}</div>
      <div>{host}</div>
      <div>{origin}</div>
      <div>{port}</div>
      <br />
      <br /> Name all associations like <br />
      Teachers associations
      <br />
      Three-wheel drivers associations
      <br />
      Consumers associations
      <br />
      Private bus associations
      <br />
      train drivers associations
      <br />
      and fill the database for riots or strike forecast - <br />
      doctors associations
      <br />
      nurse associations
      <br />
      universities update the portal or student unions on all manners like
      religious functional conceptual union leader - number of members -
      conducted events
      <br />
      <br />
      Protest organizer party, protest organizer individual , date and time ,
      reason
      <br />
      <br />
      This system will detect all the current and future protest and record it
      on the database along with a tagging such as terrorism , provoking
      violence , strike , town closures , market closure , trade closure.
      <br />
      <br />
      The system will match news articles and news updates and update the
      database automatically.
      <br />
      For Example : Price Increase - Chameera <br />
      Medicine Price Increase - GMOA
      <br />
    </section>
  );
};

export default RiotsForecaseSystem;
