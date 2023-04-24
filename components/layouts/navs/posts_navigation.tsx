import { useState } from "react";
import { Icon } from "../../fragments/chunks/icons";
import styles from "./posts_navigation.module.css";
import Link from "next/link";
import { FONT_COLOR } from "../../../constants/tokens";
import { THIRD_COLOR } from "../../../constants/tokens";

type TPostsNavigationProps = {
   cta: {
      handleClick: (postType: number) => void;
   };
};

export const PostsNavigation = ({ cta }: TPostsNavigationProps) => {
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
               name='quote'
               size='2rem'
               color={hoverState === 2 || activeState === 2 ? FONT_COLOR : THIRD_COLOR}
            />
         </div>
         <div
            className={styles.tab}
            onMouseEnter={() => sethoverState(3)}
            onMouseLeave={() => sethoverState(0)}
            onClick={() => handleClick(3)}>
            <Icon
               name='think'
               size='2rem'
               color={hoverState === 3 || activeState === 3 ? FONT_COLOR : THIRD_COLOR}
            />
         </div>
         <Link href='/users/@me/folders'>
            <a
               className={styles.tab}
               onMouseEnter={() => sethoverState(4)}
               onMouseLeave={() => sethoverState(0)}>
               <Icon
                  name='folder'
                  size='2rem'
                  color={hoverState === 4 || activeState === 4 ? FONT_COLOR : THIRD_COLOR}
               />
            </a>
         </Link>
      </div>
   );
};
