import { ComponentMeta, ComponentStory } from "@storybook/react";

import { PostComment } from "../../../../fragments/cards/posts/post_comment";
export default {
   title: "fragments/cards/posts/post comment",
   component: PostComment
} as ComponentMeta<typeof PostComment>;

export const Default: ComponentStory<typeof PostComment> = () => (
   <PostComment
      postHeader={{
         username: "Username",
         avatar: "Username",
         userId: "1",
         postId: "2",
         userAuthority: 1,
         postType: "",
         widthTimeStamp: {
            time: "08/29/22 19:00",
            niceTime: "08/29/22 19:00",
            quiet: true
         }
      }}
      postSettingsOptions={{
         showShareopton: false,
         showEditOption: false,
         showDeleteOption: true,
         showReportOption: false
      }}
      comment='Add the variable font stylesheet request to your head tag and the current variable axes configuration to icons using CSS.'
      cta={{ handleDelete: () => console.log("log") }}
   />
);
