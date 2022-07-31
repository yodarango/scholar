import Link from "next/link";

// comps
import { Icon } from "./icons";
import { UserAvatar } from "./user_avatar";

// styles
import styles from "./quote_card_header.module.css";

type TQuoteCardHeaderprops = {
   userAuthority: number;
   avatar: string;
   userId: string;
   cta: {
      handleShowPostOptions: React.MouseEventHandler<HTMLDivElement>;
   };
};

export const QuoteCardHeader = ({ userAuthority, avatar, cta, userId }: TQuoteCardHeaderprops) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.avatar}>
            <Link href={`/users/${userId}`}>
               <a>
                  <UserAvatar userAuthority={userAuthority} src={avatar} customSize={true} />
               </a>
            </Link>
         </div>
         <div className={styles.more} onClick={cta.handleShowPostOptions}>
            <Icon size='2rem' color='#F1EAFF' name='ellipsisH' />
         </div>
      </div>
   );
};
