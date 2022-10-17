import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SelectpostOptions } from "../../../layouts/menus/select_post_options";

export default {
   title: "layouts/menus/Select Post Options",
   component: SelectpostOptions
} as ComponentMeta<typeof SelectpostOptions>;

export const Default: ComponentStory<typeof SelectpostOptions> = () => (
   <SelectpostOptions
      cta={{ handleCloseModal: () => console.log("modal should close") }}
      postType='quote'
      postid='123'
   />
);
