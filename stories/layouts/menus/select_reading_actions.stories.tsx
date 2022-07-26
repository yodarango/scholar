import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SelectReadingACtions } from "../../../layouts/menus/select_reading_actions";

export default {
   title: "layouts/menus/Select Reading Actions",
   component: SelectReadingACtions
} as ComponentMeta<typeof SelectReadingACtions>;

export const Default: ComponentStory<typeof SelectReadingACtions> = () => (
   <SelectReadingACtions cta={{ handleCloseModal: () => console.log("modal should close") }} />
);
