export const capitalizeString = (string) => {
  string = string.toLowerCase().trim();
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getFirstNameAndLastName = (name = "") => {
  const fullName = name.split(" ");
  if (fullName.length == 0) {
    return "";
  }
  if (fullName.length > 0 && fullName.length < 4) {
    return (
      fullName[0] +
      " " +
      (fullName[2] ? fullName[2] : fullName[1] ? fullName[1] : "")
    );
  } else {
    return fullName[0] + " " + fullName[2];
  }
};
