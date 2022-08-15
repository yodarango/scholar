import { ComponentMeta, ComponentStory } from "@storybook/react";

import { UnsplasImgPicker } from "../../../layouts/scrollers/unsplash_img_picker";

export default {
   title: "layouts/scrollers/Unsplash Image Picker",
   component: UnsplasImgPicker
} as ComponentMeta<typeof UnsplasImgPicker>;

export const Default: ComponentStory<typeof UnsplasImgPicker> = () => (
   <UnsplasImgPicker
      images={[
         { link: "", author: "", src: "", alt: "" },
         { link: "", author: "", src: "", alt: "" },
         { link: "", author: "", src: "", alt: "" },
         { link: "", author: "", src: "", alt: "" },
         { link: "", author: "", src: "", alt: "" }
      ]}
      cta={{
         handleImgSelection: (url) => console.log(url),
         closeModal: () => console.log("close")
      }}
   />
);
