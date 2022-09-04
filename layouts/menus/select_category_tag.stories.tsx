import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SelectCategoryTag } from "../../../layouts/menus/select_category_tag";

export default {
   title: "layouts/menus/Select Category Tag",
   component: SelectCategoryTag
} as ComponentMeta<typeof SelectCategoryTag>;

export const Default: ComponentStory<typeof SelectCategoryTag> = () => (
   <SelectCategoryTag cta={{ handleCloseModal: () => console.log("modal should close") }} />
);
