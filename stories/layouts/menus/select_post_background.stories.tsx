import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SelectPostBackground } from "../../../layouts/menus/select_post_background";

export default {
   title: "layouts/menus/Select Post Background",
   component: SelectPostBackground
} as ComponentMeta<typeof SelectPostBackground>;

export const Default: ComponentStory<typeof SelectPostBackground> = () => (
   <SelectPostBackground
      cta={{
         handleCloseModal: () => console.log("close modal"),
         handleValue: (value) => console.log(value)
      }}
   />
);
