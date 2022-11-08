import dayjs from "dayjs";
import isBeetween from "dayjs/plugin/isBetween";
import updateLocale from "dayjs/plugin/updateLocale";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(isBeetween); 
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
// set locale to spanish
dayjs.updateLocale("en", {
  relativeTime: {
    future: "en %s",
    past: "hace %s",
    s: 'unos segundos',
    m: "un minuto",
    mm: "%d minutos",
    h: "una hora",
    hh: "%d horas",
    d: "un día",
    dd: "%d días",
    M: "un mes",
    MM: "%d meses",
    y: "un año",
    yy: "%d yaños"
  }
});
dayjs().format();

export const getCurrentConsultancies = (consultorias) =>
  consultorias.filter((consultoria) => {
    const startDate = dayjs(consultoria.startDate);
    const endDate = dayjs(consultoria.endDate);
    const now = dayjs();
    return now.isBetween(startDate, endDate);
  });

export const getNextConsultancies = (consultorias) => {
  const now = dayjs();
  return consultorias.filter((consultoria) => {
    const startDate = dayjs(consultoria.startDate);
    return startDate.isAfter(now);
  });
};

export const formatDate = (date) => {
  return dayjs(date).format("DD/MM/YYYY HH:mm");
}

export const getMessageDate = (date, yesterday = true, hours = false) => {
  const now = dayjs();
  const messageDate = dayjs(date);
  if (now.isSame(messageDate, "day")) {
    return messageDate.format("HH:mm");
  }
  if (now.subtract(1, "day").isSame(messageDate, "day") && yesterday) {
    return "Ayer";
  }
  if (hours) {
    return messageDate.format("DD/MM HH:mm");
  }
  return messageDate.format("DD/MM");
};
