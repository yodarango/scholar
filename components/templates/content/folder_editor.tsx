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
import { Notification } from "../../fragments/popups/notification";
import { SmallLoader } from "../../fragments/chunks/small_loader";
import { TextAreaPrimary } from "../../fragments/inputs/text_area_primary";
import { ColorPickerOptions } from "../../fragments/color_picker_options";
import { SelectHighlightColor } from "../../layouts/menus/select_highlight_color";
import { Parragraph } from "../../fragments/Typography/parragraph";
import { PRIMARY_COLOR, THIRD_COLOR } from "../../../constants/tokens";

type TFolderProps = {
   isEdit?: boolean;
};
const MENU_IMAGE_PICKER = 1;
const MENU_COLOR_PICKER = 2;

export const FolderEditor = ({ isEdit = false }: TFolderProps) => {
   const [ID, setID] = useState<null | string>(null);
   const [notification, setnotification] = useState<{
      title?: string;
      body?: string;
      type?: string;
      status: string;
   } | null>(null);
   const { data, status } = useGetFolder(ID);
   const router = useRouter();
   const [menu, setMenu] = useState<number>(0);
   const [formData, setformData] = React.useState<TFolderData>({
      ID: "",
      name: "",
      description: "",
      is_private: false,
      image: "",
      color: THIRD_COLOR
   });

   const saveFolder = useSaveFolder(isEdit);

   useEffect(() => {
      setnotification(saveFolder.status);
   }, [saveFolder.status]);

   useEffect(() => {
      setformData({
         ID: data?.ID || "",
         name: data?.name || "",
         description: data?.description || "",
         is_private: data?.is_private || false,
         image: data?.image || "",
         color: THIRD_COLOR
      });
   }, [data]);

   useEffect(() => {
      if (typeof router.query.id === "string" && isEdit) setID(router.query.id);
   }, [router]);

   return (
      <div className={styles.mainWrapper}>
         <>
            {notification?.status === "error" && (
               <div className={styles.notification}>
                  <Notification
                     cta={{ handleClose: () => setnotification(null) }}
                     type={notification.type || ""}
                     title={notification.title || ""}
                     body={notification.body || ""}
                  />
               </div>
            )}
         </>
         <PrimaryStack icon='folder' title='Edit folder' link='/users/folders'>
            <>
               {status === "done" && (
                  <>
                     {menu === MENU_IMAGE_PICKER && (
                        <div className={styles.imagePicker}>
                           <UnsplasImgPicker
                              cta={{
                                 handleCloseModal: () => setMenu(0),
                                 handleImgSelection: (image) =>
                                    setformData((prev) => prev && { ...prev, image })
                              }}
                           />
                        </div>
                     )}
                     {menu === MENU_COLOR_PICKER && (
                        <SelectHighlightColor
                           theme={2}
                           cta={{
                              handleClose: () => setMenu(0),
                              handleColorSelection: (color) => {
                                 if (typeof color === "string")
                                    setformData((prev) => ({ ...prev, color })), setMenu(0);
                              }
                           }}
                        />
                     )}
                     <div className={styles.image}>
                        <Image
                           src={formData.image}
                           alt='thumbnail for the a folder component'
                           layout='fill'
                        />
                     </div>
                     <div className={styles.button}>
                        <Primary
                           type='2'
                           title='Change thumbnail'
                           cta={{ handleClick: () => setMenu(MENU_IMAGE_PICKER) }}
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
                        <TextAreaPrimary
                           maxLength={255}
                           defaultValue={data?.description}
                           placeHolder='Enter folder description'
                           cta={{
                              handleCurrentValue: (description) =>
                                 setformData((prev) => prev && { ...prev, description })
                           }}
                        />
                     </div>

                     <div className={styles.button}>
                        <Primary
                           customColor={{
                              button: formData.color,
                              text: PRIMARY_COLOR
                           }}
                           title='Change folder color'
                           cta={{ handleClick: () => setMenu(MENU_COLOR_PICKER) }}
                        />
                     </div>
                     <div className={styles.button}>
                        {saveFolder.status.status !== "loading" && (
                           <Primary
                              type='1'
                              title='Save'
                              cta={{ handleClick: () => saveFolder.save(formData) }}
                           />
                        )}
                        {saveFolder.status.status === "loading" && <SmallLoader />}
                     </div>
                  </>
               )}
            </>
         </PrimaryStack>
      </div>
   );
};
