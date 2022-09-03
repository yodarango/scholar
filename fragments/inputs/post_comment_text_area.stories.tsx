import { ComponentMeta, ComponentStory } from "@storybook/react";

import { PostCommentTextArea } from "../../../fragments/inputs/post_comment_text_area";

export default {
   title: "fragments/inputs/Post Comment TextArea",
   component: PostCommentTextArea
} as ComponentMeta<typeof PostCommentTextArea>;

export const Default: ComponentStory<typeof PostCommentTextArea> = () => (
   <PostCommentTextArea
      cta={{
         handleValue(value) {
            console.log(value);
         }
      }}
   />
);
