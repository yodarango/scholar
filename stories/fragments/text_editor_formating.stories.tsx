import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TextEditorFormating } from "../../fragments/text_editor_formating";

export default {
   title: "fragments/Text Editor Formating",
   component: TextEditorFormating
} as ComponentMeta<typeof TextEditorFormating>;

export const Default: ComponentStory<typeof TextEditorFormating> = () => <TextEditorFormating />;
