import Link from "next/link";

// comps
import { Icon } from "./icons";
import { UserAvatar } from "./user_avatar";

// styles
import styles from "./quote_card_header.module.css";
import Portal from "../../hoc/potal";
import { SelectpostOptions } from "../../layouts/menus/select_post_options";
import { useState } from "react";

type TQuoteCardHeaderprops = {
   userAuthority: number;
   postId: string;
   avatar: string;
   userId: string;
   cta: {
      handleDelete: (id: string) => void;
   };
};

export const QuoteCardHeader = ({
   userAuthority,
   postId,
   avatar,
   userId,
   cta
}: TQuoteCardHeaderprops) => {
   const [showPostOptions, setshowPostOptions] = useState<boolean>(false);

   // handle the delete and send ID to the parent to remove from the array
   const handleDelete = () => {
      setshowPostOptions(false);
      cta.handleDelete(postId);
   };

   return (
      <>
         <Portal>
            {showPostOptions && (
               <SelectpostOptions
                  postid={postId}
                  postType='quote'
                  cta={{ handleCloseModal: () => setshowPostOptions(false), handleDelete }}
               />
            )}
         </Portal>
         <div className={styles.mainWrapper}>
            <div className={styles.avatar}>
               <Link href={`/users/${userId}`}>
                  <a>
                     <UserAvatar userAuthority={userAuthority} src={avatar} customSize={true} />
                  </a>
               </Link>
            </div>
            <div className={styles.more} onClick={() => setshowPostOptions(true)}>
               <Icon size='2rem' color='#F1EAFF' name='ellipsisH' />
            </div>
         </div>
      </>
   );
};
