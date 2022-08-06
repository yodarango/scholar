import { ComponentMeta, ComponentStory } from "@storybook/react";

import { TextEditorActions } from "../../layouts/text_editor_actions";

export default {
   title: "layouts/Text Editor Actions",
   component: TextEditorActions
} as ComponentMeta<typeof TextEditorActions>;

export const Primary: ComponentStory<typeof TextEditorActions> = () => (
   <TextEditorActions
      cta={{
         handleRefVerseSelection(id) {
            console.log(id);
         }
      }}
   />
);
