import { ComponentMeta, ComponentStory } from "@storybook/react";

import { IconGhost } from "../../../fragments/buttons/icon_ghost";
import { Parragraph } from "../../../fragments/Typography/parragraph";

export default {
   title: "fragments/buttons/Icon Ghost",
   component: IconGhost
} as ComponentMeta<typeof IconGhost>;

export const Default: ComponentStory<typeof IconGhost> = () => (
   <IconGhost
      cta={() => console.log("...")}
      icon={<Parragraph align='center' size='large' text={"🇺🇸"} lineHieght='.9em' />}
   />
);
