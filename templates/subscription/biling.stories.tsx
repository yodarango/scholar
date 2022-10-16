import { ComponentMeta, ComponentStory } from "@storybook/react";

import { BillingTemplate } from "./billing";

export default {
   title: "Templates/Subscription Success",
   component: BillingTemplate
} as ComponentMeta<typeof BillingTemplate>;
BillingTemplate;
export const Primary: ComponentStory<typeof BillingTemplate> = () => <BillingTemplate />;
