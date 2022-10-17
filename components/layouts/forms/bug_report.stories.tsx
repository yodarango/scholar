import { ComponentMeta, ComponentStory } from "@storybook/react";

import { BugReport } from "./bug_report";

export default {
   title: "fragments/forms/Bug Report",
   component: BugReport
} as ComponentMeta<typeof BugReport>;

export const Info: ComponentStory<typeof BugReport> = () => <BugReport />;
