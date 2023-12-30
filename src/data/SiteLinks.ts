import { SiteLinkKey } from "@/types/SiteLinks";

export const SiteLinks = {
  homeTop: {
    href: "/#course-overview",
    anchor: "Course Overview",
  },

  assignmentsTop: {
    href: "/assignments/#assignments",
    anchor: "Assignments",
  },
  assignmentsAssignment0Top: {
    href: "/assignments/assignment0/#assignment-0",
    anchor: "Assignment 0",
  },
  assignmentsAssignment1Top: {
    href: "/assignments/assignment0/#assignment-1",
    anchor: "Assignment 1",
  },
  assignmentsAssignment2Top: {
    href: "/assignments/assignment2/#assignment-2",
    anchor: "Assignment 2",
  },
  assignmentsAssignment3Top: {
    href: "/assignments/assignment3/#assignment-3",
    anchor: "Assignment 3",
  },
  assignmentsAssignment4Top: {
    href: "/assignments/assignment3/#assignment-4",
    anchor: "Assignment 4",
  },
  assignmentsExamTop: {
    href: "/assignments/exam/#exam",
    anchor: "Exam",
  },

  calendarTop: {
    href: "/calendar/#calendar",
    anchor: "Calendar",
  },
} as const;
