import Link from "next/link";

import styles from "./user_avatar_w_username.module.css";

import { UserAvatar } from "./user_avatar";
import { Header } from "../Typography/header";

type TAvatarWUsernameProps = {
   username: string;
   userId: string;
   flowV?: boolean;
   align?: string;
   fontSize?: string;
   quiet: boolean;
   avatarSrc: string | undefined | null;
   avatarSize?: string;
   userAuthority: number;
   cta?: React.MouseEventHandler<HTMLDivElement>;
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
   align
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
                        cta={cta}
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
                  {cta && <UserAvatar src={avatarSrc} userAuthority={userAuthority} cta={cta} />}
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
      </div>
   );
};
