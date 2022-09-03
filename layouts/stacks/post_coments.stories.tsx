import { ComponentMeta, ComponentStory } from "@storybook/react";

import { PostComments } from "./post_coments";

export default {
   title: "layouts/stacks/Post Comments Stack",
   component: PostComments
} as ComponentMeta<typeof PostComments>;

export const WithEditOption: ComponentStory<typeof PostComments> = () => (
   <PostComments
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
            ID: "10",
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
            ID: "11",
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
            ID: "13",
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
            ID: "14",
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
      cta={{
         handleClose() {},
         handleValue(value: string) {
            console.log(value);
         }
      }}
   />
);
