import { ComponentMeta, ComponentStory } from "@storybook/react";

import { UserNotificationsWrapper } from "./user_notifications_wrapper";

export default {
   title: "fragments/cards/User Notifications",
   component: UserNotificationsWrapper
} as ComponentMeta<typeof UserNotificationsWrapper>;

export const WithoutCloseOption: ComponentStory<typeof UserNotificationsWrapper> = () => (
   <UserNotificationsWrapper />
);
