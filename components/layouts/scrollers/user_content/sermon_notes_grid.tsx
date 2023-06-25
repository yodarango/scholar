import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// comps
import { GridPrimary } from "../grid_primary";
import { SermonNote } from "../../../fragments/cards/posts/sermon_note";
import { Primary } from "../../../fragments/buttons/primary";
import { SmallLoader } from "../../../fragments/chunks/small_loader";
import { RoundLoader } from "../../../fragments/chunks/round_loader";
import { ResourceNotFound } from "../../../common/feedback/resource_not_found";

// styles
import styles from "./sermon_notes_grid.module.css";

// types
import { TSermonNote } from "../../../../types/posts";

// helpers
import {
   handleGetSermonNotes,
   TgetSermonNotesVariables
} from "../../../../helpers/functions/posts/sermon_note_get";
import { CONTENT_LAST_ID } from "../../../../constants/defaults";

export const SermonNotesGrid = () => {
   // router
   const router = useRouter();

   // components
   const [sermonNotes, setsermonNotes] = useState<TSermonNote[]>([]);
   const [loading, setloading] = useState<string>("loading");
   const [showloadMore, setshowloadMore] = useState<boolean>(true);
   const [smallLoader, setsmallLoader] = useState<boolean>(false);
   const [queryVariables, setqueryVariables] = useState<TgetSermonNotesVariables>({
      last_id: CONTENT_LAST_ID
   });

   // fetch data on first time loading. Only runs on first load
   const fetchData = async (variables: TgetSermonNotesVariables) => {
      setloading("loading");
      try {
         const { data, status } = await handleGetSermonNotes(variables);
         if (data && data.sermon_note) {
            setsermonNotes(data.sermon_note);
            data.sermon_note.length > 0 &&
               setqueryVariables({ last_id: data.sermon_note[data.sermon_note.length - 1].ID });

            data.sermon_note.length === 20 ? setshowloadMore(true) : setshowloadMore(false);
         }
         setloading(status);
      } catch (error) {
         console.error(error);
         setsermonNotes([]);
         setloading("error");
      }
   };

   //fetch data any time any of the query params change.
   const fetchOnQueryChange = async (variables: TgetSermonNotesVariables) => {
      setshowloadMore(false);
      setloading("loading");

      try {
         const { data, status } = await handleGetSermonNotes(variables);
         if (data && data.sermon_note) {
            setsermonNotes(data.sermon_note);
            data.sermon_note.length === 20 ? setshowloadMore(true) : setshowloadMore(false);
            setloading(status);
         }
      } catch (error) {
         setsermonNotes([]);
         setloading("error");
         console.error(error);
      }
   };

   // only fetches more with whatever params are there in the router posts
   const fetchMore = async (variables: TgetSermonNotesVariables) => {
      setshowloadMore(false);
      setsmallLoader(true);

      try {
         const { data, status } = await handleGetSermonNotes(variables);
         if (data && data.sermon_note) {
            // filter tags
            let moreSermonNotes = data.sermon_note;

            // update query variables
            moreSermonNotes.length > 0 &&
               setqueryVariables({
                  ...queryVariables,
                  last_id: moreSermonNotes[moreSermonNotes.length - 1].ID
               });

            setsermonNotes((prev) => [...prev, ...moreSermonNotes]);
            moreSermonNotes.length === 20 ? setshowloadMore(true) : setshowloadMore(false);
            setsmallLoader(false);
         }
      } catch (error) {
         setsermonNotes([]);
         console.error(error);
      }
   };

   // only call fetch data on initial load
   useEffect(() => {
      if (router.isReady)
         router.query.last_id
            ? fetchData({ ...router.query })
            : fetchData({ ...queryVariables, ...router.query });
   }, [router.isReady]);

   //call on query params change
   useEffect(() => {
      if (router.isReady) fetchOnQueryChange({ ...router.query, last_id: CONTENT_LAST_ID });
   }, [router.query]);

   return (
      <div className={styles.mainWrapper}>
         {loading === "done" && (
            <div className={styles.gridWrapper}>
               <GridPrimary>
                  {sermonNotes.map((sermonNote: TSermonNote, index: number) => (
                     <div key={index} className={styles.child}>
                        <SermonNote
                           cta={{
                              handleDelete: () => console.log("handle show post")
                           }}
                           sermonNote={sermonNote}
                        />
                     </div>
                  ))}
               </GridPrimary>

               {showloadMore && (
                  <div className={styles.loadMore}>
                     <Primary
                        title='Load more'
                        type='1'
                        cta={{
                           handleClick: () =>
                              fetchMore({
                                 ...router.query,
                                 last_id: sermonNotes[sermonNotes.length - 1].ID
                              })
                        }}
                     />
                  </div>
               )}

               {smallLoader && (
                  <div className={styles.smallLoader}>
                     <SmallLoader />
                  </div>
               )}
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
      </div>
   );
};
