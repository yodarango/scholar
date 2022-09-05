import { ComponentStory, ComponentMeta } from "@storybook/react";

import { UserPostStats } from "./user_post_stats";

export default {
   title: "layouts/account/User Post Stats",
   component: UserPostStats
} as ComponentMeta<typeof UserPostStats>;

export const Default: ComponentStory<typeof UserPostStats> = () => (
   <UserPostStats commentaries={45} thoughts={11} quotes={67} sermonNotes={27} />
);
