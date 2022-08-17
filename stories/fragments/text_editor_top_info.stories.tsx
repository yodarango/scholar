import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TextEditorTopInfo } from "../../fragments/text_editor_top_info";

export default {
   title: "fragments/Text Editor Formating",
   component: TextEditorTopInfo
} as ComponentMeta<typeof TextEditorTopInfo>;

export const Default: ComponentStory<typeof TextEditorTopInfo> = () => (
   <TextEditorTopInfo
      userAuthority={1}
      userId='123'
      username='username'
      avatar='avatar'
      postPostedOnDate='12/12/12 12:00'
      postCreatedDate='12/12/12 12:00'
      postCategory='PPL'
      cta={{
         handleCloseModal: () => console.log("clos"),
         handleImageBkgSelection: (url: string) => console.log(url)
      }}
   />
);
