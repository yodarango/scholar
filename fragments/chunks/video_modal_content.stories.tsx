import { ComponentStory, ComponentMeta } from "@storybook/react";

import { VideoModalContent } from "./video_modal_content";

export default {
   title: "fragments/Video Modal Content",
   component: VideoModalContent
} as ComponentMeta<typeof VideoModalContent>;

export const WithoutRemoveOption: ComponentStory<typeof VideoModalContent> = () => (
   <VideoModalContent
      description='In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.'
      videoHtml={`<iframe src="https://www.youtube.com/embed/tnVK_LJvHXs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`}
      loading='done'
   />
);
