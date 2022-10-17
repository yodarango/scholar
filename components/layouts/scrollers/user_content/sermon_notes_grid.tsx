import { useEffect, useState } from "react";

// comps
import { GridPrimary } from "../grid_primary";
import { Thought } from "../../../fragments/cards/posts/thought";

// styles
import styles from "./commentaries_grid.module.css";

// types
import { TSermonNote } from "../../../types/posts";
import { SermonNote } from "../../../fragments/cards/posts/sermon_note";

export const SermonNotesGrid = () => {
   const [sermonNotes, setsermonNotes] = useState<TSermonNote[]>([]);

   // fetch commentaris based on ID
   useEffect(() => {
      setsermonNotes(
         [...Array(20)].map(() => ({
            ID: "32",
            content: "This is a title",
            DROPBOX_ID:
               "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
            category_tags: "#YLW",
            posted_on: "07/29/22 22:00",
            date: "07/29/22 22:00",
            title: "title",
            file_url: "#",
            creator: {
               ID: "1",
               signature: "Username",
               authority_level: 1,
               approval_rating: 90,
               avatar: "/imges/user_avatars/default.png",
               first_name: "John",
               last_name: "Doe",
               my_church: "The Chruch of my Lord Jesus Christ"
            }
         }))
      );
   }, []);

   return (
      <div className={styles.mainWrapper}>
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
         </div>
      </div>
   );
};
