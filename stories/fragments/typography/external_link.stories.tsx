import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ExternalLink } from "../../../fragments/Typography/external_link";

export default {
   title: "fragments/typography/External Link",
   component: ExternalLink
} as ComponentMeta<typeof ExternalLink>;

export const Main: ComponentStory<typeof ExternalLink> = () => (
   <ExternalLink text='my link' size='large' type={"2"} href='#' />
);
