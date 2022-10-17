import { ComponentMeta, ComponentStory } from "@storybook/react";

import { TextEditorActions } from "../../layouts/text_editor_actions";

export default {
   title: "layouts/Text Editor Actions",
   component: TextEditorActions
} as ComponentMeta<typeof TextEditorActions>;

export const Default: ComponentStory<typeof TextEditorActions> = () => (
   <TextEditorActions
      postReferences={[
         "JHN.1.1",
         "ROM.3.4",
         "EST.3.3",
         "JHN.1.1",
         "ROM.3.4",
         "EST.3.3",
         "JHN.1.1",
         "ROM.3.4",
         "EST.3.3"
      ]}
      content={
         <div>
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a
            piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard
            McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of
            the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through
            the cites of the word in classical literature, discovered the undoubtable source. Lorem
            Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The
            Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the
            theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,
            "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk
            of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections
            1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced
            in their exact original form, accompanied by English versions from the 1914 translation
            by H. Rackham. Contrary to popular belief, Lorem Ipsum is not simply random text. It has
            roots in a piece of classical Latin literature from 45 BC, making it over 2000 years
            old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked
            up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature, discovered the undoubtable
            source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
            Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a
            treatise on the theory of ethics, very popular during the Renaissance. The first line of
            Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The
            standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those
            interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero
            are also reproduced in their exact original form, accompanied by English versions from
            the 1914 translation by H. Rackham.
         </div>
      }
      cta={{ handleRefVerseSelection: (id) => console.log("close modal", id) }}
      postImage='/images/bible_books/1.png'
      userAuthority={1}
      userId='1'
      username='username'
      avatar='/images/user_avatars/default.png'
      postPostedOnDate='07/08/2022 11:00'
      postCreatedDate='07/08/2022 11:00'
      postCategory='PNK'
   />
);
