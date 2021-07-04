import dayjs from "dayjs";

export const displayDate = (timestamp: string | number) =>
  dayjs(Number(timestamp)).format("YYYY/MM/DD H:mm:ss:SSS"); // Jan 01, 2018 23:34:26:123
// dayjs(Number(timestamp)).format("MMM D, YYYY H:m:s:SSS"); // Jan 01, 2018 23:34:26:123
// dayjs(Number(timestamp)).format("DD/MM/YYYY H:m:SSS");
