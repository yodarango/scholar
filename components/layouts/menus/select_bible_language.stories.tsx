import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SelectBibleLanguage } from "../../../layouts/menus/select_bible_laguage";

export default {
   title: "layouts/menus/Select Bible Languages",
   component: SelectBibleLanguage
} as ComponentMeta<typeof SelectBibleLanguage>;

export const Default: ComponentStory<typeof SelectBibleLanguage> = () => (
   <SelectBibleLanguage
      cta={{
         handleSelection: (item) => console.log("console.log", item),
         handleCloseModal: () => console.log("modal close")
      }}
   />
);
