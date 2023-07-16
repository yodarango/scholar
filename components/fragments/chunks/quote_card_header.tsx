import { useState } from "react";
import Link from "next/link";

// comps
import { Icon } from "./icons";
import { UserAvatar } from "./user_avatar";
import Portal from "../../hoc/potal";
import { SelectpostOptions } from "../../layouts/menus/select_post_options";

// styles
import styles from "./quote_card_header.module.css";

import { EnumContentType } from "../../../types/enums";

type TQuoteCardHeaderprops = {
   userAuthority: number;
   contentType: EnumContentType;
   dark?: boolean;
   postId: string;
   avatar: string;
   userId: string;
   cta: {
      handleDelete: (id: string) => void;
   };
};

export const QuoteCardHeader = ({
   userAuthority,
   contentType,
   dark,
   postId,
   avatar,
   userId,
   cta
}: TQuoteCardHeaderprops) => {
   const [showPostOptions, setshowPostOptions] = useState<boolean>(false);

   const contextColor = dark ? "#2a2438" : "#F1EAFF";

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
                  contentType={contentType}
                  postid={postId}
                  postType='quote'
                  userId={userId}
                  showEditOption
                  showSavetoFolderOption={false}
                  cta={{
                     handleCloseModal: () => setshowPostOptions(false),
                     handleReport: () => setshowPostOptions(false),
                     handleDelete
                  }}
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
               <Icon size='3rem' color={contextColor} name='ellipsisH' />
            </div>
         </div>
      </>
   );
};
