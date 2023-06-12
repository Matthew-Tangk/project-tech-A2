import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const CustomMonthLayout = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar showDaysOutsideCurrentMonth fixedWeekNumber={6} />
    </LocalizationProvider>
  );
};

export default CustomMonthLayout;
