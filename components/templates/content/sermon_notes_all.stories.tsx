import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SermonNotesAll } from "./sermon_notes_all";

export default {
   title: "templates/Thought Text Editor ",
   component: SermonNotesAll
} as ComponentMeta<typeof SermonNotesAll>;

export const ThoughtPost: ComponentStory<typeof SermonNotesAll> = () => <SermonNotesAll />;
