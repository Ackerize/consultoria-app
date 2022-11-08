import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Page404 = ({ name, pathname, auth = false }) => {
  return (
    <div className="container-xxl container-p-y page-404">
      <div className={"misc-wrapper" + (auth ? " auth" : " no-auth")}>
        <div className="mb-3">
          <img
            src="page-error.png"
            alt="page-misc-error"
            width="500"
            className="img-fluid"
          />
        </div>
        <h2 className="mb-3 mt-4 mx-2">Página no encontrada :(</h2>
        <p className="mb-4 mx-2">
          La URL solicitada no se encontró en este servidor.
        </p>
        <Link to={pathname} className="btn go-home btn-primary">
          {name}
        </Link>
      </div>
    </div>
  );
};

export default Page404;
