import React, { useState, useEffect, useContext } from "react";
// icons
import { BsClock } from "react-icons/bs";
import { MdCalendarToday } from "react-icons/md";
import { BsListUl } from "react-icons/bs";
import Tab from "../Tab";
import Table from "../Table";
import { getCurrentConsultancies, getNextConsultancies } from "../../utils/date-parse";
import { UserContext } from "../../context/UserContext";


const Consultancies = ({ data }) => {
  const { user } = useContext(UserContext);
  const headers = [user.user.type === 'cliente' ? "Consultor" : "Cliente", "Fecha inicio", "Fecha fin", "Área", "Descripción"];

  const [filteredData, setFilteredData] = useState(data);
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    switch (currentTab) {
      case 0:
        setFilteredData(getCurrentConsultancies(data));
        break;
      case 1:
        setFilteredData(getNextConsultancies(data));
        break;
      default:
        setFilteredData(data);
        break;
    }
  }, [currentTab]);
  
  return (
    <div className="nav-align-top mb-4">
      <ul className="nav nav-tabs nav-fill" role="tablist">
        <Tab
          icon={BsClock}
          label="Ahora"
          active={currentTab === 0}
          onClick={() => setCurrentTab(0)}
        />
        <Tab
          icon={MdCalendarToday}
          label="Próximas"
          active={currentTab === 1}
          onClick={() => setCurrentTab(1)}
        />
        <Tab
          icon={BsListUl}
          label="Todas"
          active={currentTab === 2}
          onClick={() => setCurrentTab(2)}
        />
      </ul>
      <div className="tab-content">
        <div
          className="tab-pane fade show active"
          id="navs-justified-home"
          role="tabpanel"
        >
          {filteredData.length > 0 ? (
            <Table headers={headers} data={filteredData} />
          ) : (
            <p className="no-consultancies">No tienes consultorías asignadas</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Consultancies;
