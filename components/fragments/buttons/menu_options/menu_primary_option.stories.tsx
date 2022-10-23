import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MenuPrimaryOption } from "./menu_primary_option";
import { Icon } from "../../../fragments/chunks/icons";

export default {
   title: "fragments/buttons/Primary Menu Option",
   component: MenuPrimaryOption
} as ComponentMeta<typeof MenuPrimaryOption>;

export const WithIcon: ComponentStory<typeof MenuPrimaryOption> = () => (
   <MenuPrimaryOption
      cta={{ handleOptionClick: () => console.log("...") }}
      textType='text'
      iconType='icon'
      optionProperties={{
         icon: <Icon name='flame' size='2rem' color='#F1EAFF' />,
         iconShadow: "1",
         text: "On fire"
      }}
   />
);

export const WithText: ComponentStory<typeof MenuPrimaryOption> = () => (
   <MenuPrimaryOption
      cta={{ handleOptionClick: () => console.log("...") }}
      textType='jsx'
      iconType='text'
      optionProperties={{
         icon: "5.0",
         iconShadow: "2",
         text: <Icon name='star' size='2rem' color='#F1EAFF' />
      }}
   />
);

export const Filled: ComponentStory<typeof MenuPrimaryOption> = () => (
   <MenuPrimaryOption
      cta={{ handleOptionClick: () => console.log("...") }}
      textType='text'
      iconType='filled'
      optionProperties={{
         icon: "",
         iconShadow: "#A1DF9F",
         text: "Faith, new life"
      }}
   />
);
