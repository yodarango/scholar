import { ComponentMeta, ComponentStory } from "@storybook/react";

import { PrimaryMenuBkg } from "../../../fragments/popups/primary_menu_bkg";
import { MenuPrimaryOption } from "../../../fragments/buttons/menu_primary_option";

export default {
   title: "fragments/popups/Primary Menu Background",
   component: PrimaryMenuBkg
} as ComponentMeta<typeof PrimaryMenuBkg>;

export const Primary: ComponentStory<typeof PrimaryMenuBkg> = () => (
   <PrimaryMenuBkg
      cta={() => console.log("...")}
      color='1'
      content={
         <MenuPrimaryOption
            iconType='text'
            textType='text'
            cta={() => console.log("...")}
            optionProperties={{ text: "Option", icon: "A", iconShadow: "1" }}
         />
      }
   />
);

export const Secondary: ComponentStory<typeof PrimaryMenuBkg> = () => (
   <PrimaryMenuBkg
      cta={() => console.log("...")}
      color='2'
      content={
         <MenuPrimaryOption
            iconType='text'
            textType='text'
            cta={() => console.log("...")}
            optionProperties={{ text: "Option", icon: "A", iconShadow: "1" }}
         />
      }
   />
);

export const Quiet: ComponentStory<typeof PrimaryMenuBkg> = () => (
   <PrimaryMenuBkg
      cta={() => console.log("...")}
      color='3'
      content={
         <MenuPrimaryOption
            iconType='text'
            textType='text'
            cta={() => console.log("...")}
            optionProperties={{ text: "Option", icon: "A", iconShadow: "2" }}
         />
      }
   />
);
