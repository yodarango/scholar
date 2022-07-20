import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Notification } from "../../../fragments/popups/notification";

export default {
   title: "fragments/popups/Notification",
   component: Notification
} as ComponentMeta<typeof Notification>;

export const Default: ComponentStory<typeof Notification> = () => (
   <Notification cta={() => console.log("...")} title={"Title"} type='danger' body='lorem ipsum' />
);
