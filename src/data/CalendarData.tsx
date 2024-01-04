import * as React from "react";

import { ok as assert } from "assert";

import { CourseStoreLink } from "@/components/links/CourseStoreLink";
import { SiteLinks } from "@/data/SiteLinks";
import {
  AssignmentCalendarItem,
  CalendarDate,
  CalendarItem,
  CalendarWeek,
  EventCalendarItem,
  HolidayCalendarItem,
  LectureCalendarItem,
  StudioCalendarItem,
} from "@/types/CalendarData";
import {
  clamp as clampDate,
  format as datefnsFormat,
  isValid as datefnsIsValid,
  parse as datefnsParse,
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfWeek,
} from "date-fns";

const dayOfWeekValues = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
] as const;
type dayOfWeek = (typeof dayOfWeekValues)[number];

const LECTURE_TIME_AND_LOCATION = {
  time: "10:00 to 11:20",
  location: "CSE2 G10",
};

const SECTION_TIME_AND_LOCATIONS = [
  {
    time: "10:30 - 11:20",
    location: "MGH 295",
  },
  {
    time: "11:30 - 12:20",
    location: "MGH 295",
  },
  {
    time: "12:30 - 1:20",
    location: "MGH 058",
  },
  {
    time: "1:30 - 2:20",
    location: "MGH 058",
  },
];

const POSTER_SESSION_TIME_AND_LOCATION = {
  time: "11:00 to 12:00",
  location: "CSE Atrium",
};

export function parseCalendarDate(calendarDate: CalendarDate): Date {
  const parsedDate = datefnsParse(calendarDate, "yyyy-MM-dd", new Date());
  assert(datefnsIsValid(parsedDate), `Invalid date: ${calendarDate}`);

  return parsedDate;
}

export function formatCalendarDate(
  calendarDate: CalendarDate,
  format: string,
): string {
  return datefnsFormat(parseCalendarDate(calendarDate), format);
}

export function calendarDates(): CalendarDate[] {
  return eachDayOfInterval({
    start: parseCalendarDate(calendarData.datesOfInstruction.start),
    end: parseCalendarDate(calendarData.datesOfInstruction.end),
  }).map((dateCurrent: Date): CalendarDate => {
    return datefnsFormat(dateCurrent, "yyyy-MM-dd");
  });
}

export function calendarWeeks(): CalendarWeek[] {
  return eachWeekOfInterval({
    start: parseCalendarDate(calendarData.datesOfInstruction.start),
    end: parseCalendarDate(calendarData.datesOfInstruction.end),
  }).map((weekCurrent: Date): CalendarWeek => {
    return {
      startDate: datefnsFormat(weekCurrent, "yyyy-MM-dd"),
      dates: eachDayOfInterval({
        start: clampDate(weekCurrent, {
          start: parseCalendarDate(calendarData.datesOfInstruction.start),
          end: parseCalendarDate(calendarData.datesOfInstruction.end),
        }),
        end: clampDate(endOfWeek(weekCurrent), {
          start: parseCalendarDate(calendarData.datesOfInstruction.start),
          end: parseCalendarDate(calendarData.datesOfInstruction.end),
        }),
      }).map((dateCurrent): CalendarDate => {
        return datefnsFormat(dateCurrent, "yyyy-MM-dd");
      }),
    };
  });
}

export function calendarItems(): CalendarItem[] {
  return [
    ...Object.values(calendarData.assignments),
    ...calendarData.events,
    ...calendarData.holidays,
    ...calendarData.lectures,
    ...calendarData.studios,
  ];
}

export function calendarItemsForDate(
  calendarDate: CalendarDate,
): CalendarItem[] {
  return calendarItems().filter(
    (calendarItemCurrent: CalendarItem): boolean => {
      if ("date" in calendarItemCurrent) {
        return calendarDate === calendarItemCurrent.date;
      } else {
        return calendarItemCurrent.dates.includes(calendarDate);
      }
    },
  );
}

function verifyCalendarDate(
  calendarDate: CalendarDate,
  dayOfWeek: dayOfWeek,
): CalendarDate {
  assert(dayOfWeekValues.includes(dayOfWeek));

  const parsedDate = parseCalendarDate(calendarDate);
  const parsedDateDayOfWeek = datefnsFormat(parsedDate, "EEE");
  assert(
    parsedDateDayOfWeek === dayOfWeek,
    `Date ${calendarDate} is not ${dayOfWeek}`,
  );

  return calendarDate;
}

export const calendarData: {
  datesOfInstruction: {
    start: CalendarDate;
    end: CalendarDate;
  };
  holidays: HolidayCalendarItem[];
  lectures: LectureCalendarItem[];
  studios: StudioCalendarItem[];
  assignments: { [key: string]: AssignmentCalendarItem };
  events: EventCalendarItem[];
} = {
  datesOfInstruction: {
    start: verifyCalendarDate("2024-01-01", "Mon"),
    end: verifyCalendarDate("2024-03-15", "Fri"),
  },

  holidays: [
    {
      type: "holiday",
      title: "New Year's Day",
      date: verifyCalendarDate("2024-01-01", "Mon"),
    },
    {
      type: "holiday",
      title: "College Football Playoff National Championship",
      date: verifyCalendarDate("2024-01-08", "Mon"),
    },
    {
      type: "holiday",
      title: "Martin Luther King Jr. Day",
      date: verifyCalendarDate("2024-01-15", "Mon"),
    },
    {
      type: "holiday",
      title: "Presidents Day",
      date: verifyCalendarDate("2024-02-19", "Mon"),
    },
  ],

  lectures: [
    {
      type: "lecture",
      date: verifyCalendarDate("2024-01-04", "Thu"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      title: "Introduction and Overview",
      slides: "https://canvas.uw.edu/files/114335438/",
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2024-01-09", "Tue"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      title: "Introduction to Critique",
      // slides: 'https://canvas.uw.edu/files/100693798/',
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2024-01-11", "Thu"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      title: "Design Diamond",
      // slides: 'https://canvas.uw.edu/files/100693826/',
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2024-01-16", "Tue"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      title: "Design Research",
      // slides: 'https://canvas.uw.edu/files/100693807/',
    },
    // {
    //     type: 'lecture',
    //     date: DateTime.fromISO('2023-01-17'),
    //     timeAndLocation: LECTURE_TIME_AND_LOCATION,
    //     title: 'Design of Everyday Things',
    //     // slides: 'https://canvas.uw.edu/files/100847593/',
    // },
    {
      type: "lecture",
      date: verifyCalendarDate("2024-01-18", "Thu"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      title: "Design of Everyday Things",
      // slides: 'https://canvas.uw.edu/files/100847593/',
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2024-01-23", "Tue"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      title: "Task Analysis",
      // slides: 'https://canvas.uw.edu/files/101151132/',
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2024-01-25", "Thu"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      title: "Models and Human Performance",
      // slides: 'https://canvas.uw.edu/files/102115599/',
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2024-01-30", "Tue"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      title: "Storyboarding, Paper Prototyping, and Testing",
      // slides: 'https://canvas.uw.edu/files/101474158/',
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2024-02-06", "Tue"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      title: "Effective Presentations",
      // slides: 'https://canvas.uw.edu/files/101784235/',
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2024-02-13", "Tue"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      title: "Inspection",
      // slides: 'https://canvas.uw.edu/files/102112566/',
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2024-02-15", "Thu"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      title: "Patterns and Interface Implementation",
      // slides: 'https://canvas.uw.edu/files/102112518/',
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2024-02-22", "Thu"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      title: "Designing for Diverse Needs",
      // slides: 'https://canvas.uw.edu/files/102516490/',
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2024-02-27", "Tue"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      title: "History",
      // slides: 'https://canvas.uw.edu/files/102772743/',
    },
  ],

  studios: [
    {
      type: "studio",
      dates: [
        verifyCalendarDate("2024-01-05", "Fri"),
        verifyCalendarDate("2024-01-12", "Fri"),
        verifyCalendarDate("2024-01-19", "Fri"),
        verifyCalendarDate("2024-01-26", "Fri"),
        verifyCalendarDate("2024-02-02", "Fri"),
        verifyCalendarDate("2024-02-16", "Fri"),
        verifyCalendarDate("2024-02-23", "Fri"),
        verifyCalendarDate("2024-03-08", "Fri"),
      ],
      timeAndLocations: SECTION_TIME_AND_LOCATIONS,
      title: "Studio",
    },
    {
      type: "studio",
      dates: [
        verifyCalendarDate("2024-02-01", "Thu"),
        verifyCalendarDate("2024-03-05", "Tue"),
        verifyCalendarDate("2024-03-07", "Thu"),
      ],
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      title: "Studio",
    },
  ],

  assignments: {
    //
    // Assignment 0
    //
    assignment0: {
      type: "assignment",
      title: "Assignment 0 - Introduction Slide",
      link: SiteLinks.assignmentsAssignment0Top.href,
      date: verifyCalendarDate("2024-01-04", "Thu"),
      submission: "canvas",
      submitCanvasTime: "8:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1695984/assignments/8938946",
    },
    //
    // Assignment 1
    //
    assignment1a: {
      type: "assignment",
      title: "Assignment 1a - Individual Brainstorm",
      link: SiteLinks.assignmentsAssignment1Top.href,
      date: verifyCalendarDate("2024-01-04", "Thu"),
      submission: "canvas",
      submitCanvasTime: "8:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1695984/assignments/8938947",
    },
    assignment1b: {
      type: "assignment",
      title: "Assignment 1b - Group Proposals",
      link: SiteLinks.assignmentsAssignment1Top.href,
      date: verifyCalendarDate("2024-01-08", "Mon"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1695984/assignments/8938948",
    },
    assignment1b_rev: {
      type: "assignment",
      title: "Assignment 1b_rev - Group Proposals",
      link: SiteLinks.assignmentsAssignment1Top.href,
      date: verifyCalendarDate("2024-01-11", "Thu"),
      submission: "canvas",
      submitCanvasTime: "8:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1695984/assignments/8938949",
    },
    assignment1c: {
      type: "assignment",
      title: "Assignment 1c - Finalized Proposal",
      link: SiteLinks.assignmentsAssignment1Top.href,
      date: verifyCalendarDate("2024-01-15", "Mon"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1695984/assignments/8938950",
    },
    //
    // Assignment 2
    //
    assignment2a: {
      type: "assignment",
      title: "Assignment 2a - Project Ideation",
      link: SiteLinks.assignmentsAssignment2Top.href,
      date: verifyCalendarDate("2024-01-16", "Tue"),
      // submission: 'other',
      // submitText: 'Completed in class.',
    },
    assignment2b: {
      type: "assignment",
      title: "Assignment 2b - Design Research Plan",
      link: SiteLinks.assignmentsAssignment2Top.href,
      date: verifyCalendarDate("2024-01-18", "Thu"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      // submitCanvasLink:
      //   "https://canvas.uw.edu/courses/1695984/assignments/8938950",
    },
    assignment2c: {
      type: "assignment",
      title: "Assignment 2c - Design Research Check-In",
      link: SiteLinks.assignmentsAssignment2Top.href,
      date: verifyCalendarDate("2024-01-22", "Mon"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      // submitCanvasLink:
      //   "https://canvas.uw.edu/courses/1695984/assignments/8938950",
    },
    assignment2d: {
      type: "assignment",
      title: "Assignment 2d - Design Research Review",
      link: SiteLinks.assignmentsAssignment2Top.href,
      date: verifyCalendarDate("2024-01-25", "Thu"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      // submitCanvasLink:
      //   "https://canvas.uw.edu/courses/1695984/assignments/8938950",
    },
    assignment2e: {
      type: "assignment",
      title: "Assignment 2e - Task Review",
      link: SiteLinks.assignmentsAssignment2Top.href,
      date: verifyCalendarDate("2024-01-29", "Mon"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      // submitCanvasLink:
      //   "https://canvas.uw.edu/courses/1695984/assignments/8938950",
    },
    assignment2f: {
      type: "assignment",
      title: "Assignment 2f - Design Check-In",
      link: SiteLinks.assignmentsAssignment2Top.href,
      date: verifyCalendarDate("2024-01-31", "Wed"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      // submitCanvasLink:
      //   "https://canvas.uw.edu/courses/1695984/assignments/8938950",
    },
    assignment2f_rev: {
      type: "assignment",
      title: "Assignment 2f_rev - Design Check-In",
      link: SiteLinks.assignmentsAssignment2Top.href,
      date: verifyCalendarDate("2024-02-01", "Thu"),
      submission: "canvas",
      submitCanvasTime: "8:00pm",
      // submitCanvasLink:
      //   "https://canvas.uw.edu/courses/1695984/assignments/8938950",
    },
    assignment2g: {
      type: "assignment",
      title: "Assignment 2g - Design Review",
      link: SiteLinks.assignmentsAssignment2Top.href,
      date: verifyCalendarDate("2024-02-05", "Mon"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      // submitCanvasLink:
      //   "https://canvas.uw.edu/courses/1695984/assignments/8938950",
    },
    assignment2p: {
      type: "assignment",
      title: "Assignment 2p - Presentation",
      link: SiteLinks.assignmentsAssignment2Top.href,
      date: verifyCalendarDate("2024-02-07", "Wed"),
      submission: "canvas",
      submitCanvasTime: "8:00pm",
      // submitCanvasLink:
      //   "https://canvas.uw.edu/courses/1695984/assignments/8938950",
    },
    //
    // Assignment 3
    //
    assignment3a: {
      type: "assignment",
      title: "Assignment 3a - Paper Prototype",
      link: SiteLinks.assignmentsAssignment3Top.href,
      date: verifyCalendarDate("2024-02-12", "Mon"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      // submitCanvasLink:
      //   "https://canvas.uw.edu/courses/1695984/assignments/8938950",
    },
    assignment3b: {
      type: "assignment",
      title: "Assignment 3b - Heuristic Evaluation",
      link: SiteLinks.assignmentsAssignment3Top.href,
      date: verifyCalendarDate("2024-02-13", "Tue"),
      // submission: 'other',
      // submitText: 'Submitted with Assignment 3c.',
    },
    assignment3c: {
      type: "assignment",
      title: "Assignment 3c - Usability Testing Check-In",
      link: SiteLinks.assignmentsAssignment3Top.href,
      date: verifyCalendarDate("2024-02-15", "Thu"),
      submission: "canvas",
      submitCanvasTime: "8:00pm",
      // submitCanvasLink:
      //   "https://canvas.uw.edu/courses/1695984/assignments/8938950",
    },
    assignment3d: {
      type: "assignment",
      title: "Assignment 3d - Usability Testing Review",
      link: SiteLinks.assignmentsAssignment3Top.href,
      date: verifyCalendarDate("2024-02-22", "Thu"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      // submitCanvasLink:
      //   "https://canvas.uw.edu/courses/1695984/assignments/8938950",
    },
    assignment3e: {
      type: "assignment",
      title: "Assignment 3e - Digital Mockup",
      link: SiteLinks.assignmentsAssignment3Top.href,
      date: verifyCalendarDate("2024-02-26", "Mon"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      // submitCanvasLink:
      //   "https://canvas.uw.edu/courses/1695984/assignments/8938950",
    },
    assignment3p: {
      type: "assignment",
      title: "Assignment 3p - Presentation",
      link: SiteLinks.assignmentsAssignment3Top.href,
      date: verifyCalendarDate("2024-02-28", "Wed"),
      submission: "canvas",
      submitCanvasTime: "8:00pm",
      // submitCanvasLink:
      //   "https://canvas.uw.edu/courses/1695984/assignments/8938950",
    },
    //
    // Assignment 4
    //
    assignment4poster: {
      type: "assignment",
      title: "Assignment 4poster - Poster and Pitch",
      link: SiteLinks.assignmentsAssignment4Top.href,
      date: verifyCalendarDate("2024-03-04", "Mon"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      // submitCanvasLink:
      //   "https://canvas.uw.edu/courses/1695984/assignments/8938950",
    },
    assignment4web: {
      type: "assignment",
      title: "Assignment 4web - Web Post",
      link: SiteLinks.assignmentsAssignment4Top.href,
      date: verifyCalendarDate("2024-03-05", "Tue"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      // submitCanvasLink:
      //   "https://canvas.uw.edu/courses/1695984/assignments/8938950",
    },
    assignment4poster_final: {
      type: "assignment",
      title: "Assignment 4poster_final - Poster and Pitch",
      link: SiteLinks.assignmentsAssignment4Top.href,
      date: verifyCalendarDate("2024-03-06", "Wed"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      // submitCanvasLink:
      //   "https://canvas.uw.edu/courses/1695984/assignments/8938950",
    },
    assignment4web_final: {
      type: "assignment",
      title: "Assignment 4web_final - Web Post",
      link: SiteLinks.assignmentsAssignment4Top.href,
      date: verifyCalendarDate("2024-03-07", "Thu"),
      submission: "canvas",
      submitCanvasTime: "8:00pm",
      // submitCanvasLink:
      //   "https://canvas.uw.edu/courses/1695984/assignments/8938950",
    },
  },

  events: [
    {
      type: "event",
      title: "Presentations",
      date: verifyCalendarDate("2024-02-08", "Thu"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
    },
    {
      type: "event",
      title: "Presentations",
      date: verifyCalendarDate("2024-02-09", "Fri"),
      timeAndLocations: SECTION_TIME_AND_LOCATIONS,
    },
    {
      type: "event",
      title: "Exam",
      date: verifyCalendarDate("2024-02-20", "Tue"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
    },
    {
      type: "event",
      title: "Presentations",
      date: verifyCalendarDate("2024-02-29", "Thu"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
    },
    {
      type: "event",
      title: "Presentations",
      date: verifyCalendarDate("2024-03-01", "Fri"),
      timeAndLocations: SECTION_TIME_AND_LOCATIONS,
    },
    {
      type: "event",
      title: "Poster Session",
      date: verifyCalendarDate("2024-03-11", "Mon"),
      timeAndLocation: POSTER_SESSION_TIME_AND_LOCATION,
    },
  ],
};
