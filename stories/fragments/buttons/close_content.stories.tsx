import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CategoryTag } from "../../../fragments/chunks/category_tag";

export default {
   title: "fragments/chunks/Category Tag",
   component: CategoryTag
} as ComponentMeta<typeof CategoryTag>;

export const Default: ComponentStory<typeof CategoryTag> = () => <CategoryTag id={"CYN"} />;
