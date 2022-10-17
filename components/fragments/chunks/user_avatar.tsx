// revamp 2.0
import styles from "./user_avatar.module.css";
import { Icon } from "./icons";

type TuserAvatarProps = {
   src: string | undefined | null;
   userAuthority: number;
   customSize?: boolean;
   cta?: {
      handleClick: () => void;
   };
};
export const UserAvatar = ({ src, userAuthority, customSize, cta }: TuserAvatarProps) => {
   return (
      <div
         className={`${customSize ? styles.mainWrapperCustomSize : styles.mainWrapper}`}
         onClick={cta?.handleClick}>
         {userAuthority === 1 && (
            <div className={`flex-row ${styles.ratingOutlineGeneral}`}>
               <div className={`${styles.background}`}>
                  <img className={styles.avatar} alt='user avatar' src={src ? src : ""} />
               </div>
            </div>
         )}
         {userAuthority === 2 && (
            <div className={`flex-row ${styles.ratingOutlineTrusted}`}>
               <div className={`${styles.background}`}>
                  <img className={styles.avatar} alt='user avatar' src={src ? src : ""} />
                  <div className={styles.authorityLevel}>
                     <Icon name='star' color='#2A2438' size={"100%"} />
                  </div>
               </div>
            </div>
         )}
         {userAuthority === 3 && (
            <div className={`flex-row ${styles.ratingOutlineClassic}`}>
               <div className={`${styles.background}`}>
                  <img className={styles.avatar} alt='user avatar' src={src ? src : ""} />
                  <div className={styles.authorityLevel}>
                     <Icon name='star' color='#2A2438' size={"100%"} />
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};
