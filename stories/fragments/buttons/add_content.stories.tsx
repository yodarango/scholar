import { ComponentMeta, ComponentStory } from "@storybook/react";

import { AddContent } from "../../../fragments/buttons/add_content";

export default {
   title: "fragments/buttons/Add Content",
   component: AddContent
} as ComponentMeta<typeof AddContent>;

export const PrimaryTypeOne: ComponentStory<typeof AddContent> = () => (
   <AddContent cta={{ handleClick: () => console.log("...") }} />
);
