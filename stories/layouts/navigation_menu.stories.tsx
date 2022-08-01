import { ComponentMeta, ComponentStory } from "@storybook/react";

import { NavigationMain } from "../../layouts/navigation_main";

export default {
   title: "layouts/Navigation Main",
   component: NavigationMain
} as ComponentMeta<typeof NavigationMain>;

export const Primary: ComponentStory<typeof NavigationMain> = () => <NavigationMain />;
