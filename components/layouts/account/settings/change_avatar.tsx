import { useState } from "react";
import { UserAvatar } from "../../../fragments/chunks/user_avatar";
import AvatarChooser from "../../../fragments/popups/avatar_chooser";
import { Parragraph } from "../../../fragments/Typography/parragraph";
import Portal from "../../../hoc/potal";
import { FourthStack } from "../../stacks/templates/fourth_stack";

// styles
import styles from "./change_avatar.module.css";

type TChangeAvatarProps = {
   avatar: string;
   userAuthority: number;
};

export const ChangeAvatar = ({ avatar, userAuthority = 1 }: TChangeAvatarProps) => {
   const [avtr, setavtr] = useState<string>(avatar);
   const [showModal, setshowModal] = useState<boolean>(false);

   return (
      <div className={styles.mainWrapper}>
         {showModal && (
            <Portal>
               <FourthStack
                  title='Change avatar'
                  actionName='Back'
                  cta={{ handleClose: () => setshowModal(false) }}>
                  <AvatarChooser cta={{ updateAvatar: (value: string) => setavtr(value) }} />
               </FourthStack>
            </Portal>
         )}
         <div className={styles.avatar}>
            <UserAvatar
               cta={{ handleClick: () => setshowModal(true) }}
               userAuthority={userAuthority}
               customSize={true}
               src={avtr}
            />
         </div>
         <div className={styles.text}>
            <Parragraph text='Change avatar' size='main' quiet={true} align='center' />
         </div>
      </div>
   );
};
