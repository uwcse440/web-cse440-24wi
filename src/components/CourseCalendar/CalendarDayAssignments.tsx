import * as React from "react";

import { CalendarItemAssignmentCanvasDueTime } from "@/components/CourseCalendar/CalendarItemAssignmentCanvasDueTime";
import { AppLink } from "@/components/links/AppLink";
import {
  CalendarItem,
  filterAssignmentCalendarItems,
} from "@/types/CalendarData";
import { Grid } from "@mui/material";

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
          {((): React.ReactNode => {
            if (itemCurrent.link) {
              return (
                <React.Fragment>
                  <AppLink href={itemCurrent.link}>{itemCurrent.title}</AppLink>
                  <CalendarItemAssignmentCanvasDueTime
                    calendarItem={itemCurrent}
                  />
                </React.Fragment>
              );
            } else {
              return itemCurrent.title;
            }
          })()}
        </Grid>
      );
    },
  );
};
