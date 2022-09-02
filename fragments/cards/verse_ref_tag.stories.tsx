import { ComponentMeta, ComponentStory } from "@storybook/react";

import { VerseRefTag } from "../../../fragments/chunks/verse_ref_tag";

export default {
   title: "fragments/cards/Verse Reference Tag",
   component: VerseRefTag
} as ComponentMeta<typeof VerseRefTag>;

export const WithoutCloseOption: ComponentStory<typeof VerseRefTag> = () => (
   <VerseRefTag
      reference='1CO.2.2'
      versionId='de4e12af7f28f599-02'
      showRemoveoption={false}
      cta={(id) => console.log(id)}
   />
);

export const WithCloseOption: ComponentStory<typeof VerseRefTag> = () => (
   <VerseRefTag
      reference='1CO.2.2'
      versionId='de4e12af7f28f599-02'
      showRemoveoption={true}
      cta={(id) => console.log(id)}
   />
);
