import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { formatDate } from "../../utils/date-parse";

const Table = ({ headers, data, onAccept, onDecline }) => {
  const { user } = useContext(UserContext);
  const hasActions = headers.find((header) => header === "Acciones");
  return (
    <div className="table-responsive text-nowrap">
      <table className="table">
        <thead className="table-light">
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="table-border-bottom-0">
          {data.map((row) => (
            <tr key={row.id}>
              <td>
                <strong>
                  {
                    user.user.type === "consultor" ? row.cliente.name : row.consultor.name
                  }
                </strong>
              </td>
              <td>{ formatDate(row.startDate) }</td>
              <td>{ formatDate(row.endDate)}</td>
              <td>
                <span className="badge bg-label-primary me-1">{row.area}</span>
              </td>
              <td>{ row.description || 'Sin descripción'}</td>
              {hasActions && user.user.type === 'consultor' && (
                <td>
                  <div className="d-flex flex-column">
                  <button className="btn btn-sm btn-outline-info mb-2" onClick={() => onAccept(row.id)}>
                    Aceptar
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => onDecline(row.id)}>
                    Rechazar
                  </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
