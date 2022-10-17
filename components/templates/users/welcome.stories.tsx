import { ComponentMeta, ComponentStory } from "@storybook/react";
import { WelcomeTemplate } from "./welcome";

export default {
   title: "templates/Reading Modal",
   component: WelcomeTemplate
} as ComponentMeta<typeof WelcomeTemplate>;

export const ThoughtPost: ComponentStory<typeof WelcomeTemplate> = () => <WelcomeTemplate />;
