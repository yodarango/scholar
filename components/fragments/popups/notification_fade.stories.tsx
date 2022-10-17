import { ComponentMeta, ComponentStory } from "@storybook/react";

import { NotificationFade } from "./notification_fade";

export default {
   title: "fragments/popups/Notification Fade",
   component: NotificationFade
} as ComponentMeta<typeof NotificationFade>;

export const Info: ComponentStory<typeof NotificationFade> = () => (
   <NotificationFade type='1' body='lorem ipsum' render={0} />
);

export const Safe: ComponentStory<typeof NotificationFade> = () => (
   <NotificationFade type='2' body='lorem ipsum' render={0} />
);
export const Warning: ComponentStory<typeof NotificationFade> = () => (
   <NotificationFade type='3' body='lorem ipsum' render={0} />
);

export const Danger: ComponentStory<typeof NotificationFade> = () => (
   <NotificationFade type='4' body='lorem ipsum' render={0} />
);
