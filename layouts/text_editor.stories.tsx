import { ComponentMeta, ComponentStory } from "@storybook/react";

import { TextEditor } from "../../layouts/text_editor";

export default {
   title: "layouts/Text Editor ",
   component: TextEditor
} as ComponentMeta<typeof TextEditor>;

export const ThoughtPost: ComponentStory<typeof TextEditor> = () => (
   <TextEditor
      body={`# Title (link)[www.example.com]`}
      postImage='/images/bible_books/1.png'
      userAuthority={1}
      userId='123'
      username='Username'
      avatar='/images/user_avatar'
      postPostedOnDate='08/11/22 09:00'
      postCreatedDate='08/11/22 09:00'
      postCategory='YLW'
      postReferences={["1CO.1.1", "MAT.3.2"]}
      postPrivacy={true}
      cta={{
         handleCategorySelection() {},
         handlePrivacySelection() {},
         handleRefVerseSelection() {},
         handlePost() {},
         handleBody() {},
         handleReferencedVerses() {}
      }}
   />
);
