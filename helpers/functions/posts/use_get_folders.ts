import { useEffect, useState } from "react";
import { client } from "../../../apollo-client";
import { GET_FOLDER_POST_COUNT } from "../../../graphql/posts/folders";

type TgetfoldersVariables = {
   ID?: string | number;
   USER_ID?: string;
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

//TODO: I was having hard time making the hooked version wait for the router.signature
// So i just went ahead and made the unhooked version that does not have the useEffect
export const useGetFoldersUnHooked = async (variables: TgetfoldersVariables) => {
   try {
      const { data } = await client.query({
         query: GET_FOLDER_POST_COUNT,
         variables
      });

      if (data.get_commentary_folder) {
         return {
            data: data.get_commentary_folder,
            status: "done"
         };
      } else {
         return {
            data: null,
            status: "error"
         };
      }
   } catch (error) {
      console.error(error);
      return {
         data: null,
         status: "error"
      };
   }
};
