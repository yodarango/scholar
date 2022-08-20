import { ComponentMeta, ComponentStory } from "@storybook/react";

import { VideoThumbnailPrimary } from "../../../fragments/cards/video_thumbnail_primary";

export default {
   title: "fragments/cards/Video Thumbnail Primary",
   component: VideoThumbnailPrimary
} as ComponentMeta<typeof VideoThumbnailPrimary>;

export const Main: ComponentStory<typeof VideoThumbnailPrimary> = () => (
   <VideoThumbnailPrimary
      content={{
         url: "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=tnVK_LJvHXs&format=json",
         title: "MY Awesome Video",
         description: "This is a small description"
      }}
   />
);
