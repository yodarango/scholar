import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { useRouter } from "next/router";
import { CommentariesGrid } from "../../../../components/layouts/scrollers/user_content/commentaries_grid";
import { CategoryTag } from "../../../../components/fragments/chunks/category_tag";
import { PrimaryStack } from "../../../../components/layouts/stacks/templates/primary_stack";
import { SecondaryStack } from "../../../../components/layouts/stacks/templates/secondary_stack";
import { TeritaryStack } from "../../../../components/layouts/stacks/templates/teritary_stack";
import { FourthStack } from "../../../../components/layouts/stacks/templates/fourth_stack";
import { HeaderWithImgBkg } from "../../../../components/layouts/stacks/templates/header_with_img_bkg";

const Index = () => {
   const router = useRouter();

   const isSelf = true;

   // category filter
   const [tagFilter, settagFilter] = useState<any>(null); // category
   const [folderId, setFolderId] = useState<string | undefined>(undefined);

   // when the user clicks folder or tag: push new category tag to the router
   const handleFilterSelection = (query: any) => {
      if (folderId) router.push({ pathname: router.pathname.replace("[id]", folderId), query });
   };

   // check for query changes
   useEffect(() => {
      if (router.isReady) {
         if (typeof router.query.id === "string") {
            setFolderId(router.query.id);

            // set it in the router because the commentaryWrapper needs it
            router.query["folder"] = router.query.id;
         }
         if (router.query.category) {
            settagFilter(router.query.category);
         }
      }
   }, [router.isReady, router.query]);

   return (
      <HeaderWithImgBkg image='' title=''>
         <div className={styles.mainWrapper}>
            <div className={styles.tag}>
               <CategoryTag
                  initiaValue={tagFilter}
                  cta={{
                     handleSelection: (val) => handleFilterSelection({ category: val })
                  }}
                  informativeOnly={false}
               />
            </div>
            <CommentariesGrid isSelf={isSelf} folderId={folderId} />
         </div>
      </HeaderWithImgBkg>
   );
};

export default Index;
