import { client } from "../../../apollo-client";
import { GET_FOLDER_POST_COUNT } from "../../../graphql/posts/folders";

type TgetfoldersVariables = {
   ID?: string | number;
   USER_ID?: string;
   name: string;
   isSelf?: boolean;
};
export const getFolderPostCount = async (variables: TgetfoldersVariables) => {
   console.log(variables);
   try {
      const { data } = await client.query({
         query: GET_FOLDER_POST_COUNT,
         variables
      });

      if (data.get_commentary_folder) {
         return { data: data.get_commentary_folder, status: "done" };
      } else {
         return { data: null, status: "error" };
      }
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};
