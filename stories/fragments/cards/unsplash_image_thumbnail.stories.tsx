import { ComponentMeta, ComponentStory } from "@storybook/react";

import { UnsplashImageThumbnail } from "../../../fragments/cards/unsplash_image_thumbnail";

export default {
   title: "fragments/cards/Unsplah Photo Thumbnail",
   component: UnsplashImageThumbnail
} as ComponentMeta<typeof UnsplashImageThumbnail>;

export const WithoutCloseOption: ComponentStory<typeof UnsplashImageThumbnail> = () => (
   <UnsplashImageThumbnail
      src='https://images.unsplash.com/photo-1660487054778-6b0e7d4b5b4b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=60'
      link='#'
      author='Jess Childless'
      alt='some photo'
      cta={{
         handleImgSelection(link) {
            console.log(link);
         }
      }}
   />
);
