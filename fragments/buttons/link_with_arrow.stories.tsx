import { ComponentMeta, ComponentStory } from "@storybook/react";

import { LinkWithArrow } from "../../../fragments/buttons/link_with_arrow";

export default {
   title: "fragments/buttons/link With Arrow",
   component: LinkWithArrow
} as ComponentMeta<typeof LinkWithArrow>;

export const GoogleTypeOneLink: ComponentStory<typeof LinkWithArrow> = () => (
   <LinkWithArrow title='My button' link='#' />
);
