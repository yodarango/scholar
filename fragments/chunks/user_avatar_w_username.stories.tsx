import { ComponentStory, ComponentMeta } from "@storybook/react";

import { UserAvatarWUsername } from "../../../fragments/chunks/user_avatar_w_username";

export default {
   title: "fragments/chunks/User Avatar W Username",
   component: UserAvatarWUsername
} as ComponentMeta<typeof UserAvatarWUsername>;

export const General: ComponentStory<typeof UserAvatarWUsername> = () => (
   <UserAvatarWUsername
      avatarSrc=''
      userAuthority={1}
      username={"biblescholar"}
      userId='777'
      quiet={true}
      avatarSize={"3.5rem"}
   />
);
