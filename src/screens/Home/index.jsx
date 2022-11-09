import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import Consultancies from "../../components/Consultancies";
import Loading from "../../components/Loading";
import SearchBar from "../../components/SearchBar";
import { UserContext } from "../../context/UserContext";
import consultoriaService from "../../services/consultoria.services";
import "./styles.css";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [consultancies, setConsultancies] = useState([]);
  const { user: auth } = useContext(UserContext);
  useEffect(() => {
    setLoading(true);
    consultoriaService
      .getByUser(
        auth.user.uid,
        auth.user.type === "cliente" ? "Aceptada" : "all"
      )
      .then((data) => {
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
      <div
        style={{ marginTop: 30, paddingLeft: 30, paddingRight: 30 }}
        className={consultancies.length === 0 ? "consultants-container" : ""}
      >
        {consultancies.length > 0 ? (
          <Consultancies data={consultancies} />
        ) : (
          <p className="not-found-term">No tienes consultorías asignadas</p>
        )}
      </div>
    </>
  );
};

export default Home;
