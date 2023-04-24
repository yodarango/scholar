/***************************************************************************************** 
agnostic hook that sends simply a type of action 'delete', 'private' , etc and a list of IDs
to m the action upon. It also takes a content type so the backend knows the content 
to execute the action upon. ⛑️
*******************************/

import { useState } from "react";
import { client } from "../apollo-client";
import { CHECK_AUTH } from "../graphql/users/users";
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

type TUseBulkAction = {
   action: string;
   content: contentType;
   IDs: string[];
};

export const useBulkAction = ({ action, content }: TUseBulkAction) => {
   const [data, setData] = useState<any>(null);
   const [status, setStatus] = useState<string>("idle");

   const goDo = async (IDs: TUseBulkAction["IDs"]) => {
      setStatus("loading");
      try {
         const { data } = await client.query({
            query: CHECK_AUTH,
            variables: { IDs, action }
         });

         if (data.bulk_action) {
            setData(data.bulk_action);
            setStatus("success");
         } else {
            setStatus("error");
         }
      } catch (error) {
         console.error(error);
         setStatus("error");
      }
   };

   return { goDo, status };
};
