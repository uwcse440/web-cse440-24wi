import * as React from "react";

import { Sidebar } from "@/components/Sidebar";

import { SITE_LINKS } from "../../sitelinks";

export default function Page(): React.ReactElement {
  return (
    <Sidebar
      siteLinks={SITE_LINKS}
      pageLinks={[
        {
          anchor: "Assignment 2",
          href: "#assignment-2",
        },
        [
          {
            anchor: "2a - Project Ideation",
            href: "#assignment-2a-project-ideation",
          },
        ],
      ]}
    />
  );
}
