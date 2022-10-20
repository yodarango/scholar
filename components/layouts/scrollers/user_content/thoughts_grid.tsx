import { useEffect, useState } from "react";

// comps
import { Header } from "../../../fragments/Typography/header";
import { Parragraph } from "../../../fragments/Typography/parragraph";
import { GridPrimary } from "../grid_primary";
import { Thought } from "../../../fragments/cards/posts/thought";

// styles
import styles from "./commentaries_grid.module.css";

// types
import { TThought } from "../../../../types/posts";

type TThoughtsGridProps = {
   filters?: { tag?: string };
};

export const ThoughtsGrid = ({ filters }: TThoughtsGridProps) => {
   const [thoughts, setthoughts] = useState<TThought[]>([]);

   // fetch commentaris based on ID
   useEffect(() => {
      setthoughts(
         [...Array(20)].map(() => ({
            ID: "32",
            title: "This is a title",
            body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
            category_tags: "#YLW",
            referenced_verses: "1CO.1.1 MATT.2.2",
            posted_on: "11/29/22 22:00",
            date: "11/29/22 22:00",
            total_count: 10,
            postImage: "/images/bible_books/1.png",
            creator: {
               ID: "1",
               signature: "Username",
               authority_level: 1,
               approval_rating: 90,
               avatar: "/imges/user_avatars/default.png",
               first_name: "John",
               last_name: "Doe",
               my_church: "The Chruch of my Lord Jesus Christ"
            },
            comments: [
               {
                  total_count: 34
               }
            ],
            approvals: [
               {
                  average_count: 3,
                  total_count: 34
               }
            ]
         }))
      );
   }, []);

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.gridWrapper}>
            <GridPrimary>
               {thoughts.map((thought: TThought, index: number) => (
                  <div key={index} className={styles.child}>
                     <Thought
                        cta={{
                           handleDelete: () => console.log("handle show post")
                        }}
                        thought={thought}
                     />
                  </div>
               ))}
            </GridPrimary>
         </div>
      </div>
   );
};
