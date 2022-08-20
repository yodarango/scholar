import { ComponentMeta, ComponentStory } from "@storybook/react";

import { FastFacts } from "../../../../layouts/content/fast_facts";

export default {
   title: "layouts/content/Fast Facts",
   component: FastFacts
} as ComponentMeta<typeof FastFacts>;

export const Default: ComponentStory<typeof FastFacts> = () => (
   <FastFacts
      images={[
         "/images/bible_books/1.png",
         "/images/bible_books/2.png",
         "/images/bible_books/3.png",
         "/images/bible_books/4.png",
         "/images/bible_books/5.png"
      ]}
   />
);

Default.parameters = {
   nextRouter: {
      path: "/read",
      asPath: "/read",
      query: { id: "none" }
   }
};
