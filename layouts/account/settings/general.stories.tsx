import { ComponentMeta, ComponentStory } from "@storybook/react";

import { General } from "./general";

export default {
   title: "Layouts/Account/Profile/Settings/General",
   component: General
} as ComponentMeta<typeof General>;

export const Google: ComponentStory<typeof General> = () => <General />;
