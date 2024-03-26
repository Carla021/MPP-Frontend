// FilterMonitorsPage.tsx

import React, { useContext, useState } from "react";
import { MonitorsContext } from "../../contexts/MonitorsContext";
import { useNavigate } from "react-router-dom";
import "./FilterMonitorsPage.css";
import Layout from "../../components/layout/Layout";

const FilterMonitorsPage: React.FC = () => {
  const { filterMonitor } = useContext(MonitorsContext)!;
  const [criteria, setCriteria] = useState<string>("");

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCriteria(event.target.value);
  };

  const navigate = useNavigate();

  const handleFilterSubmit = () => {
    filterMonitor(criteria);
    navigate("/");
  };

  return (
    <Layout>
      <div className="filter-page-container">
        <div className="filter-form">
          <h1 className="filter-title">Filter Monitors</h1>
          <input
            className="filter-input"
            type="text"
            value={criteria}
            onChange={handleFilterChange}
          />
          <button className="filter-button" onClick={handleFilterSubmit}>
            Filter
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default FilterMonitorsPage;
