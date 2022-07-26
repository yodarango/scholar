import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SelectPostRatingMenu } from "../../../layouts/menus/select_post_rating";

export default {
   title: "layouts/menus/Select Post Rating",
   component: SelectPostRatingMenu
} as ComponentMeta<typeof SelectPostRatingMenu>;

export const Default: ComponentStory<typeof SelectPostRatingMenu> = () => (
   <SelectPostRatingMenu cta={{ handleCloseModal: () => console.log("modal should close") }} />
);
