import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SearchInputWCat } from "./search_input_w_cat";

export default {
   title: "fragments/Search Input With Category",
   component: SearchInputWCat
} as ComponentMeta<typeof SearchInputWCat>;

export const Commentaries: ComponentStory<typeof SearchInputWCat> = () => (
   <SearchInputWCat placeHolder='Search anything...' />
);
