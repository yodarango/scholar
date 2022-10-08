import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Profile } from "./profile";

export default {
   title: "layouts/Profile Template",
   component: Profile
} as ComponentMeta<typeof Profile>;

export const Primary: ComponentStory<typeof Profile> = () => <Profile username='user' />;
