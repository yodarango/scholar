import { ComponentMeta, ComponentStory } from "@storybook/react";

import { IconWithText } from "../../../fragments/buttons/icon_with_text";

export default {
   title: "fragments/buttons/Icon With Text",
   component: IconWithText
} as ComponentMeta<typeof IconWithText>;

export const GoogleTypeOneLink: ComponentStory<typeof IconWithText> = () => (
   <IconWithText icon='google' title='My button' buttonColor='1' link='#' />
);

export const GoogleTypeTwoButton: ComponentStory<typeof IconWithText> = () => (
   <IconWithText
      icon='google'
      title='My button'
      buttonColor='2'
      cta={{ handleClick: () => console.log("...") }}
   />
);
