// comps
import { useEffect, useState } from "react";
import { LinkWithArrow } from "../../fragments/buttons/link_with_arrow";
import { ContentGraphicsPost } from "../../fragments/cards/content_graphics_post";
import { Header } from "../../fragments/Typography/header";

// styles
import styles from "./fast_facts.module.css";

// types
import { TFastFacts } from "../../../types/interactive";
import { getFastFactsIn24 } from "../../../helpers/functions/interactive/fast_facts";
import { RoundLoader } from "../../fragments/chunks/round_loader";
import { ResourceNotFoundError } from "../../fragments/chunks/error_resource_not_found";

export const FastFacts = () => {
   const [images, setimages] = useState<TFastFacts | null>();
   const [loading, setloading] = useState<string>("loading");

   const getData = async () => {
      try {
         const { data, status } = await getFastFactsIn24();
         data && setimages(data.fast_facts_in_24);
         console.log(data);
         setloading(status);
      } catch (error) {
         setimages(null);
         console.error(error);
         setloading("error");
      }
   };

   useEffect(() => {
      getData();
   }, []);

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.top}>
            <div>
               <Header type={3} text='Fast Facts' size='large' quiet={true} />
            </div>
            <div>
               <LinkWithArrow title='See all' link={"/wigo/fast-facts"} />
            </div>
         </div>
         {loading === "done" && images && (
            <div className={styles.fastFacts}>
               <ContentGraphicsPost content={images} />
            </div>
         )}
         {loading === "loading" && (
            <div className={styles.loader}>
               <RoundLoader />
            </div>
         )}
         {loading === "error" && <div className={styles.error}>#needsgraphics</div>}
      </div>
   );
};
