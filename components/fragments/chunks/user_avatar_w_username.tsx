/*************************************************************************************************
 - Renders a user's avatar and their username by passing the "username", "userId", and "avatarSrc" 
   props. Other props customize the look of the component as follows:
   -  flowV (vertical view): renders the avatar on top and username on the bottom if true
   -  align: tells the component to render alignt itself to the specified direction
   -  fontSize: Optionally adjustes the size on the font. the default is 1.2rem
   -  quiet: Sets the text to the wuiet color if true
   -  avatarSize: adjusts the sixe of the avatar if a string representing the size is passed.
      Otherwise the custom size (not set in this compenent but rendered by the child components 
      "UserAvatar") is set which is 5rem
   -  userAuthority: user authority of the user
   -  cta: if this optional prop is passed onClick of the compnent can be customized. Otherwise
      the components will be rendered in a <a></a>

*************************************************************************************************/

import Link from "next/link";

import styles from "./user_avatar_w_username.module.css";

import { UserAvatar } from "./user_avatar";
import { Header } from "../Typography/header";

type TAvatarWUsernameProps = {
   username: string;
   userId: string;
   avatarSrc: string | undefined | null;
   flowV?: boolean;
   align?: string;
   fontSize?: string;
   quiet: boolean;
   avatarSize?: string;
   userAuthority: number;
   fontColor?: string;
   cta?: {
      handleClick: (id: string) => void;
   };
};

export const UserAvatarWUsername = ({
   username,
   userId,
   flowV,
   fontSize,
   quiet,
   avatarSize,
   userAuthority,
   avatarSrc,
   cta,
   align,
   fontColor
}: TAvatarWUsernameProps) => {
   return (
      <div
         className={`${styles.mainWrapper} ${flowV ? styles.vertical : ""} ${
            align === "c" ? styles.center : align === "r" ? styles.right : styles.left
         }`}>
         <div className={styles.avatarWrapper}>
            {/* if custom Size on the avatar is desired */}
            {avatarSize && (
               <div style={{ width: avatarSize, height: avatarSize }}>
                  {cta && (
                     <UserAvatar
                        src={avatarSrc}
                        userAuthority={userAuthority}
                        cta={() => cta.handleClick(userId)}
                        customSize={true}
                     />
                  )}
                  {!cta && (
                     <Link href={`/users/${userId}`}>
                        <a>
                           <UserAvatar
                              src={avatarSrc}
                              userAuthority={userAuthority}
                              customSize={true}
                           />
                        </a>
                     </Link>
                  )}
               </div>
            )}

            {/* otherwise serve the default size */}
            {!avatarSize && (
               <>
                  {cta && (
                     <UserAvatar
                        src={avatarSrc}
                        userAuthority={userAuthority}
                        cta={() => cta.handleClick(userId)}
                     />
                  )}
                  {!cta && (
                     <Link href={`/users/${userId}`}>
                        <a>
                           <UserAvatar src={avatarSrc} userAuthority={userAuthority} />
                        </a>
                     </Link>
                  )}
               </>
            )}
         </div>
         {/* username */}
         {!fontColor && (
            <Link href={`/users/${userId}`}>
               <a>
                  <Header
                     size={fontSize ? fontSize : "xsmall"}
                     quiet={quiet}
                     type={3}
                     weight={700}
                     text={username}
                  />
               </a>
            </Link>
         )}
         {fontColor && (
            <Link href={`/users/${userId}`}>
               <a>
                  <Header
                     size={fontSize ? fontSize : "xsmall"}
                     type={3}
                     weight={700}
                     text={username}
                     color={fontColor}
                  />
               </a>
            </Link>
         )}
      </div>
   );
};
