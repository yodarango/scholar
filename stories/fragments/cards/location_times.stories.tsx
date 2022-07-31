import { ComponentMeta, ComponentStory } from "@storybook/react";

import { LocationTimes } from "../../../fragments/cards/location_times";

export default {
   title: "fragments/cards/Location times",
   component: LocationTimes
} as ComponentMeta<typeof LocationTimes>;

export const AM: ComponentStory<typeof LocationTimes> = () => (
   <LocationTimes serviceInfo='Sunday: 10:00am' />
);

export const PM: ComponentStory<typeof LocationTimes> = () => (
   <LocationTimes serviceInfo='Sunday: 06:00pm' />
);
