import React, { useState } from "react";
import UsersInTheCCCSearch from "../../../components/UsersInTheCCCSearch/UsersInTheCCCSearch";
import StockCustomerInstitutionSearch from "../StockCustomerInstitutionSearch/StockCustomerInstitutionSearch";

const InstitutionRepresentativeCreateForm = () => {
  const initialState = {};
  const [formData, setFormData] = useState(initialState);

  //   CCC Users Search
  const [usersInTheCCCSearchTerm, setUsersInTheCCCSearchTerm] = useState("");
  const [isLoadingUsersInCCCSearch, setISLoadingUsersInCCCSearch] =
    useState(false);

  const [institutionSearchTerm, setInstitutionSearchTerm] = useState("");
  const [isLoadingInstitutions, setIsLoadingInstitutions] = useState(false);
  const [
    selectedStockCustomerInstitution,
    setSelectedStockCustomerInstitution,
  ] = useState(null);

  return (
    <div className="m-5">
      <div className="my-2.5">
        <div className="my-2.5">
          <StockCustomerInstitutionSearch
            hideLabel={true}
            onSelectStockCustomerInstitution={(data) => {
              setSelectedStockCustomerInstitution(data);
            }}
            setLoading={setIsLoadingInstitutions}
            loading={isLoadingInstitutions}
            searchTerm={institutionSearchTerm}
            setSearchTerm={setInstitutionSearchTerm}
          />
        </div>
        <UsersInTheCCCSearch
          disabled={!selectedStockCustomerInstitution}
          hideLabel={true}
          onSelectUsersInTheCCC={(data) => {}}
          searchTerm={usersInTheCCCSearchTerm}
          setSearchTerm={(v) => {
            setUsersInTheCCCSearchTerm(v);
          }}
          placeholder="Search user by name | mobile number"
          loading={isLoadingUsersInCCCSearch}
          setLoading={setISLoadingUsersInCCCSearch}
        />
      </div>
    </div>
  );
};

export default InstitutionRepresentativeCreateForm;
