import { ComponentMeta, ComponentStory } from "@storybook/react";

import { BackLink } from "../../../fragments/buttons/back_link";

export default {
   title: "fragments/buttons/Go Back",
   component: BackLink
} as ComponentMeta<typeof BackLink>;

export const Default: ComponentStory<typeof BackLink> = () => <BackLink title='Back' link='#' />;
