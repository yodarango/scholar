// components
import { LinkWithArrow } from "../../fragments/buttons/link_with_arrow";
import { Header } from "../../fragments/Typography/header";

// styles
import styles from "./cast_your_vote_mc.module.css";

export const CastYourVoteMc = () => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.top}>
            <div>
               <Header type={3} text='Cast your vote' size='large' quiet={true} />
            </div>
            <div>
               <LinkWithArrow title='See all' link={"/wigo/polls"} />
            </div>
         </div>
         <div className={styles.poll}></div>
      </div>
   );
};
