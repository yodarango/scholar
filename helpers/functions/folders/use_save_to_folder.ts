import { useState } from "react";
import { TFolderData } from "./use_get_folder";
import { client } from "../../../apollo-client";
import { EDIT_FOLDER, NEW_FOLDER, SAVE_TO_FOLDER } from "../../../graphql/posts/folders";
import { errorMessages } from "../../../data/error_messages";
import { notificationMessages } from "../../../data/notification_messages";

type TSaveToFolder = { folder_id: string | number; post_id: string | number };
export const useSaveToFolders = () => {
   const [data, setdata] = useState(null);
   const [status, setstatus] = useState<{
      title?: string;
      body?: string;
      type?: string;
      status: string;
   }>({ status: "none" });

   const save = async (variables: TSaveToFolder) => {
      // validate input
      setstatus({ status: "loading" });
      try {
         const { data } = await client.mutate({
            mutation: SAVE_TO_FOLDER,
            variables
         });

         if (data.save_to_folder?.ID) {
            setdata(data.save_folder || data.edit_folder);
            setstatus({
               title: notificationMessages.savedToFolder.title,
               body: notificationMessages.savedToFolder.body,
               type: "2",
               status: notificationMessages.savedToFolder.type
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
