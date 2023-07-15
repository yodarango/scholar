/**************************************************************************************** 
-  renders a list of commentary posts width a filter on the top that passes down the 
   filters to the post wrapper 🔥
**********************************
*/
import { PrimaryStack } from "./templates/primary_stack";

// styles
import styles from "./images_from_verses_modal.module.css";
import { ImagesFromVerseGrid } from "../scrollers/user_content/images_from_verse_grid";

type TCommentariesByBookProps = {
   cta: {
      handleClose: () => void;
   };
};

export const ImagesFromVerseGridModal = ({ cta }: TCommentariesByBookProps) => {
   return (
      <PrimaryStack title='AImages' cta={{ handleClose: cta.handleClose }}>
         <section className={styles.posts}>
            <ImagesFromVerseGrid />
         </section>
      </PrimaryStack>
   );
};
