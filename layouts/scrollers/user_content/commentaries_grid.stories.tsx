import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ComentariesGrid } from "./commentaries_grid";

export default {
   title: "layouts/scrollers/Commentaries Grid",
   component: ComentariesGrid
} as ComponentMeta<typeof ComentariesGrid>;

export const Default: ComponentStory<typeof ComentariesGrid> = () => <ComentariesGrid />;
