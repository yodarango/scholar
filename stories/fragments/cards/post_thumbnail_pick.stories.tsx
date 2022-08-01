import { ComponentMeta, ComponentStory } from "@storybook/react";

import { PostThumbnailPick } from "../../../fragments/cards/post_thumbnail_pick";

export default {
   title: "fragments/cards/Post Thumbnail Pick",
   component: PostThumbnailPick
} as ComponentMeta<typeof PostThumbnailPick>;

export const Default: ComponentStory<typeof PostThumbnailPick> = () => (
   <PostThumbnailPick
      author='John Doe'
      authorLink='#'
      imageUrl='/images/logo.png'
      alt='my image'
      cta={{
         handleSelectImage(img) {
            console.log("image is", img);
         }
      }}
   />
);
