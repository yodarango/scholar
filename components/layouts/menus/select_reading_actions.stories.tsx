import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SelectReadingActions } from "./select_reading_actions";

export default {
   title: "layouts/menus/Select Reading Actions",
   component: SelectReadingActions
} as ComponentMeta<typeof SelectReadingActions>;

export const Default: ComponentStory<typeof SelectReadingActions> = () => (
   <SelectReadingActions cta={{ handleCloseModal: () => console.log("modal should close") }} />
);
