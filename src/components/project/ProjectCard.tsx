import * as React from "react";
import { FunctionComponent } from "react";

import { AppLink } from "@/components/links/AppLink";
import { Paths } from "@/paths.mjs";
import { Card, CardContent, Stack } from "@mui/material";
import Image from "next-image-export-optimizer";

interface ProjectCardProps {
  name: string;
  logo: string;
  path: string;
}

export const ProjectCard: FunctionComponent<ProjectCardProps> = (props) => {
  return (
    <Card>
      <CardContent>
        <AppLink href={"/projects/" + props.path}>
          <Stack>
            {props.name}
            <Image
              src={props.logo}
              basePath={Paths.basePath}
              height="150"
              width="150"
              alt={"Project Logo: " + props.name}
            />
          </Stack>
        </AppLink>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
