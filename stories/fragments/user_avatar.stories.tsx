import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { UserAvatar } from "../../fragments/chunks/user_avatar";

export default {
   title: "User Avatar",
   component: UserAvatar
} as ComponentMeta<typeof UserAvatar>;

export const Primary: ComponentStory<typeof UserAvatar> = () => (
   <UserAvatar src='' userAuthority={1} />
);
