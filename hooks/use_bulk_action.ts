/***************************************************************************************** 
agnostic hook that sends simply a type of action 'delete', 'private' , etc and a list of IDs
to m the action upon. It also takes a content type so the backend knows the content 
to execute the action upon. ⛑️
*******************************/

import { useState } from "react";
import { client } from "../apollo-client";
import { BULK_ACTION } from "../graphql/posts/bulk_actions";
import {
   CONTENT_TYPE_FOLDER,
   POST_TYPE_COMMENTARY,
   POST_TYPE_QUOTE,
   POST_TYPE_THOUGHT
} from "../constants/defaults";

type contentType =
   | typeof CONTENT_TYPE_FOLDER
   | typeof POST_TYPE_COMMENTARY
   | typeof POST_TYPE_QUOTE
   | typeof POST_TYPE_THOUGHT;

type TUseBulkActionVariables = {
   action: string;
   contentType: contentType;
   IDs: string[];
   USER_ID?: string;
   isSelf?: boolean;
};

export const useBulkAction = () => {
   const [data, setData] = useState<any>(null);
   const [status, setStatus] = useState<string>("idle");

   const goDo = async (variables: TUseBulkActionVariables) => {
      setStatus("loading");
      try {
         const { data } = await client.query({
            query: BULK_ACTION,
            variables
         });

         if (data.bulk_actions) {
            setData(data.bulk_actions);
            setStatus("success");
         } else if (data.bulk_actions === false) {
            setStatus("error");
         }
      } catch (error) {
         console.error(error);
         setStatus("error");
      }
   };

   return { goDo, data, status };
};
