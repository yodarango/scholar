import { useChapterSummaryVote } from "../../helpers/functions/reading/use_chapter_summary_vote";
import { getChapterSummary } from "../../helpers/functions/reading/get_chapter_summary";
import { Parragraph } from "../fragments/Typography/parragraph";
import { RoundLoader } from "../fragments/chunks/round_loader";
import { GRADIENT_1__LIGHT } from "../../constants/tokens";
import { BackLink } from "../fragments/buttons/back_link";
import styles from "./bible_chapter_summary.module.css";
import { Header } from "../fragments/Typography/header";
import PortalSecondary from "../hoc/portal_secondary";
import React, { useEffect, useState } from "react";
import { Error } from "../common/feedback/error";
import { useRouter } from "next/router";
import { IconButton } from "../fragments/buttons/icon_button";
import { getCookie } from "../../helpers/get-cookie";

type TChapterSummaryProps = {
   chapterId?: string;
   onClose: () => void;
};

export const BibleChapterSummary = ({ chapterId, onClose }: TChapterSummaryProps) => {
   const router = useRouter();
   const [data, setData] = useState<any>(null);
   const [loading, setLoading] = useState<string>("loading");
   const [votingStatus, setVotingStatus] = useState<number>(-1);

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

   const handleVote = async (vote: number) => {
      if (!chapterId) return;

      const cookie = getCookie(`chapterSummaryVote_${chapterId}`);
      if (cookie && cookie === vote.toString()) return;

      try {
         const { data, error, status } = await useChapterSummaryVote({
            CHAPTER_ID: chapterId,
            vote
         });

         if (data && status === "done") {
            const when = Date.now() + 86400000; // 6 months
            const cookieExpiration = new Date(when);
            document.cookie = `chapterSummaryVote_${chapterId}=${vote}; path=/read; expires=${cookieExpiration.toUTCString()}`;
            setVotingStatus(vote);
         } else {
            console.error(error);
         }
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      if (router.isReady) {
         const { CHAPTER_ID } = router.query;
         if (CHAPTER_ID && !chapterId) getData(CHAPTER_ID as string);
         else if (chapterId) getData(chapterId);
      }
   }, [router.isReady, router.query, chapterId]);

   useEffect(() => {
      const cookie = getCookie(`chapterSummaryVote_${chapterId}`);

      if (cookie) {
         setVotingStatus(parseInt(cookie));
      }
   }, []);
   return (
      <PortalSecondary>
         <div className={styles.mainWrapper}>
            <div className={styles.contentWrapper}>
               <div className={styles.backLink}>
                  <BackLink title='Back to chapter' cta={{ handleClick: onClose }} />
               </div>

               {loading === "done" && data && (
                  <>
                     <div className={styles.text}>
                        <Header
                           color={GRADIENT_1__LIGHT}
                           className={styles.title}
                           text='Chapter summary'
                           size='large'
                           type={2}
                        />
                        <Parragraph
                           className={styles.text}
                           text={data?.data?.summary}
                           size='main'
                        />
                     </div>

                     <Parragraph
                        quiet
                        size='main'
                        text='How was this summary?'
                        className={styles.summaryQuestion}
                        align='center'
                     />
                     <div className={styles.buttonWrapper}>
                        <IconButton
                           icon='thumbsUp'
                           backgroundColor={votingStatus === 1 ? "2" : "1"}
                           cta={{ handleClick: () => handleVote(1) }}
                        />
                        <IconButton
                           icon='thumbsDown'
                           backgroundColor={votingStatus === 0 ? "2" : "1"}
                           cta={{ handleClick: () => handleVote(0) }}
                        />
                     </div>
                  </>
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
