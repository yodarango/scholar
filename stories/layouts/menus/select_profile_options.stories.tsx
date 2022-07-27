import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SelectProfileOptions } from "../../../layouts/menus/select_profile_options";

export default {
   title: "layouts/menus/Select Profile Options",
   component: SelectProfileOptions
} as ComponentMeta<typeof SelectProfileOptions>;

export const WithoutUserNotifications: ComponentStory<typeof SelectProfileOptions> = () => (
   <SelectProfileOptions
      cta={{ handleCloseModal: () => console.log("modal should close") }}
      userHasNotifications={false}
   />
);

export const WithUserNotifications: ComponentStory<typeof SelectProfileOptions> = () => (
   <SelectProfileOptions
      cta={{ handleCloseModal: () => console.log("modal should close") }}
      userHasNotifications={true}
   />
);
