import { ComponentMeta, ComponentStory } from "@storybook/react";

import { TextEditorTextArea } from "../../../fragments/inputs/text_editor_text_area";

export default {
   title: "fragments/inputs/Text Editor Text area",
   component: TextEditorTextArea
} as ComponentMeta<typeof TextEditorTextArea>;

export const Default: ComponentStory<typeof TextEditorTextArea> = () => (
   <TextEditorTextArea
      defaultValue=''
      maxLength={999}
      placeHolder='Commentary...'
      cta={{
         handleCurrentValue(body) {
            console.log(body);
         }
      }}
   />
);
