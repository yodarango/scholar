import React, { useEffect, useState } from "react";
import { PrimaryStack } from "../../layouts/stacks/templates/primary_stack";
import Image from "next/image";
import { Primary } from "../../fragments/buttons/primary";
import { InputPrimary } from "../../fragments/inputs/input_primary";
import { UnsplasImgPicker } from "../../layouts/scrollers/unsplash_img_picker";
import { useRouter } from "next/router";

import styles from "./folder_editor.module.css";
import { TFolderData, useGetFolder } from "../../../helpers/functions/folders/use_get_folder";
import Portal from "../../hoc/potal";
import PortalSecondary from "../../hoc/portal_secondary";
import { useSaveFolder } from "../../../helpers/functions/folders/use_save_folder";

type TFolderProps = {
   isEdit?: boolean;
};

export const FolderEditor = ({ isEdit = false }: TFolderProps) => {
   const [ID, setID] = useState<null | string>(null);
   const [isSaving, setisSaving] = useState<string>("done");
   const { data, status } = useGetFolder(ID);
   const router = useRouter();
   const [imagePicker, setimagePicker] = useState<boolean>(false);
   const [formData, setformData] = React.useState<TFolderData>({
      name: "",
      description: "",
      is_private: false,
      image: ""
   });

   const saveFolder = useSaveFolder(isEdit);

   const handleSaveFolder = () => {
      setisSaving("loading");

      saveFolder.save(formData);

      if (saveFolder.data || saveFolder.data === null) {
         setisSaving("done");
      }
   };

   useEffect(() => {
      if (typeof router.query.id === "string" && isEdit) setID(router.query.id);
   }, [router]);

   return (
      <div className={styles.mainWrapper}>
         <PrimaryStack icon='folder' title='Edit folder' link='/users/folders'>
            <>
               {status === "done" && (
                  <>
                     {imagePicker && (
                        <div className={styles.imagePicker}>
                           <UnsplasImgPicker
                              cta={{
                                 handleCloseModal: () => setimagePicker(!imagePicker),
                                 handleImgSelection: (image) =>
                                    setformData((prev) => prev && { ...prev, image })
                              }}
                           />
                        </div>
                     )}
                     <div className={styles.image}>
                        <Image
                           src={formData.image ? formData.image : `${data?.image}`}
                           alt='thumbnail for the a folder component'
                           layout='fill'
                        />
                     </div>
                     <div className={styles.button} onClick={() => setimagePicker(!imagePicker)}>
                        <Primary
                           type='2'
                           title='Change thumbnail'
                           cta={{ handleClick: () => setimagePicker(!imagePicker) }}
                        />
                     </div>
                     <div className={styles.input}>
                        <InputPrimary
                           maxL={100}
                           type='1'
                           placeholder='Enter folder name'
                           value={data?.name}
                           cta={{
                              handleValue: (name) =>
                                 setformData((prev) => prev && { ...prev, name })
                           }}
                        />
                     </div>
                     <div className={styles.textArea}>
                        <InputPrimary
                           maxL={100}
                           type='1'
                           value={data?.description}
                           placeholder='Enter folder title'
                           cta={{
                              handleValue: (description) =>
                                 setformData((prev) => prev && { ...prev, description })
                           }}
                        />
                     </div>
                     <div className={styles.button}>
                        <Primary
                           type='1'
                           title='Save'
                           cta={{ handleClick: handleSaveFolder }}
                           disabled={isSaving === "loading"}
                        />
                     </div>
                  </>
               )}
            </>
         </PrimaryStack>
      </div>
   );
};
