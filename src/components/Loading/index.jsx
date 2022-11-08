import React from 'react'
import HashLoader from "react-spinners/HashLoader";

const Loading = ({ label = 'Cargando...'}) => {
  return (
    <div className="flex-fill justify-content-center d-flex align-items-center">
        <div className="d-flex flex-column align-items-center">
          <HashLoader color={"#3f51b5"} size={60} />
          <strong className="mt-4 loading-text">{ label }</strong>
        </div>
      </div>
  )
}

export default Loading;