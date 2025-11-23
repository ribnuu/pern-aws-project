import React from "react";
import { useLocation } from "react-router-dom";
import ButtonGrid from "../../components/ButtonGrid/ButtonGrid";
import useFetchButtonsLandingPage from "../../hooks/useFetchButtonsLandingPage";

const HouseHoldersList = () => {
  const location = useLocation();
  const pageId = location.state?.pageId;

  const buttons = useFetchButtonsLandingPage(pageId);

  return (
    <section className="mx-5 pb-10">
      <ButtonGrid buttons={buttons} basePath={location.pathname} />
    </section>
  );
};

export default HouseHoldersList;
