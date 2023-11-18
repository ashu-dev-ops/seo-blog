export function dateToString(date: any) {
  if (!date || date == "null") {
    return "";
  }
  const option = {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  const newDate = new Date(date);
  const localDateString = newDate.toLocaleString("en-IN", option);

  // if (localDateString === "Invalid Date") {
  //   return "Attention required";
  // }
  return localDateString;
}
