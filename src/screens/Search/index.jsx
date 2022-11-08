import React, { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import ConsultancyModal from "../../components/ConsultancyModal";
import Loading from "../../components/Loading";
import MessageModal from "../../components/MessageModal";
import SearchBar from "../../components/SearchBar";
import User from "../../components/User";
import consultorServices from "../../services/consultor.services";
import clienteServices from "../../services/cliente.services";
import { UserContext } from "../../context/UserContext";

const Search = () => {
  const { user: auth } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState({
    message: false,
    consultancy: false,
  });
  const [users, setUsers] = useState([]);
  const [userSelected, setUserSelected] = useState(null);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("term");

  useEffect(() => {
    if (searchTerm) {
      if(auth.user.type === "cliente"){
        consultorServices
        .search(searchTerm)
        .then((res) => {
          setUsers(res.consultores);
          setLoading(false);
        })

      }else{
        clienteServices
        .search(searchTerm)
        .then((res) => {
          setUsers(res.clientes);
          setLoading(false);
        })
      }
    } else {
      setLoading(false);
    }
  }, [searchTerm]);

  const onSelectUser = (user, type) => {
    setUserSelected(user);
    setShowModal({ ...showModal, [type]: true });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <SearchBar />
      <div className="p-4 consultants-container">
        {users.length > 0 ? (
          users.map((user) => (
            <User
              key={user.uid}
              data={user}
              onMessage={() => onSelectUser(user, "message")}
              onConsultancy={() =>
                onSelectUser(user, "consultancy")
              }
            />
          ))
        ) : !searchTerm ? (
          <p className="not-found-term">
            Ingresa una palabra clave para realizar la búsqueda
          </p>
        ) : (
          <p className="not-found-term">
            No se encontraron resultados para la búsqueda:{" "}
            <strong>{searchTerm}</strong>
          </p>
        )}
      </div>
      <ConsultancyModal
        show={showModal.consultancy}
        onHide={() => setShowModal({ ...showModal, consultancy: false })}
        consultor={userSelected}
      />
      <MessageModal
        show={showModal.message}
        onHide={() => setShowModal({ ...showModal, message: false })}
        userSelected={userSelected}
      />
    </>
  );
};

export default Search;
