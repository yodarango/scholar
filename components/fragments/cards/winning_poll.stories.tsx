import { ComponentMeta, ComponentStory } from "@storybook/react";

import { WinningPoll } from "./winning_poll";

export default {
   title: "fragments/cards/Winnning Poll",
   component: WinningPoll
} as ComponentMeta<typeof WinningPoll>;

export const WithoutCloseOption: ComponentStory<typeof WinningPoll> = () => (
   <WinningPoll message='This is the winning poll' image='/images/logo.png' />
);
