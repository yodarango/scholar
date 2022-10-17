import { ComponentMeta, ComponentStory } from "@storybook/react";

import { EmailVerification } from "./email_verification";

export default {
   title: "layouts/forms/Email Verification",
   component: EmailVerification
} as ComponentMeta<typeof EmailVerification>;

export const ThoughtPost: ComponentStory<typeof EmailVerification> = () => <EmailVerification />;
