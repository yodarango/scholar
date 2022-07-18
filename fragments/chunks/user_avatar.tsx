// revamp 2.0
import styles from "./user_avatar.module.css";
import { Icon } from "./icons";

type TuserAvatarProps = {
   src: string;
   userAuthority: number;
   customSize?: boolean;
   cta?: React.MouseEventHandler<HTMLDivElement> | undefined;
};
export const UserAvatar = ({ src, userAuthority, customSize, cta }: TuserAvatarProps) => {
   return (
      <div
         className={`${customSize ? styles.mainWrapperCustomSize : styles.mainWrapper}`}
         onClick={cta}>
         {userAuthority === 1 && (
            <div className={`flex-row ${styles.ratingOutlineGeneral}`}>
               <div className={`${styles.background}`}>
                  <img className={styles.avatar} alt='user avatar' src={src} />
               </div>
            </div>
         )}
         {userAuthority === 2 && (
            <div className={`flex-row ${styles.ratingOutlineTrusted}`}>
               <div className={`${styles.background}`}>
                  <img className={styles.avatar} alt='user avatar' src={src} />
                  <div className={styles.authorityLevel}>
                     <Icon name='star' color='#2A2438' size={"100%"} />
                  </div>
               </div>
            </div>
         )}
         {userAuthority === 3 && (
            <div className={`flex-row ${styles.ratingOutlineClassic}`}>
               <div className={`${styles.background}`}>
                  <img className={styles.avatar} alt='user avatar' src={src} />
                  <div className={styles.authorityLevel}>
                     <Icon name='star' color='#2A2438' size={"100%"} />
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};
