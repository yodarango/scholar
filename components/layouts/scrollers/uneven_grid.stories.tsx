import { ComponentMeta, ComponentStory } from "@storybook/react";
import { LibraryContent } from "../../fragments/cards/library_content";

import { UnevenGrid } from "./uneven_grid";

export default {
   title: "layouts/scrollers/Uneven Grid",
   component: UnevenGrid
} as ComponentMeta<typeof UnevenGrid>;

export const WithoutCloseOption: ComponentStory<typeof UnevenGrid> = () => (
   <UnevenGrid
      children={[...Array(20)].map((_, index) => (
         <LibraryContent
            id='1'
            stars={5}
            reviews={19}
            title={`${index}`}
            img={{ src: "/images/logo.png", alt: "some image" }}
            description='this is a cool description'
            link='#'
            showDescriptionModal={false}
         />
      ))}
   />
);
