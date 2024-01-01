import * as React from "react";

import { CalendarItemTimeAndLocations } from "@/components/CourseCalendar/CalendarItemTimeAndLocations";
import { CalendarItem, filterStudioCalendarItems } from "@/types/CalendarData";
import { Grid } from "@mui/material";

export const CalendarDayStudio: React.FunctionComponent<{
  calendarItems: CalendarItem[];
}> = ({ calendarItems }) => {
  const studioCalendarItems = filterStudioCalendarItems(calendarItems);

  if (studioCalendarItems.length === 0) {
    return null;
  }

  return studioCalendarItems.map(
    (itemCurrent, indexCurrent): React.ReactElement => {
      return (
        <Grid key={indexCurrent} item xs={12}>
          <b>{`${itemCurrent.title}`}</b>
          <CalendarItemTimeAndLocations calendarItem={itemCurrent} />
        </Grid>
      );
    },
  );
};
