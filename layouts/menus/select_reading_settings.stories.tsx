import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SelectReadingSettings } from "../../../layouts/menus/select_reading_settings";

export default {
   title: "layouts/menus/Select Reading Settings",
   component: SelectReadingSettings
} as ComponentMeta<typeof SelectReadingSettings>;

export const Default: ComponentStory<typeof SelectReadingSettings> = () => (
   <SelectReadingSettings cta={{ handleCloseModal: () => console.log("modal should close") }} />
);
