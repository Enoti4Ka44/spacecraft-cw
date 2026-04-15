export const toShortDate = (dateStr: string) => {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
};

export const fromShortDate = (dateStr: string) => {
  if (!dateStr) return "";
  if (dateStr.includes("T")) return dateStr.split("T")[0];
  const [day, month, year] = dateStr.split("-");
  return `${year}-${month}-${day}`;
};

export const toLongDate = (dateTimeStr: string) => {
  if (!dateTimeStr) return "";
  const [datePart, timePart] = dateTimeStr.split("T");
  const [year, month, day] = datePart.split("-");
  const timeWithSeconds = timePart.length === 5 ? `${timePart}:00` : timePart;
  return `${timeWithSeconds} ${day}-${month}-${year}`;
};

export const fromLongDate = (dateTimeStr: string) => {
  if (!dateTimeStr) return "";
  if (dateTimeStr.includes("T")) return dateTimeStr.slice(0, 16);
  const [timePart, datePart] = dateTimeStr.split(" ");
  const [day, month, year] = datePart.split("-");
  const [hours, minutes] = timePart.split(":");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const getNowLongDate = () => {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())} ${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()}`;
};
