import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SmallLoader } from "../../../fragments/chunks/small_loader";

export default {
   title: "fragments/chunks/Small Loader",
   component: SmallLoader
} as ComponentMeta<typeof SmallLoader>;

export const Default: ComponentStory<typeof SmallLoader> = () => <SmallLoader />;
