import { useEffect, useState } from "react";
import { Icon } from "../../fragments/chunks/icons";
import styles from "./explore_navigation.module.css";
import Link from "next/link";
import { FONT_COLOR } from "../../../constants/tokens";
import { THIRD_COLOR } from "../../../constants/tokens";
import { useRouter } from "next/router";

type TPostsNavigationProps = {
   cta: {
      handleClick: (postType: number) => void;
   };
};

export const ExploreNavigation = ({ cta }: TPostsNavigationProps) => {
   // state
   const [hoverState, sethoverState] = useState<number>(0);
   const [activeState, setactiveState] = useState<number>(0);

   // handle the click
   const handleClick = (postType: number) => {
      setactiveState(postType);
      cta.handleClick(postType);
   };

   return (
      <div className={styles.mainWrapper}>
         <div
            className={styles.tab}
            onMouseEnter={() => sethoverState(1)}
            onMouseLeave={() => sethoverState(0)}
            onClick={() => handleClick(1)}>
            <Icon
               name='comment'
               size='2rem'
               color={hoverState === 1 || activeState === 1 ? FONT_COLOR : THIRD_COLOR}
            />
         </div>
         <div
            className={styles.tab}
            onMouseEnter={() => sethoverState(2)}
            onMouseLeave={() => sethoverState(0)}
            onClick={() => handleClick(2)}>
            <Icon
               name='sparkles'
               size='2rem'
               color={hoverState === 2 || activeState === 2 ? FONT_COLOR : THIRD_COLOR}
            />
         </div>
      </div>
   );
};
