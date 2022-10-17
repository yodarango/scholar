import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SettingsFieldButton } from "../../../fragments/buttons/settings_field_button";

export default {
   title: "fragments/buttons/Settings Field",
   component: SettingsFieldButton
} as ComponentMeta<typeof SettingsFieldButton>;

export const WithCta: ComponentStory<typeof SettingsFieldButton> = () => (
   <SettingsFieldButton
      cta={{ handleClick: () => console.log("...") }}
      label='Username'
      value='Username'
   />
);

export const WithLink: ComponentStory<typeof SettingsFieldButton> = () => (
   <SettingsFieldButton link='#' label='Username' value='Username' />
);
