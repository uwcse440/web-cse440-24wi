import * as React from "react";

import { Sidebar } from "@/components/Sidebar";

import { SITE_LINKS } from "../../sitelinks";

export default function Page(): React.ReactElement {
  return (
    <Sidebar
      siteLinks={SITE_LINKS}
      pageLinks={[
        {
          anchor: "Projects",
          href: "#calendar",
        },
        [
          {
            anchor: "Project 1",
            href: "/projects/project01",
          },
          {
            anchor: "Project 2",
            href: "/projects/project02",
          },
          {
            anchor: "Project 3",
            href: "/projects/project03",
          },
          {
            anchor: "Project 4",
            href: "/projects/project04",
          },
          {
            anchor: "Project 5",
            href: "/projects/project05",
          },
          {
            anchor: "Project 6",
            href: "/projects/project06",
          },
          {
            anchor: "Project 7",
            href: "/projects/project07",
          },
          {
            anchor: "Project 8",
            href: "/projects/project08",
          },
          {
            anchor: "Project 9",
            href: "/projects/project09",
          },
          {
            anchor: "Project 10",
            href: "/projects/project10",
          },
          {
            anchor: "Project 11",
            href: "/projects/project11",
          },
          {
            anchor: "Project 12",
            href: "/projects/project12",
          },
          {
            anchor: "Project 13",
            href: "/projects/project13",
          },
        ],
      ]}
    />
  );
}
