import { ComponentMeta, ComponentStory } from "@storybook/react";

import { PostCommentsWrapper } from "../../../layouts/scrollers/post_comments_wrapper";

export default {
   title: "layouts/scrollers/Commentary One Line Carrousel",
   component: PostCommentsWrapper
} as ComponentMeta<typeof PostCommentsWrapper>;

export const Default: ComponentStory<typeof PostCommentsWrapper> = () => (
   <PostCommentsWrapper
      postComments={[
         {
            ID: "1",
            body: "Add the variable font stylesheet request to your head tag and the current variable axes configuration to icons using CSS.",
            creator_avatar: "",
            creator_signature: "username",
            creator_approval_rate: "80",
            creator_authority_level: 1,
            creator_id: "1",
            posted_on: "08/10/22 09:00",
            date: "08/10/22 09:00"
         },
         {
            ID: "1",
            body: "Add the variable font stylesheet request to your head tag and the current variable axes configuration to icons using CSS.",
            creator_avatar: "",
            creator_signature: "username",
            creator_approval_rate: "80",
            creator_authority_level: 1,
            creator_id: "1",
            posted_on: "08/10/22 09:00",
            date: "08/10/22 09:00"
         },
         {
            ID: "1",
            body: "Add the variable font stylesheet request to your head tag and the current variable axes configuration to icons using CSS.",
            creator_avatar: "",
            creator_signature: "username",
            creator_approval_rate: "80",
            creator_authority_level: 1,
            creator_id: "1",
            posted_on: "08/10/22 09:00",
            date: "08/10/22 09:00"
         },
         {
            ID: "1",
            body: "Add the variable font stylesheet request to your head tag and the current variable axes configuration to icons using CSS.",
            creator_avatar: "",
            creator_signature: "username",
            creator_approval_rate: "80",
            creator_authority_level: 1,
            creator_id: "1",
            posted_on: "08/10/22 09:00",
            date: "08/10/22 09:00"
         },
         {
            ID: "1",
            body: "Add the variable font stylesheet request to your head tag and the current variable axes configuration to icons using CSS.",
            creator_avatar: "",
            creator_signature: "username",
            creator_approval_rate: "80",
            creator_authority_level: 1,
            creator_id: "1",
            posted_on: "08/10/22 09:00",
            date: "08/10/22 09:00"
         }
      ]}
   />
);
