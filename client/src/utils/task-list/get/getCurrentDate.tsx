export default function getCurrentDate(): string {
  const today = new Date();
  const DD = String(today.getDate()).padStart(2, "0");
  const MM = String(today.getMonth() + 1).padStart(2, "0"); //January is 0
  const YYYY = today.getFullYear();
  const hh = String(today.getHours()).padStart(2, "0");
  const mm = String(today.getMinutes()).padStart(2, "0");

  const currentDate = `${YYYY}-${MM}-${DD}T${hh}:${mm}`;

  return currentDate;
}
