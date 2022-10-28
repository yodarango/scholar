import { client } from "../../../apollo-client";
import { HANDLE_VOTE } from "../../../graphql/wigo/friday";

export const handleVote = async (votes: number[], contentId: string, position: string) => {
   try {
      const { data } = await client.mutate({
         mutation: HANDLE_VOTE,
         variables: {
            votes,
            contentId
         }
      });

      if (data.fridayVotes) {
         const now = Date.now() + 86400000;
         const cookieExpiration = new Date(now);

         document.cookie = `multChoice=${position}; expires=${cookieExpiration}; path=/wigo;`;

         return data.fridayVotes;
      } else {
         return "Something went wrong!";
      }
   } catch (error) {
      console.log(error);
      return "Error";
   }
};
