import { useState } from "react";
import { Icon } from "../../fragments/chunks/icons";
import styles from "./posts_navigation.module.css";

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
               color={hoverState === 1 || activeState === 1 ? "#F1EAFF" : "#5C5470"}
            />
         </div>
         <div
            className={styles.tab}
            onMouseEnter={() => sethoverState(2)}
            onMouseLeave={() => sethoverState(0)}
            onClick={() => handleClick(2)}>
            <Icon
               name='think'
               size='2rem'
               color={hoverState === 2 || activeState === 2 ? "#F1EAFF" : "#5C5470"}
            />
         </div>
         <div
            className={styles.tab}
            onMouseEnter={() => sethoverState(3)}
            onMouseLeave={() => sethoverState(0)}
            onClick={() => handleClick(3)}>
            <Icon
               name='quote'
               size='2rem'
               color={hoverState === 3 || activeState === 3 ? "#F1EAFF" : "#5C5470"}
            />
         </div>
         <div
            className={styles.tab}
            onMouseEnter={() => sethoverState(4)}
            onMouseLeave={() => sethoverState(0)}
            onClick={() => handleClick(4)}>
            <Icon
               name='folder'
               size='2rem'
               color={hoverState === 4 || activeState === 4 ? "#F1EAFF" : "#5C5470"}
            />
         </div>
      </div>
   );
};
