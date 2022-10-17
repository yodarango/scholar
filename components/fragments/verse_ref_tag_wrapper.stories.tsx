import { ComponentStory, ComponentMeta } from "@storybook/react";

import { VerseRefTagWrapper } from "../../fragments/verse_ref_tag_wrapper";

export default {
   title: "fragments/Verse Reference Wrapper",
   component: VerseRefTagWrapper
} as ComponentMeta<typeof VerseRefTagWrapper>;

export const WithoutRemoveOption: ComponentStory<typeof VerseRefTagWrapper> = () => (
   <VerseRefTagWrapper
      refs={["1CO.2.2", "1CO.2.3", "JHN.1.1", "1PE.1.8"]}
      showRemoveoption={false}
      cta={{ handleUpdateTagArray: (tags) => console.log(tags) }}
   />
);

export const WithRemoveOption: ComponentStory<typeof VerseRefTagWrapper> = () => (
   <VerseRefTagWrapper
      refs={["1CO.2.2", "1CO.2.3", "JHN.1.1", "1PE.1.8"]}
      showRemoveoption={true}
      cta={{ handleUpdateTagArray: (tags) => console.log(tags) }}
   />
);
