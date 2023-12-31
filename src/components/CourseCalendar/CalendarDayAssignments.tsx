import * as React from "react";

import { CalendarItemTimeAndLocations } from "@/components/CourseCalendar/CalendarItemTimeAndLocations";
import { AppLink } from "@/components/links/AppLink";
import {
  CalendarItem,
  filterAssignmentCalendarItems,
} from "@/types/CalendarData";
import { Alert, Grid } from "@mui/material";

export const CalendarDayAssignments: React.FunctionComponent<{
  calendarItems: CalendarItem[];
}> = ({ calendarItems }) => {
  const assignmentCalendarItems = filterAssignmentCalendarItems(calendarItems);

  if (assignmentCalendarItems.length === 0) {
    return null;
  }

  return assignmentCalendarItems.map(
    (itemCurrent, indexCurrent): React.ReactElement => {
      return (
        <Grid key={indexCurrent} item xs={12}>
          {/*<Alert severity="info" sx={{ marginTop: 1 }}>*/}
          {/*  Assignment:{" "}*/}
            {((): React.ReactNode => {
              if (itemCurrent.link) {
                return (
                  <AppLink href={itemCurrent.link}>{itemCurrent.title}</AppLink>
                );
              } else {
                return itemCurrent.title;
              }
            })()}
          {/*</Alert>*/}
        </Grid>
      );
    },
  );
};
