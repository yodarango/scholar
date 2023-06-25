import React, { useEffect, useState } from "react";
import styles from "./posts_in_folder.module.css";
import { useRouter } from "next/router";
import { CommentariesGrid } from "../../../components/layouts/scrollers/user_content/commentaries_grid";
import { CategoryTag } from "../../../components/fragments/chunks/category_tag";
import { HeaderWithImgBkg } from "../../../components/layouts/stacks/templates/header_with_img_bkg";
import { TFolderData, useGetFolder } from "../../../helpers/functions/folders/use_get_folder";
import { Parragraph } from "../../../components/fragments/Typography/parragraph";
import { Header } from "../../../components/fragments/Typography/header";
import { BackLink } from "../../../components/fragments/buttons/back_link";
import { SelectFolderOptions } from "../../layouts/menus/select_folder_options";

export const PostsInFolder = () => {
   const router = useRouter();

   // category filter
   const [tagFilter, settagFilter] = useState<any>(null); // category
   const [folderId, setFolderId] = useState<string | undefined>(undefined);
   const [userId, setuserId] = useState<string>("");
   const [folder, setFolder] = useState<null | TFolderData>(null);
   const [showMenu, setShowMenu] = useState(false);

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

         if (typeof router.query.signature === "string") {
            setuserId(router.query.signature.replaceAll("[", "").replaceAll("]", ""));
         }
      }
   }, [router.isReady, router.query]);

   const { status, data } = useGetFolder(folderId);

   useEffect(() => {
      setFolder(data);
   }, [data]);

   return (
      <>
         {showMenu && folderId && (
            <SelectFolderOptions
               folderId={folderId}
               cta={{
                  handleEdit: () => router.push(`/users/${userId}/folders/edit/${folderId}`),
                  handleCloseModal: () => setShowMenu(false),
                  handleAfterDeletion: () => router.push(`/users/${userId}/folders`)
               }}
            />
         )}
         <HeaderWithImgBkg
            image={folder?.image}
            title={<Title title={folder?.name || ""} userId={userId} />}
            description={folder?.description}
            cta={{ handleOpenOptions: () => setShowMenu(!showMenu) }}
            options={
               <div className={styles.tag}>
                  <CategoryTag
                     initiaValue={tagFilter}
                     cta={{
                        handleSelection: (val) => handleFilterSelection({ category: val })
                     }}
                     informativeOnly={false}
                  />
               </div>
            }>
            <div className={styles.commentariesGrid}>
               {folder?.description && (
                  <Parragraph
                     text={folder.description}
                     size='main'
                     className={styles.description}
                  />
               )}
               {folderId && <CommentariesGrid folderId={folderId} />}
            </div>
            <div className='spacer-page-bottom'></div>
         </HeaderWithImgBkg>
      </>
   );
};

function Title({ title, userId }: { title: string; userId: string }) {
   return (
      <div className={styles.title}>
         <BackLink title='Folders' link={`/users/${userId}/folders`} />
         <Header text={title} type={2} size='xlarge' className={styles.header} />
      </div>
   );
}
