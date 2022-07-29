import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SearchInput } from "../../../fragments/inputs/search_input";

export default {
   title: "fragments/inputs/Searh With Onchange",
   component: SearchInput
} as ComponentMeta<typeof SearchInput>;

export const Default: ComponentStory<typeof SearchInput> = () => (
   <SearchInput placeholder='Search' maxL={25} cta={{ handleOnChange: (e) => console.log(e) }} />
);
