import { ComponentMeta, ComponentStory } from "@storybook/react";

import { TimeStamp } from "../../../fragments/chunks/time_stamp";

export default {
   title: "fragments/chunks/Time Stamp",
   component: TimeStamp
} as ComponentMeta<typeof TimeStamp>;

export const Default: ComponentStory<typeof TimeStamp> = () => (
   <TimeStamp time='2007-12-31 23:59:59.999999' quiet={false} niceTime={"07/19/22 10:59pm"} />
);

export const CustomColor: ComponentStory<typeof TimeStamp> = () => (
   <TimeStamp
      time='2007-12-31 23:59:59.999999'
      quiet={false}
      niceTime={"07/19/22 10:59pm"}
      customColor='#345412'
      shadowColor='#F2f2f2'
   />
);

export const WithColorId: ComponentStory<typeof TimeStamp> = () => (
   <TimeStamp
      time='2007-12-31 23:59:59.999999'
      quiet={false}
      niceTime={"07/19/22 10:59pm"}
      colorId='category-PNK'
   />
);
