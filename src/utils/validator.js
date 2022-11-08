import validator from "validator";

export const isClientValid = (client, userType) => {
  if (validator.isEmpty(client.name.trim())) {
    throw new Error("El nombre es obligatorio");
  }
  if (!validator.isEmail(client.email)) {
    throw new Error("El email no es válido");
  }
  if (validator.isEmpty(client.password.trim())) {
    throw new Error("La contraseña es obligatoria");
  }
  if (client.password !== client.password2) {
    throw new Error("Las contraseñas no coinciden");
  }
  if(!userType) {
    throw new Error("Selecciona un tipo de usuario");
  }
  return true;
};

export const isConsultorValid = (consultor) => {
  if (!validator.isEmail(consultor.email)) {
    throw new Error("El email no es válido");
  }
  if (validator.isEmpty(consultor.name.trim())) {
    throw new Error("El nombre es obligatorio");
  }
  if (validator.isEmpty(consultor.password.trim())) {
    throw new Error("La contraseña es obligatoria");
  }
  if (consultor.password !== consultor.password2) {
    throw new Error("Las contraseñas no coinciden");
  }
  if (validator.isEmpty(consultor.areas.trim())) {
    throw new Error("Las áreas de conocimiento son obligatorias");
  }
  return true;
};

export const isLoginValid = (data) => {
  if (!validator.isEmail(data.email)) {
    throw new Error("El email no es válido");
  }
  if (validator.isEmpty(data.password.trim())) {
    throw new Error("La contraseña es obligatoria");
  }
  return true;
}

export const isRequestValid = (request) => {
  if (validator.isEmpty(request.consultor.trim())) {
    throw new Error("El consultor es obligatorio");
  }
  if (validator.isEmpty(request.startDate.trim())) {
    throw new Error("La fecha de inicio es obligatoria");
  }
  if (validator.isEmpty(request.endDate.trim())) {
    throw new Error("La fecha de fin es obligatoria");
  }
  if (new Date(request.startDate) > new Date(request.endDate)) {
    throw new Error("La fecha de inicio debe ser anterior a la fecha de fin");
  }
  if (new Date(request.startDate) < new Date()) {
    throw new Error("La fecha de inicio debe ser hoy o posterior");
  }
  if (new Date(request.startDate).getDate() !== new Date(request.endDate).getDate()) {
    throw new Error("La fecha de fin debe ser el mismo día que la fecha de inicio");
  }
  if (new Date(request.endDate) - new Date(request.startDate) < 1800000) {
    throw new Error("La duración mínima de la consulta es de 30 minutos");
  }
  if (validator.isEmpty(request.area.trim())) {
    throw new Error("El tema de la consultoría es obligatorio");
  }
  return true;
}

export const isMessageValid = (data) => {
  if (validator.isEmpty(data.from.trim())) {
    throw new Error("El destinatario es obligatorio");
  }
  if (validator.isEmpty(data.to.trim())) {
    throw new Error("El remitente es obligatorio");
  }
  if (validator.isEmpty(data.content.trim())) {
    throw new Error("El mensaje es obligatorio");
  }
  return true;
}