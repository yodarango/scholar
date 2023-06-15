import { useContext, useEffect, useState } from "react";
import { useShouldRender } from "../../hooks/use_should_render";
import { AddContent } from "../fragments/buttons/add_content";
import { PostFilter } from "../fragments/posts_filter";
import { CastYourVote } from "../layouts/wigo/cast_your_vote";
import { FastFacts } from "../layouts/wigo/fast_facts";
import { WigoDailVerse } from "../layouts/wigo/wigo_daily_verse";
import { WigoFeed } from "../layouts/wigo/wigo_feed";

// styles
import styles from "./wigo.module.css";
import { UserContext } from "../../context";

export const Wigo = () => {
   const userCtx = useContext(UserContext);
   const { user } = userCtx;
   const userId = parseInt(user?.ID) || 0;
   const { shouldRender } = useShouldRender(userId);

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.addButton}>{shouldRender && <AddContent />}</div>
         <div className={styles.fastFacts}>
            <FastFacts />
         </div>
         <div className={styles.dailyVerse}>
            <WigoDailVerse />
         </div>
         <div className={styles.polls}>
            <CastYourVote />
         </div>
         <div className={styles.filter}>
            <PostFilter />
         </div>
         <div>
            <WigoFeed />
         </div>
      </div>
   );
};
