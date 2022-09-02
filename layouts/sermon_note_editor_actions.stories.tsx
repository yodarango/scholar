import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SermonNoteEditorActions } from "./sermon_note_editor_actions";

export default {
   title: "layouts/Quote Editor Actions",
   component: SermonNoteEditorActions
} as ComponentMeta<typeof SermonNoteEditorActions>;

export const Primary: ComponentStory<typeof SermonNoteEditorActions> = () => (
   <SermonNoteEditorActions
      sermonTitle='My title'
      categoryId='GRN'
      cta={{ handleCategory() {}, handleTitle() {} }}
   />
);
