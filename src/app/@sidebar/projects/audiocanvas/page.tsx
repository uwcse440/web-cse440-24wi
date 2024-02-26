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
          href: "/projects#projects",
        },
        [
          {
            anchor: "AudioCanvas",
            href: "/projects/audiocanvas",
          },
          {
            anchor: "AutoPilot",
            href: "/projects/autopilot",
          },
          {
            anchor: "BakeSmart",
            href: "/projects/bakesmart",
          },
          {
            anchor: "CookEase",
            href: "/projects/cookease",
          },
          {
            anchor: "Dapper Dany",
            href: "/projects/dapperdany",
          },
          {
            anchor: "FitQuest",
            href: "/projects/fitquest",
          },
          {
            anchor: "Home Hub Board",
            href: "/projects/homehubboard",
          },
          {
            anchor: "MessageMinder",
            href: "/projects/messageminder",
          },
          {
            anchor: "MindMii",
            href: "/projects/mindmii",
          },
          {
            anchor: "MindShift",
            href: "/projects/mindshift",
          },
          {
            anchor: "Music Box",
            href: "/projects/musicbox",
          },
          {
            anchor: "PupPals",
            href: "/projects/puppals",
          },
          {
            anchor: "ReelTalk",
            href: "/projects/reeltalk",
          },
          {
            anchor: "RestPad",
            href: "/projects/restpad",
          },
        ],
      ]}
    />
  );
}
