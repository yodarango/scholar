import { ComponentMeta, ComponentStory } from "@storybook/react";

import { PostsNavigation } from "./posts_navigation";

export default {
   title: "layouts/navs/Posts Navigation",
   component: PostsNavigation
} as ComponentMeta<typeof PostsNavigation>;

export const Primary: ComponentStory<typeof PostsNavigation> = () => (
   <PostsNavigation
      cta={{
         handleClick(value) {
            console.log(value);
         }
      }}
   />
);
