import * as React from "react";

export type CourseDataLinkHREF = string;

export type CourseDataLinkKey = {
  href?: CourseDataLinkHREF;
  anchor?: React.ReactNode;
};

export const courseData = {
  linkAccessiblePresentations: {
    href: "https://interactions.acm.org/archive/view/july-august-2017/making-your-presentation-accessible",
    anchor: "Guidance on Making Your Presentation Accessible",
  },
} as const;
