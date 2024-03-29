import * as React from "react";

import { Sidebar } from "@/components/Sidebar";

import { SITE_LINKS } from "../sitelinks";

export default function Page(): React.ReactElement {
  return (
    <Sidebar
      siteLinks={SITE_LINKS}
      pageLinks={[
        {
          anchor: "Assignments",
          href: "#assignments",
        },
        [
          {
            anchor: "Clarity and Presentation",
            href: "#clarity-and-presentation",
          },
          {
            anchor: "Contribution Statements",
            href: "#contribution-statements",
          },
        ],
      ]}
    />
  );
}
