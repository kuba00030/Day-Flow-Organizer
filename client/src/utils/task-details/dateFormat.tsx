export default function dateFormat(date: string) {
  const dateObject = new Date(date);

  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObject.getDate().toString().padStart(2, "0");
  const hours = dateObject.getHours().toString().padStart(2, "0");
  const minutes = dateObject.getMinutes().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

  return formattedDate;
}
