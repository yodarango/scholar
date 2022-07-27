import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SelectCreateContentType } from "../../../layouts/menus/select_create_content_type";

export default {
   title: "layouts/menus/Select Create Content Type",
   component: SelectCreateContentType
} as ComponentMeta<typeof SelectCreateContentType>;

export const WithoutUserNotifications: ComponentStory<typeof SelectCreateContentType> = () => (
   <SelectCreateContentType cta={{ handleCloseModal: () => console.log("modal should close") }} />
);
