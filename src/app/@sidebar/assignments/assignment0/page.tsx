import * as React from "react";

import { Sidebar } from "@/components/Sidebar";

import { SITE_LINKS } from "../../sitelinks";

export default function Page(): React.ReactElement {
  return (
    <Sidebar
      siteLinks={SITE_LINKS}
      pageLinks={[
        {
          anchor: "Assignment 0",
          href: "#assignment-0",
        },
      ]}
    />
  );
}
