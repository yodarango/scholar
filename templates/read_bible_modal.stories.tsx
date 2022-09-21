import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ReadBibleModal } from "./read_bible_modal";

export default {
   title: "templates/Reading Modal",
   component: ReadBibleModal
} as ComponentMeta<typeof ReadBibleModal>;

export const ThoughtPost: ComponentStory<typeof ReadBibleModal> = () => (
   <ReadBibleModal cta={{ handleTheme: (theme: string) => console.log(theme) }} />
);
