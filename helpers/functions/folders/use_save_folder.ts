import { useState } from "react";
import { TFolderData } from "./use_get_folder";
import { client } from "../../../apollo-client";
import { EDIT_FOLDER, NEW_FOLDER } from "../../../graphql/posts/folders";

export const useSaveFolder = (isEdit: boolean) => {
   const [data, setdata] = useState(null);

   const QUERY = isEdit ? EDIT_FOLDER : NEW_FOLDER;

   const save = async (values: TFolderData) => {
      try {
         const { data } = await client.mutate({
            mutation: QUERY,
            variables: { values }
         });

         if (data.save_folder) {
            setdata(data.save_folder);
         } else {
            setdata(null);
         }
      } catch (error) {
         console.error(error);
         setdata(null);
      }
   };

   return {
      data,
      save
   };
};
