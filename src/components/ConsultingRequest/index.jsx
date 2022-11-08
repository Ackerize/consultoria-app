import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
// icons
import { BiTimeFive } from "react-icons/bi";
import { MdDone } from "react-icons/md";
import { VscError } from "react-icons/vsc";
// components
import Tab from "../Tab";
import Table from "../Table";
import WarningModal from "../WarningModal";
// context
import { UserContext } from "../../context/UserContext";
import consultoriaService from "../../services/consultoria.services";

const ConsultingRequest = ({ data, setData }) => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [headers, setHeaders] = useState([
    user.user.type === "cliente" ? "Consultor" : "Cliente",
    "Fecha inicio",
    "Fecha fin",
    "Área",
    "Descripción",
    ...(user.user.type === "consultor" ? ["Acciones"] : []),
  ]);
  const [modalInfo, setModalInfo] = useState({
    visible: false,
    title: "",
    body: "",
    accept: "",
    decline: "Cancelar",
    requestId: null,
  });
  const [filteredData, setFilteredData] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    switch (currentTab) {
      case 0:
        setFilteredData(
          data.filter((item) => item.status.toLowerCase() === "pendiente")
        );
        if (!headers.find((header) => header === "Acciones")) {
          setHeaders([...headers, ...(user.user.type === "consultor" ? ["Acciones"] : [])]);
        }
        break;
      case 1:
        setFilteredData(
          data.filter((item) => item.status.toLowerCase() === "aceptada")
        );
        setHeaders(headers.filter((item) => item !== "Acciones"));
        break;
      default:
        setFilteredData(
          data.filter((item) => item.status.toLowerCase() === "rechazada")
        );
        setHeaders(headers.filter((item) => item !== "Acciones"));
        break;
    }
  }, [currentTab, data]);

  const onShowAcceptModal = (id) => {
    setModalInfo({
      visible: true,
      title: "Confirmar",
      body: "¿Estás seguro de aceptar esta solicitud?",
      accept: "Aceptar",
      decline: "Cancelar",
      type: "success",
      requestId: id,
    });
  };

  const onShowDeclineModal = (id) => {
    setModalInfo({
      visible: true,
      title: "Confirmar",
      body: "¿Estás seguro de rechazar esta solicitud?",
      accept: "Rechazar",
      decline: "Cancelar",
      type: "danger",
      requestId: id,
    });
  };

  const handleSubmit = async (id, status) => {
    try {
      setLoading(true);
      const newStatus = status === "success" ? "Aceptada" : "Rechazada";
      const response = await consultoriaService.toggleStatus(id, newStatus);
      if (response.ok) {
        toast.success(response.msg);
        setData(data.map(item => item.id === id ? {...item, status: modalInfo.type === "success" ? "Aceptada" : 'Rechazada'} : item));
        setModalInfo({ visible: false });
      } else {
        toast.error(response.msg);
      }
      setLoading(false);
    } catch (error) {
      toast.error(msg);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="nav-align-top mb-4">
        <ul className="nav nav-tabs nav-fill" role="tablist">
          <Tab
            icon={BiTimeFive}
            label="Pendientes"
            active={currentTab === 0}
            onClick={() => setCurrentTab(0)}
            bgColor="#fef08a"
            color="#ca8a04"
          />
          <Tab
            icon={MdDone}
            label="Aceptadas"
            active={currentTab === 1}
            onClick={() => setCurrentTab(1)}
            bgColor="#bbf7d0"
            color="#16a34a"
          />
          <Tab
            icon={VscError}
            label="Rechazadas"
            active={currentTab === 2}
            onClick={() => setCurrentTab(2)}
            bgColor="#fecaca"
            color="#dc2626"
          />
        </ul>
        <div className="tab-content">
          <div
            className="tab-pane fade show active"
            id="navs-justified-home"
            role="tabpanel"
          >
            {filteredData.length > 0 ? (
              <Table
                headers={headers}
                data={filteredData}
                onAccept={onShowAcceptModal}
                onDecline={onShowDeclineModal}
              />
            ) : (
              <p className="no-consultancies">No tienes solicitudes</p>
            )}
          </div>
        </div>
      </div>
      <WarningModal
        title={modalInfo.title}
        body={modalInfo.body}
        visible={modalInfo.visible}
        acceptLabel={modalInfo.accept}
        declineLabel={modalInfo.decline}
        onDimiss={() => setModalInfo({ ...modalInfo, visible: false })}
        onAccept={() => handleSubmit(modalInfo.requestId, modalInfo.type)}
        btnType={modalInfo.type}
        loading={loading}
      />
    </>
  );
};

export default ConsultingRequest;
