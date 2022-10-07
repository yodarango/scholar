import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ThoughtsGrid } from "./thoughts_grid";

export default {
   title: "layouts/scrollers/Thoughts Grid",
   component: ThoughtsGrid
} as ComponentMeta<typeof ThoughtsGrid>;

export const Default: ComponentStory<typeof ThoughtsGrid> = () => <ThoughtsGrid />;
