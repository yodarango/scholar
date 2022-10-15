import { ComponentMeta, ComponentStory } from "@storybook/react";

import { OTCVerification } from "./otc_verification";

export default {
   title: "layouts/forms/OTC Verification",
   component: OTCVerification
} as ComponentMeta<typeof OTCVerification>;

export const ThoughtPost: ComponentStory<typeof OTCVerification> = () => <OTCVerification />;
