import * as React from "react";

import { Sidebar } from "@/components/Sidebar";

import { SITE_LINKS } from "./sitelinks";

export default function Page(): React.ReactElement {
  return (
    <Sidebar
      siteLinks={SITE_LINKS}
      pageLinks={[
        {
          anchor: "Course Overview",
          href: "#course-overview",
        },
        [
          {
            anchor: "Course Description",
            href: "#course-description",
          },
          {
            anchor: "Learning Objectives",
            href: "#learning-objectives",
          },
          {
            anchor: "Course Staff",
            href: "#course-staff",
          },
          {
            anchor: "Course Coordination",
            href: "#course-coordination",
          },
          {
            anchor: "Assignments",
            href: "#assignments",
          },
          {
            anchor: "Grading",
            href: "#grading",
          },
          {
            anchor: "Participation and COVID-19 Safety",
            href: "#participation-and-covid-19-safety",
          },
          {
            anchor: "Accommodations and University Policies",
            href: "#accommodations-and-university-policies",
          },
          {
            anchor: "Course Website",
            href: "#course-website",
          },
        ],
      ]}
    />
  );
}
