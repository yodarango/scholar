import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SelectBibleVersion } from "./select_bible_version";

export default {
   title: "layouts/menus/Select Bible Versions",
   component: SelectBibleVersion
} as ComponentMeta<typeof SelectBibleVersion>;

export const English: ComponentStory<typeof SelectBibleVersion> = () => (
   <SelectBibleVersion
      cta={{
         handleSelection: (item) => console.log("console.log", item),
         handleCloseModal: () => console.log("modal close")
      }}
   />
);

export const Spanish: ComponentStory<typeof SelectBibleVersion> = () => (
   <SelectBibleVersion
      cta={{
         handleSelection: (item) => console.log("console.log", item),
         handleCloseModal: () => console.log("modal close")
      }}
   />
);
