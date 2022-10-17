import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ProfilePostStats } from "./profile_post_stats";

export default {
   title: "fragments/chunks/Profile Stats",
   component: ProfilePostStats
} as ComponentMeta<typeof ProfilePostStats>;

export const Commentaries: ComponentStory<typeof ProfilePostStats> = () => (
   <ProfilePostStats
      totalPosts={55}
      contentType='commentaries'
      icon='comment'
      iconColor='#B293FE'
   />
);

export const Thoughts: ComponentStory<typeof ProfilePostStats> = () => (
   <ProfilePostStats totalPosts={55} contentType='thoughts' icon='think' iconColor='#533CA3' />
);

export const Quotes: ComponentStory<typeof ProfilePostStats> = () => (
   <ProfilePostStats totalPosts={55} contentType='quote' icon='quote' iconColor='#F1EAFF' />
);

export const SermonNotes: ComponentStory<typeof ProfilePostStats> = () => (
   <ProfilePostStats totalPosts={55} contentType='sermon notes' icon='folder' iconColor='#7350EC' />
);
