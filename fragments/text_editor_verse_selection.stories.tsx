import { ComponentMeta, ComponentStory } from "@storybook/react";

import { TextEditorVerseSelection } from "./text_editor_verse_selection";

export default {
   title: "layouts/text Editor Verse Selection",
   component: TextEditorVerseSelection
} as ComponentMeta<typeof TextEditorVerseSelection>;

export const Primary: ComponentStory<typeof TextEditorVerseSelection> = () => (
   <TextEditorVerseSelection
      cta={{
         handleVerseData(data) {
            console.log(data);
         }
      }}
   />
);
