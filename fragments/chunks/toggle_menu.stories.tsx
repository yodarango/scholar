import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ToggleMenu } from "./toggle_menu";

export default {
   title: "fragments/chunks/Toggle Menu",
   component: ToggleMenu
} as ComponentMeta<typeof ToggleMenu>;

export const Primary: ComponentStory<typeof ToggleMenu> = () => <ToggleMenu />;
