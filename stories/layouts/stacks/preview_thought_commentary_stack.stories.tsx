import { ComponentMeta, ComponentStory } from "@storybook/react";

import { PreviewThoughtCommentaryStack } from "../../../layouts/stacks/preview_thought_commentary_stack";

export default {
   title: "layouts/stacks/Preview Thought & Comentary Stack",
   component: PreviewThoughtCommentaryStack
} as ComponentMeta<typeof PreviewThoughtCommentaryStack>;

export const WithEditOption: ComponentStory<typeof PreviewThoughtCommentaryStack> = () => (
   <PreviewThoughtCommentaryStack
      postReferences={["JHN.1.1", "ROM.3.4", "EST.3.3"]}
      content={<div>this is my content</div>}
      cta={{ handleCloseModal: () => console.log("close modal") }}
      postImage='/images/bible_books/1.png'
      userAuthority={1}
      userId='1'
      username='username'
      avatar='/images/user_avatars/default.png'
      postPostedOnDate='07/08/2022 11:00'
      postCreatedDate='07/08/2022 11:00'
      postCategory='PNK'
      withEditOption={true}
   />
);

export const WithOutEditOption: ComponentStory<typeof PreviewThoughtCommentaryStack> = () => (
   <PreviewThoughtCommentaryStack
      postReferences={["JHN.1.1", "ROM.3.4", "EST.3.3"]}
      content={<div>this is my content</div>}
      cta={{ handleCloseModal: () => console.log("close modal") }}
      postImage='/images/bible_books/1.png'
      userAuthority={1}
      userId='1'
      username='username'
      avatar='/images/user_avatars/default.png'
      postPostedOnDate='07/08/2022 11:00'
      postCreatedDate='07/08/2022 11:00'
      postCategory='PNK'
      withEditOption={false}
   />
);
