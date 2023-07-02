import React, { useEffect, useState } from "react";
import styles from "./bible_chapter_summary.module.css";
import { getChapterSummary } from "../../helpers/functions/reading/get_chapter_summary";
import { useRouter } from "next/router";
import { Error } from "../common/feedback/error";
import PortalSecondary from "../hoc/portal_secondary";
import { RoundLoader } from "../fragments/chunks/round_loader";
import { Parragraph } from "../fragments/Typography/parragraph";
import { Header } from "../fragments/Typography/header";
import { GRADIENT_1__LIGHT } from "../../constants/tokens";
import { BackLink } from "../fragments/buttons/back_link";

type TChapterSummaryProps = {
   chapterId?: string;
   onClose: () => void;
};

export const BibleChapterSummary = ({ chapterId, onClose }: TChapterSummaryProps) => {
   const router = useRouter();
   const [data, setData] = useState<any>(null);
   const [loading, setLoading] = useState<string>("loading");

   const getData = async (chapterId: string) => {
      try {
         const summary = await getChapterSummary(chapterId);

         setData(summary);
         setLoading("done");
      } catch (error) {
         console.error(error);
         setLoading("error");
      }
   };

   useEffect(() => {
      if (router.isReady) {
         const { CHAPTER_ID } = router.query;
         if (CHAPTER_ID && !chapterId) getData(CHAPTER_ID as string);
         else if (chapterId) getData(chapterId);
      }
   }, [router.isReady, router.query, chapterId]);

   return (
      <PortalSecondary>
         <div className={styles.mainWrapper}>
            <div className={styles.contentWrapper}>
               <div className={styles.backLink}>
                  <BackLink title='Back to chapter' cta={{ handleClick: onClose }} />
               </div>
               {loading === "done" && data && (
                  <div className={styles.text}>
                     <Header
                        className={styles.title}
                        type={2}
                        text='Chapter summary'
                        size='large'
                        color={GRADIENT_1__LIGHT}
                     />
                     <Parragraph className={styles.text} text={data?.data?.summary} size='main' />
                  </div>
               )}
               {loading === "error" && (
                  <div className={styles.feedback}>
                     <Error />
                  </div>
               )}
               {loading === "loading" && (
                  <div className={`${styles.feedback} ${styles.error}`}>
                     <RoundLoader />
                  </div>
               )}
            </div>
         </div>
      </PortalSecondary>
   );
};
