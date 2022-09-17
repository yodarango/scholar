import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ReadSettings } from "./read_settings";

export default {
   title: "fragments/chunks/Read Settings",
   component: ReadSettings
} as ComponentMeta<typeof ReadSettings>;

export const Default: ComponentStory<typeof ReadSettings> = () => (
   <ReadSettings
      cta={{
         handleFontSelection: (value: string) => console.log(value),
         handleThemeSelection: (value: string) => console.log(value)
      }}
   />
);
