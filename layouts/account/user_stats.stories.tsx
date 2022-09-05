import { ComponentStory, ComponentMeta } from "@storybook/react";

import { UserStats } from "./user_stats";

export default {
   title: "layouts/account/User Stats",
   component: UserStats
} as ComponentMeta<typeof UserStats>;

export const WithoutRemoveOption: ComponentStory<typeof UserStats> = () => (
   <UserStats
      username='username'
      avatar='/images/user_avatars/default.png'
      userAuthority={1}
      ratingCount={0}
      rating={96}
      postCount={38}
   />
);
