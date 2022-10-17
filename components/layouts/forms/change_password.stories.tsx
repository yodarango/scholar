import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ChangePassword } from "./change_password";

export default {
   title: "layouts/forms/Change Password",
   component: ChangePassword
} as ComponentMeta<typeof ChangePassword>;

export const ThoughtPost: ComponentStory<typeof ChangePassword> = () => (
   <ChangePassword USER_ID='1' />
);
