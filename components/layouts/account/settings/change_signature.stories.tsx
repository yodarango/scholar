import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ChangeSignature } from "./change_signature";

export default {
   title: "Layouts/Account/Profile/Settings/ChangeSignature",
   component: ChangeSignature
} as ComponentMeta<typeof ChangeSignature>;

export const Google: ComponentStory<typeof ChangeSignature> = () => (
   <ChangeSignature signature='yodarango' />
);
