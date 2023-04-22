import { useGetFolders } from "../../../helpers/functions/posts/use_get_folders";
import { RoundLoader } from "../../fragments/chunks/round_loader";
import { SearchInput } from "../../fragments/inputs/search_input";
import { FolderCard } from "../../fragments/cards/folder_card";
import { PrimaryStack } from "./templates/primary_stack";
import styles from "./folders_list.module.css";
import React, { useEffect, useState } from "react";
import { IconButton } from "../../fragments/buttons/icon_button";
import { useRouter } from "next/router";

type TFolderListProps = {
   isSelf?: boolean;
   cta?: {
      handleFolderSelection?: (id: string | number) => void;
      handleClose?: () => void;
   };
};

export const FolderList = ({ isSelf, cta }: TFolderListProps) => {
   const router = useRouter();
   const { data, status } = useGetFolders({ isSelf, query_type: "my-folders" });
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

   return (
      <PrimaryStack
         title='My folders'
         icon='folder'
         cta={{ handleClose: cta?.handleClose ? cta?.handleClose : () => router.back() }}>
         <>
            <div className={styles.add}>
               <IconButton icon='add' backgroundColor='2' link='/users/folders/new' />
            </div>

            <SearchInput
               placeholder='Search folder'
               bounceTime={100}
               maxL={100}
               cta={{ handleOnChange: handleFilterFolders }}
            />
            {status === "done" && (
               <div className={styles.foldersWrapper}>
                  {folders &&
                     folders.map((folder, i: number) => (
                        <div key={i} className={styles.folder}>
                           <FolderCard
                              cta={{ handleClick: cta?.handleFolderSelection }}
                              thumbnail={folder.image}
                              folderName={folder.name}
                              postCount={folder.post_count}
                              isPrivate={folder.is_private}
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
