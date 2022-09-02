import { ComponentMeta, ComponentStory } from "@storybook/react";

import { NotificationSticker } from "./notification_sticker";

export default {
   title: "fragments/cards/Notification Sticker",
   component: NotificationSticker
} as ComponentMeta<typeof NotificationSticker>;

export const Informative: ComponentStory<typeof NotificationSticker> = () => (
   <NotificationSticker type='1' text='My message goes in this box' />
);

export const InformativeQuiet: ComponentStory<typeof NotificationSticker> = () => (
   <NotificationSticker type='2' text='My message goes in this box' />
);

export const Success: ComponentStory<typeof NotificationSticker> = () => (
   <NotificationSticker type='3' text='My message goes in this box' />
);

export const Warning: ComponentStory<typeof NotificationSticker> = () => (
   <NotificationSticker type='4' text='My message goes in this box' />
);

export const Sunday: ComponentStory<typeof NotificationSticker> = () => (
   <NotificationSticker type='5' text='My message goes in this box' />
);
