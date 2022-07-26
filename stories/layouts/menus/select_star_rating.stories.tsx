import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SelectStarRating } from "../../../layouts/menus/select_star_rating";

export default {
   title: "layouts/menus/Select Star Rating",
   component: SelectStarRating
} as ComponentMeta<typeof SelectStarRating>;

export const Default: ComponentStory<typeof SelectStarRating> = () => (
   <SelectStarRating cta={{ handleCloseModal: () => console.log("modal should close") }} />
);
