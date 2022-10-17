import { ComponentMeta, ComponentStory } from "@storybook/react";

import { IconButton } from "../../../fragments/buttons/icon_button";

export default {
   title: "fragments/buttons/Small Icon Button",
   component: IconButton
} as ComponentMeta<typeof IconButton>;

export const GoogleDark: ComponentStory<typeof IconButton> = () => (
   <IconButton cta={() => console.log("...")} icon='google' backgroundColor='1' />
);

export const SpotifyLight: ComponentStory<typeof IconButton> = () => (
   <IconButton cta={() => console.log("...")} icon='spotify' backgroundColor='2' shadowColor='2' />
);
