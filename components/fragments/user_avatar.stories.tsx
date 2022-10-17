import { ComponentStory, ComponentMeta } from "@storybook/react";

import { UserAvatar } from "../../fragments/chunks/user_avatar";

export default {
   title: "fragments/chunks/User Avatar",
   component: UserAvatar
} as ComponentMeta<typeof UserAvatar>;

export const General: ComponentStory<typeof UserAvatar> = () => (
   <UserAvatar src='' userAuthority={1} />
);

export const Trusted: ComponentStory<typeof UserAvatar> = () => (
   <UserAvatar src='' userAuthority={2} />
);

export const Classic: ComponentStory<typeof UserAvatar> = () => (
   <UserAvatar src='' userAuthority={3} />
);
