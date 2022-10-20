import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SermonNotesWFilter } from "./sermon_notes_w_filter";

export default {
   title: "layouts/stacks/Sermon With Filter ",
   component: SermonNotesWFilter
} as ComponentMeta<typeof SermonNotesWFilter>;

export const WithEditOption: ComponentStory<typeof SermonNotesWFilter> = () => (
   <SermonNotesWFilter cta={{ handleClose() {} }} />
);
