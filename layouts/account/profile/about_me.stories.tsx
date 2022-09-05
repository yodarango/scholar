import { ComponentStory, ComponentMeta } from "@storybook/react";

import { AboutMe } from "./about_me";

export default {
   title: "layouts/account/About Me",
   component: AboutMe
} as ComponentMeta<typeof AboutMe>;

export const Default: ComponentStory<typeof AboutMe> = () => (
   <AboutMe
      userId='432'
      myChurch='My good Lord knows'
      ministry='worthless slave'
      favBibleVerse='1 Peter 1:8'
      fullTimeJob='Software Engneer'
      colorPersonality='green'
      favColor='Gray'
   />
);
