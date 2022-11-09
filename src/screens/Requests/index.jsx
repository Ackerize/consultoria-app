import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import ConsultingRequest from "../../components/ConsultingRequest";
import Loading from "../../components/Loading";
import SearchBar from "../../components/SearchBar";
import { UserContext } from "../../context/UserContext";
import consultoriaService from "../../services/consultoria.services";

const Requests = () => {
  const [loading, setLoading] = useState(false);
  const [consultancies, setConsultancies] = useState([]);
  const { user: auth} = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    consultoriaService.getByUser(auth.user.uid).then((data) => {
      if (data.ok) {
        setConsultancies(data.consultorias);
      } else {
        toast.error(data.msg);
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <SearchBar />
      <div style={{ marginTop: 30, paddingLeft: 30, paddingRight: 30 }}>
        <ConsultingRequest data={consultancies} setData={setConsultancies} />
      </div>
    </>
  );
};

export default Requests;
