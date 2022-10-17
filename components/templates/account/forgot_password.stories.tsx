import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ForgotPasswordTemplate } from "./forgot_password";

export default {
   title: "layouts/forms/Forgot Password",
   component: ForgotPasswordTemplate
} as ComponentMeta<typeof ForgotPasswordTemplate>;

export const ThoughtPost: ComponentStory<typeof ForgotPasswordTemplate> = () => (
   <ForgotPasswordTemplate />
);
