import { useState } from "react";

//comps
import { Primary } from "../fragments/buttons/primary";
import { DailyVerseCard, TContentCreationType } from "../fragments/cards/daily_verse_card";
import { BibleBooksWrapper } from "./scrollers/bible_books_wrapper";
import { PrimaryStack } from "./stacks/templates/primary_stack";
import Portal from "../hoc/potal";

//styles
import styles from "./daily_verse_modal.module.css";

type TDailyVerseModalProps = {
   versecardOnly?: boolean;
   contentCreationType?: TContentCreationType;
   onCreateImage?: (verseContent: any) => void;
   loading?: boolean;
};

export const DailyVerseModal = ({
   versecardOnly,
   contentCreationType,
   onCreateImage
}: TDailyVerseModalProps) => {
   const [showModal, setshowModal] = useState<number>(0);

   return (
      <div className={styles.mainWrpaper}>
         <Portal>
            {showModal === 1 && (
               <div className={styles.versePicker}>
                  <PrimaryStack
                     title='Select scripture'
                     cta={{ handleClose: () => setshowModal(0) }}>
                     <BibleBooksWrapper
                        stopAtVerse={false}
                        stopAtChapter={false}
                        stopAtChapterId={false}
                        cta={{
                           handleChoice: (choice: string) =>
                              (location.href = `/explore/?VERSE_ID=${choice}`)
                        }}
                     />
                  </PrimaryStack>
               </div>
            )}
         </Portal>
         {!versecardOnly && (
            <>
               <div className={styles.dailyVerseCard}>
                  <DailyVerseCard
                     contentCreationType={contentCreationType}
                     onCreateImage={onCreateImage}
                  />
               </div>
               <div className={styles.button}>
                  <Primary
                     title='Select new verse'
                     type='1'
                     cta={{ handleClick: () => setshowModal(1) }}
                  />
               </div>
            </>
         )}
         {versecardOnly && (
            <div className={styles.dailyVerseCardOnly}>
               <DailyVerseCard withOutActions={versecardOnly} />
            </div>
         )}
      </div>
   );
};
