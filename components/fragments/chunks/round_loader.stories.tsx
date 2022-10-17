import { ComponentMeta, ComponentStory } from "@storybook/react";

import { RoundLoader } from "../../../fragments/chunks/round_loader";

export default {
   title: "fragments/chunks/Round Loader",
   component: RoundLoader
} as ComponentMeta<typeof RoundLoader>;

export const Default: ComponentStory<typeof RoundLoader> = () => <RoundLoader />;
