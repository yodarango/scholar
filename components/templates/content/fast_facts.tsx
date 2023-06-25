import { useEffect, useState } from "react";

// components
import { SecondaryStack } from "../../layouts/stacks/templates/secondary_stack";
import { RoundLoader } from "../../fragments/chunks/round_loader";
import { ResourceNotFound } from "../../common/feedback/resource_not_found";
import { ContentGraphicsPost } from "../../fragments/cards/content_graphics_post";

// styles
import styles from "./fast_facts.module.css";

// helpers
import {
   getAllFastFacts,
   TgetAllFastFactsVariables
} from "../../../helpers/functions/interactive/fast_facts";
import { CONTENT_LAST_ID, FAST_FACTS_PER_QUERY } from "../../../constants/defaults";

// types
import { TFastFacts } from "../../../types/interactive";
import { Primary } from "../../fragments/buttons/primary";
import { SmallLoader } from "../../fragments/chunks/small_loader";
import { Empty } from "../../common/feedback/empty";

export const AllFastFacts = () => {
   /// state
   const [loading, setloading] = useState<string>("loading");
   const [fasfacts, setfastfacts] = useState<TFastFacts[] | null>([]);
   const [variables, setvariables] = useState<TgetAllFastFactsVariables>({
      last_id: CONTENT_LAST_ID
   });
   const [showLoadMore, setshowLoadMore] = useState(false);

   const getData = async () => {
      try {
         const { data, status } = await getAllFastFacts(variables);

         if (data) {
            if (data.length > 0) {
               setfastfacts((prev) => prev && [...data, ...prev]);
               setvariables({ last_id: data.at(-1).ID });

               if (data.length === FAST_FACTS_PER_QUERY) setshowLoadMore(true);
            } else {
               setshowLoadMore(false);
            }
         }

         setloading(status);
      } catch (error) {
         setfastfacts(null);
         console.error(error);
         setloading("error");
      }
   };

   const getMoreData = () => {
      setloading("loading-more");

      setTimeout(() => {
         getData();
      }, 300);
   };

   useEffect(() => {
      getData();
   }, []);

   return (
      <SecondaryStack title='Fast Facts' icon='flash' href='/'>
         <>
            {(loading === "done" || loading === "loading-more") && (
               <>
                  {fasfacts?.map((ff: any, index: number) => {
                     return (
                        <div key={index} className={styles.fastFacts}>
                           <ContentGraphicsPost content={ff} />
                        </div>
                     );
                  })}
                  {showLoadMore && loading !== "loading-more" && (
                     <div className={styles.button}>
                        <Primary
                           title='More results'
                           type='1'
                           cta={{ handleClick: () => getMoreData() }}
                        />
                     </div>
                  )}
               </>
            )}

            {loading === "loading-more" && (
               <div className={styles.button}>
                  <SmallLoader />
               </div>
            )}

            {loading === "loading" && (
               <div className={styles.loader}>
                  <RoundLoader />
               </div>
            )}
            {loading === "error" && (
               <div className={styles.error}>
                  <ResourceNotFound />
               </div>
            )}
            {fasfacts?.length === 0 && loading === "done" && (
               <div className={styles.error}>
                  <Empty />
               </div>
            )}
         </>
      </SecondaryStack>
   );
};
