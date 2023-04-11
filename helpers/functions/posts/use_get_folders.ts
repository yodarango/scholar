import { useEffect, useState } from "react";
import { client } from "../../../apollo-client";
import { GET_FOLDER_POST_COUNT } from "../../../graphql/posts/folders";

type TgetfoldersVariables = {
   ID?: string | number;
   USER_ID?: string;
   isSelf?: boolean;
   query_type?: string;
};
export const useGetFolders = (variables: TgetfoldersVariables) => {
   const [data, setdata] = useState<null | any[]>([]);
   const [status, setstatus] = useState("loading");

   const getData = async () => {
      try {
         const { data } = await client.query({
            query: GET_FOLDER_POST_COUNT,
            variables
         });

         if (data.get_commentary_folder) {
            setdata(data.get_commentary_folder);
            setstatus("done");
         } else {
            setdata(null);
            setstatus("error");
         }
      } catch (error) {
         setdata(null);
         setstatus("error");
      }
   };

   useEffect(() => {
      getData();
   }, [variables.query_type]);

   return {
      data,
      status
   };
};
