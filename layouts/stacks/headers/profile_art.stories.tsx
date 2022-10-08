import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProfileArt } from "./profile_art";

export default {
   title: "layouts/stacks/Profile Art",
   component: ProfileArt
} as ComponentMeta<typeof ProfileArt>;

export const Primary: ComponentStory<typeof ProfileArt> = () => (
   <ProfileArt title='Primary background' />
);
