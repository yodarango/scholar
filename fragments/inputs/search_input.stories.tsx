import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SearchInput } from "../../../fragments/inputs/search_input";

export default {
   title: "fragments/inputs/Searh Input",
   component: SearchInput
} as ComponentMeta<typeof SearchInput>;

export const WithoutButton: ComponentStory<typeof SearchInput> = () => (
   <SearchInput placeholder='Search' maxL={25} cta={{ handleOnChange: (e) => console.log(e) }} />
);

export const WithButton: ComponentStory<typeof SearchInput> = () => (
   <SearchInput placeholder='Search' maxL={25} cta={{ handleSearchGo: (e) => console.log(e) }} />
);
