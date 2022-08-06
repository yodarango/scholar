import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SeePostInfo } from "../../../fragments/chunks/see_post_info";

export default {
   title: "fragments/chunks/See Post Info",
   component: SeePostInfo
} as ComponentMeta<typeof SeePostInfo>;

export const Default: ComponentStory<typeof SeePostInfo> = () => (
   <SeePostInfo
      userAuthority={1}
      userId='1'
      username='username'
      avatar='/images/user_avatars/default.png'
      postPostedOnDate='07/08/2022 11:00'
      postCreatedDate='07/08/2022 11:00'
      postCategory='PNK'
   />
);
