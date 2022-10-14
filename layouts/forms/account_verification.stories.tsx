import { ComponentMeta, ComponentStory } from "@storybook/react";

import { AccountVerificationForm } from "./account_verification";

export default {
   title: "layouts/forms/Account Verification",
   component: AccountVerificationForm
} as ComponentMeta<typeof AccountVerificationForm>;

export const ThoughtPost: ComponentStory<typeof AccountVerificationForm> = () => (
   <AccountVerificationForm />
);
