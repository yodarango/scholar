// components
import { LinkWithArrow } from "../../fragments/buttons/link_with_arrow";
import { Header } from "../../fragments/Typography/header";
import { ThoughtsOneLineCarrousel } from "../scrollers/user_content/thoughts_one_line_carrousel";

// styles
import styles from "./wigo_thoughts.module.css";

// types
import { TThought } from "../../../types/posts";
import { useEffect, useState } from "react";

// helpers
import { handleGetThoughtIn24 } from "../../../helpers/functions/posts/thought_get";

export const WigoThoughts = () => {
   const [thoughts, setthoughts] = useState<TThought[]>([]);
   const [loading, setloading] = useState<string>("loading");

   // fetch data
   const fetchData = async () => {
      try {
         const { data, status } = await handleGetThoughtIn24();
         data && setthoughts(data.thought_in_24);

         setloading(status);
      } catch (error) {
         console.error(error);
         setthoughts([]);
         setloading("error");
      }
   };

   useEffect(() => {
      fetchData();
   }, []);

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.top}>
            <div>
               <Header type={3} text='Thoughts' size='large' quiet={true} />
            </div>
            <div>
               <LinkWithArrow title='See all' link={"/posts/thought"} />
            </div>
         </div>
         <div className={styles.carrousel}>
            <ThoughtsOneLineCarrousel thoughts={thoughts} loadingState={loading} />
         </div>
      </div>
   );
};
