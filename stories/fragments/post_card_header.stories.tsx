import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PostCardHeader } from "../../fragments/chunks/post_card_header";

export default {
   title: "fragments/chunks/Post Card Header",
   component: PostCardHeader
} as ComponentMeta<typeof PostCardHeader>;

export const WithCategoryTag: ComponentStory<typeof PostCardHeader> = () => (
   <PostCardHeader
      username={"Myusernameissuperlong"}
      avatar={"/public/images/icon.png"}
      userId={"123"}
      userAuthority={1}
      withCategoryTag='CYN'
      cta={{
         handleShowPostOptions: () => console.log("show post options"),
         handleShowCategoryMeta: (id: string) => console.log(id)
      }}
   />
);

export const WithoutCategoryTag: ComponentStory<typeof PostCardHeader> = () => (
   <PostCardHeader
      username={"Myusernameissuperlong"}
      avatar={"/public/images/icon.png"}
      userId={"123"}
      userAuthority={1}
      cta={{
         handleShowPostOptions: () => console.log("show post options"),
         handleShowCategoryMeta: (id: string) => console.log(id)
      }}
   />
);
