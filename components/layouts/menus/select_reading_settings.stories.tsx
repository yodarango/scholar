import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SelectReadingSettings } from "./select_reading_settings";

export default {
   title: "layouts/menus/Select Reading Settings",
   component: SelectReadingSettings
} as ComponentMeta<typeof SelectReadingSettings>;

export const Default: ComponentStory<typeof SelectReadingSettings> = () => (
   <SelectReadingSettings
      cta={{
         handleCloseModal: () => console.log("modal should close"),
         handleFontSelection: (value: string) => console.log(value),
         handleThemeSelection: (value: string) => console.log(value)
      }}
   />
);
