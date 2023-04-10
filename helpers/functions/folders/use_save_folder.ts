import { useState } from "react";
import { TFolderData } from "./use_get_folder";
import { client } from "../../../apollo-client";
import { EDIT_FOLDER, NEW_FOLDER } from "../../../graphql/posts/folders";
import { errorMessages } from "../../../data/error_messages";
import { notificationMessages } from "../../../data/notification_messages";

export const useSaveFolder = (isEdit: boolean) => {
   const [data, setdata] = useState(null);
   const [status, setstatus] = useState<{
      title?: string;
      body?: string;
      type?: string;
      status: string;
   }>({ status: "none" });

   const QUERY = isEdit ? EDIT_FOLDER : NEW_FOLDER;

   const save = async (variables: TFolderData) => {
      setstatus({ status: "loading" });
      try {
         const { data } = await client.mutate({
            mutation: QUERY,
            variables
         });

         if (data.save_folder) {
            setdata(data.save_folder);
            setstatus({
               title: notificationMessages.folderSaved.title,
               body: notificationMessages.folderSaved.body,
               type: "2",
               status: notificationMessages.folderSaved.type
            });
         } else {
            setstatus({
               title: errorMessages.posts.failedToSaveFolder.title,
               body: errorMessages.posts.failedToSaveFolder.body,
               type: "4",
               status: errorMessages.posts.failedToSaveFolder.type
            });
            setdata(null);
         }
      } catch (error) {
         setstatus({
            title: errorMessages.posts.failedToSaveFolder.title,
            body: errorMessages.posts.failedToSaveFolder.body,
            type: "4",
            status: errorMessages.posts.failedToSaveFolder.type
         });
         console.error(error);
         setdata(null);
      }
   };

   return {
      status,
      data,
      save
   };
};
