import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CloseContent } from "../../../fragments/buttons/close_content";

export default {
   title: "fragments/buttons/Close Content",
   component: CloseContent
} as ComponentMeta<typeof CloseContent>;

export const Default: ComponentStory<typeof CloseContent> = () => (
   <CloseContent cta={() => console.log("...")} />
);
