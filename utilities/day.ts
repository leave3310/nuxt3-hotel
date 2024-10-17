import dayjs from "dayjs";

export function addDay(totalDay: number) {
  return dayjs().add(totalDay, "day").toDate();
}

export function formatDayToSlash(day: Date) {
  return dayjs(day).format("YYYY/MM/DD");
}
