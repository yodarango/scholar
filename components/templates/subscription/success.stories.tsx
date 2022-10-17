import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SuccessTemplate } from "./success";

export default {
   title: "Templates/Subscription Success",
   component: SuccessTemplate
} as ComponentMeta<typeof SuccessTemplate>;
SuccessTemplate;
export const Primary: ComponentStory<typeof SuccessTemplate> = () => (
   <SuccessTemplate email='me@mail.com' name='ego' />
);
