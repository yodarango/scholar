import { ComponentMeta, ComponentStory } from "@storybook/react";

import { BiblePreferences } from "./Bible_preferences";

export default {
   title: "layouts/menus/Bible Preferences",
   component: BiblePreferences
} as ComponentMeta<typeof BiblePreferences>;

export const Default: ComponentStory<typeof BiblePreferences> = () => <BiblePreferences />;

Default.parameters = {
   nextRouter: {
      path: "/read",
      asPath: "/read",
      query: { id: "none" }
   }
};
