import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SelectLibraryContent } from "../../../layouts/menus/select_libarary_content";

export default {
   title: "layouts/menus/Select Library Content",
   component: SelectLibraryContent
} as ComponentMeta<typeof SelectLibraryContent>;

export const Default: ComponentStory<typeof SelectLibraryContent> = () => (
   <SelectLibraryContent cta={{ handleCloseModal: () => console.log("modal should close") }} />
);
