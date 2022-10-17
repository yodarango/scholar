import { ComponentMeta, ComponentStory } from "@storybook/react";

import { LibraryContent } from "./library_content";

export default {
   title: "fragments/cards/Library Content",
   component: LibraryContent
} as ComponentMeta<typeof LibraryContent>;

export const WithoutDescriptionModal: ComponentStory<typeof LibraryContent> = () => (
   <LibraryContent
      id='1'
      stars={5}
      reviews={20}
      title={"This is a super long title"}
      img={{ src: "/images/logo.png", alt: "some image" }}
      description='this is a cool description'
      link='#'
      showDescriptionModal={false}
   />
);

export const WithDescriptionModal: ComponentStory<typeof LibraryContent> = () => (
   <LibraryContent
      id='1'
      stars={5}
      reviews={20}
      title={"This is a super long title"}
      img={{ src: "/images/logo.png", alt: "some image" }}
      description='this is a cool description'
      link='#'
      showDescriptionModal={true}
   />
);
