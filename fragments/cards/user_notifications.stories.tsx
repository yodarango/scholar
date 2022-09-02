import { ComponentMeta, ComponentStory } from "@storybook/react";

import { UserNotifications } from "./user_notification";

export default {
   title: "fragments/cards/User Notifications",
   component: UserNotifications
} as ComponentMeta<typeof UserNotifications>;

export const WithoutCloseOption: ComponentStory<typeof UserNotifications> = () => (
   <UserNotifications ID='213' postId='123' postType={1} body='This with notification' />
);
