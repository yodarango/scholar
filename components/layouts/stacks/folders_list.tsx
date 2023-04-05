import { useGetFolders } from "../../../helpers/functions/posts/use_get_folders";
import { RoundLoader } from "../../fragments/chunks/round_loader";
import { SearchInput } from "../../fragments/inputs/search_input";
import { FolderCard } from "../../fragments/cards/folder_card";
import { PrimaryStack } from "./templates/primary_stack";
import styles from "./folders_list.module.css";
import React, { useEffect, useState } from "react";
import { useSwipeLeft } from "../../../hooks/use_swipe_left";

type TFolderListProps = {
   isSelf?: boolean;
};

export const FolderList = ({ isSelf }: TFolderListProps) => {
   const { data, status } = useGetFolders({ isSelf, query_type: "my-folders" });
   const [openOptions, setopenOptions] = useState(false);
   const [folders, setFolders] = useState<any[] | null>([]);

   useEffect(() => {
      setFolders(data);
   }, [data, status]);

   const handleFilterFolders = (val: string) => {
      const filteredFolders =
         data &&
         data.filter((folder: any) => folder.name.toLowerCase().includes(val.toLowerCase()));

      setFolders(filteredFolders);
   };

   const handleSwipeLeft = (delta: any) => setopenOptions(delta);

   const handleSwipeRight = () => setopenOptions(false);

   return (
      <PrimaryStack title='My folders' icon='folder' cta={{ handleClose: () => {} }}>
         <>
            <SearchInput
               placeholder='Search folder'
               bounceTime={500}
               maxL={100}
               cta={{ handleOnChange: handleFilterFolders }}
            />
            {status === "done" && (
               <div className={styles.foldersWrapper}>
                  {folders &&
                     folders.map((folder) => (
                        <div
                           className={styles.folder}
                           onTouchStart={(e) => useSwipeLeft(e, handleSwipeLeft, handleSwipeRight)}>
                           <FolderCard
                              thumbnail={folder.image}
                              folderName={folder.name}
                              postCount={folder.post_count}
                              ID={folder.ID}
                           />
                        </div>
                     ))}
               </div>
            )}
            {status === "error" && <div>#NEEDSGRAPHICS</div>}
            {status === "loading" && (
               <div className={styles.loader}>
                  <RoundLoader />
               </div>
            )}
         </>
      </PrimaryStack>
   );
};
