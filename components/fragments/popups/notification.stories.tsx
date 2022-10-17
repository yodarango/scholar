import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Notification } from "./notification";

export default {
   title: "fragments/popups/Notification",
   component: Notification
} as ComponentMeta<typeof Notification>;

export const Info: ComponentStory<typeof Notification> = () => (
   <Notification
      cta={{ handleClose: () => console.log("...") }}
      title={"Title"}
      type='1'
      body='lorem ipsum'
   />
);

export const Safe: ComponentStory<typeof Notification> = () => (
   <Notification
      cta={{ handleClose: () => console.log("...") }}
      title={"Title"}
      type='2'
      body='lorem ipsum'
   />
);
export const Warning: ComponentStory<typeof Notification> = () => (
   <Notification
      cta={{ handleClose: () => console.log("...") }}
      title={"Title"}
      type='3'
      body='lorem ipsum'
   />
);

export const Danger: ComponentStory<typeof Notification> = () => (
   <Notification
      cta={{ handleClose: () => console.log("...") }}
      title={"Title"}
      type='4'
      body='lorem ipsum'
   />
);
