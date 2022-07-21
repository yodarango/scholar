import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MenuPrimaryOption } from "../../../fragments/buttons/menu_primary_option";
import { Parragraph } from "../../../fragments/Typography/parragraph";

export default {
   title: "fragments/buttons/Primary Menu Option",
   component: MenuPrimaryOption
} as ComponentMeta<typeof MenuPrimaryOption>;

export const Text: ComponentStory<typeof MenuPrimaryOption> = () => (
   <MenuPrimaryOption cta={() => console.log("...")} text='five stars' shadow='light' icon={} />
);
