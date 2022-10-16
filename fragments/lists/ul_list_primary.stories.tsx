import { ComponentStory, ComponentMeta } from "@storybook/react";

import { UlListPrimary } from "./ul_list_primary";

export default {
   title: "Fragments/Lists/UL Primary",
   component: UlListPrimary
} as ComponentMeta<typeof UlListPrimary>;

export const Default: ComponentStory<typeof UlListPrimary> = () => (
   <UlListPrimary items={["firs", "second", "third"]} icon='checkmarkFilled' />
);
