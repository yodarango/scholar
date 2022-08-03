import client from "../../../apollo-client";
import { HANDLE_VOTE } from "../../../graphql/wigo/thursday";

export const handleThumbsUpDownVote = async (
   votesUp: number,
   votesDown: number,
   contentId: string,
   myVote: string
) => {
   try {
      const { data } = await client.mutate({
         mutation: HANDLE_VOTE,
         variables: {
            votesUp: votesUp,
            votesDown: votesDown,
            contentId: contentId
         }
      });

      const now = Date.now() + 86400000;
      const cookieExpiration = new Date(now);

      if (data.thursdayVotes) {
         //set cookie
         document.cookie = `votedThursday=${myVote}; expires=${cookieExpiration};
               path: /wigo;`;
         return data.thursdayVotes;
      }
      return "Something went wrong!";
   } catch (error) {
      console.log(error);
      return "Error";
   }
};
