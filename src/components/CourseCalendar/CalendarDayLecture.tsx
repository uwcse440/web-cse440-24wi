import * as React from "react";

import { CalendarItemTimeAndLocations } from "@/components/CourseCalendar/CalendarItemTimeAndLocations";
import { CalendarItem, filterLectureCalendarItems } from "@/types/CalendarData";
import { Grid } from "@mui/material";

export const CalendarDayLecture: React.FunctionComponent<{
  calendarItems: CalendarItem[];
}> = ({ calendarItems }) => {
  const lectureCalendarItems = filterLectureCalendarItems(calendarItems);

  if (lectureCalendarItems.length === 0) {
    return null;
  }

  return lectureCalendarItems.map(
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
