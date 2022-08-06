import { useState } from "react";

// comps
import { Parragraph } from "../Typography/parragraph";
import { Notification } from "../popups/notification";
import { CloseContent } from "../buttons/close_content";
import { SmallLoader } from "./small_loader";

//styles
import styles from "./verse_ref_tag.module.css";

// helpers
import { chosenKey } from "../../helpers/APIs/select-random-api-key";

// data
import { notificationMessages } from "../../data/notification_messages";

type TVerseRefTag = {
   reference: string;
   versionId: string;
   showRemoveoption: boolean;
   cta?: (id: string) => void;
};

export const VerseRefTag = ({ reference, versionId, showRemoveoption, cta }: TVerseRefTag) => {
   // ---------- states ---------------
   const [showNotificationCard, setshowNotificationCard] = useState<string>("none");
   const [loading, setLoading] = useState<boolean>(false);
   const [verseFetched, setverseFetched] = useState<any>(null);

   // ------------- make the call to the Bible APi
   const fetchVerse = async () => {
      setLoading(true);
      try {
         const req = await fetch(
            `https://api.scripture.api.bible/v1/bibles/${versionId}/verses/${reference}`,
            {
               method: "GET",
               headers: {
                  "api-key": `${chosenKey}`
               }
            }
         );
         const res = await req.json();
         console.log(res);

         if (res) {
            setverseFetched(res.data);
            setLoading(false);
            setshowNotificationCard("success");
         } else {
            setshowNotificationCard("error");
         }
      } catch (error) {
         console.log(error);
         setLoading(false);
         setshowNotificationCard("error");
      }
   };

   const handleGetVerse = () => {
      fetchVerse();
   };

   return (
      <>
         {showNotificationCard === "success" && verseFetched && (
            <Notification
               title={verseFetched.reference}
               body={
                  <span
                     className={styles.data}
                     dangerouslySetInnerHTML={{ __html: verseFetched.content }}></span>
               }
               cta={() => setshowNotificationCard("none")}
               type='1'
            />
         )}

         {showNotificationCard === "error" && verseFetched && (
            <Notification
               title={notificationMessages.selectNewScriptureError.title}
               body={notificationMessages.selectNewScriptureError.body}
               cta={() => setshowNotificationCard("none")}
               type='4'
            />
         )}

         <div className={styles.mainWrapper}>
            {!loading && (
               <div onClick={handleGetVerse}>
                  <Parragraph text={reference} size='xs' align='center' quiet={true} />
               </div>
            )}

            {loading && (
               <div className={styles.loader}>
                  <SmallLoader />
               </div>
            )}

            {showRemoveoption && (
               <div className={styles.remove}>
                  <CloseContent color='#5C5470' size='1.5rem' cta={() => cta && cta(reference)} />
               </div>
            )}
         </div>
      </>
   );
};
