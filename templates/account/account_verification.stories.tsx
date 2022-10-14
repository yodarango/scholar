import { ComponentMeta, ComponentStory } from "@storybook/react";

import { AccountVerification } from "./account_verification";

export default {
   title: "layouts/forms/Account Verification",
   component: AccountVerification
} as ComponentMeta<typeof AccountVerification>;

export const ThoughtPost: ComponentStory<typeof AccountVerification> = () => (
   <AccountVerification />
);
