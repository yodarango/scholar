import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MenuPrimaryOptionWithSubSelection } from "../../../fragments/buttons/menu_primary_option_w_sub_selection";
import { Icon } from "../../../fragments/chunks/icons";

export default {
   title: "fragments/buttons/Primary Menu Option With Sub Selection",
   component: MenuPrimaryOptionWithSubSelection
} as ComponentMeta<typeof MenuPrimaryOptionWithSubSelection>;

export const Type1: ComponentStory<typeof MenuPrimaryOptionWithSubSelection> = () => (
   <MenuPrimaryOptionWithSubSelection
      type='1'
      cta={(selection) => console.log("selection", selection)}
      textType='text'
      iconType='icon'
      optionProperties={{
         icon: <Icon name='flame' size='2rem' color='#F1EAFF' />,
         iconShadow: "1",
         text: "On fire"
      }}
   />
);

export const Type2: ComponentStory<typeof MenuPrimaryOptionWithSubSelection> = () => (
   <MenuPrimaryOptionWithSubSelection
      type='2'
      customSubSelections={[
         { title: "YES", value: "yes" },
         { title: "MAYBE", value: "maybe" },
         { title: "SURE", value: "sure" },
         { title: "NO", value: "no" },
         { title: "ANYTIME", value: "anytime" },
         { title: "HELLO", value: "hello" }
      ]}
      cta={(selection) => console.log("selection", selection)}
      textType='text'
      iconType='icon'
      optionProperties={{
         icon: <Icon name='flame' size='2rem' color='#F1EAFF' />,
         iconShadow: "1",
         text: "On fire"
      }}
   />
);
