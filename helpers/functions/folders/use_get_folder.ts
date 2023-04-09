import { useEffect, useState } from "react";
import { client } from "../../../apollo-client";
import { GET_FOLDER } from "../../../graphql/posts/folders";
export type TFolderData = {
   image?: string;
   name: string;
   description: string;
   is_private: boolean;
};

export const useGetFolder = (ID: string | number | null) => {
   const [status, setStatus] = useState("loading");
   const [data, setdata] = useState<TFolderData | null>(null);

   const fetch = async () => {
      try {
         const { data } = await client.query({
            query: GET_FOLDER,
            variables: { ID }
         });

         if (data.get_folder) {
            setdata(data.get_folder[0]);
            setStatus("done");
         } else {
            setdata(null);
            setStatus("error");
         }
      } catch (error) {
         console.error(error);
         setStatus("error");
      }
   };

   useEffect(() => {
      if (ID) {
         fetch();
      }
   }, [ID]);

   return {
      data,
      status
   };
};
