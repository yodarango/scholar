import { ComponentMeta, ComponentStory } from "@storybook/react";

import { TextAreaPrimary } from "../../../fragments/inputs/text_area_primary";

export default {
   title: "fragments/inputs/Text Area Primary",
   component: TextAreaPrimary
} as ComponentMeta<typeof TextAreaPrimary>;

export const Default: ComponentStory<typeof TextAreaPrimary> = () => (
   <TextAreaPrimary
      defaultValue=''
      maxLength={999}
      placeHolder='Commentary...'
      cta={{
         handleCurrentValue(body) {
            console.log(body);
         }
      }}
   />
);
