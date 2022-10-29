import { client } from "../../../apollo-client";
import { GET_POLL_MULTIPLE_OPTIONS } from "../../../graphql/interactive/poll_multiple_options";
// import { HANDLE_VOTE } from "../../../graphql/wigo/friday";

// export const handleVote = async (votes: number[], contentId: string, position: string) => {
//    try {
//       const { data } = await client.mutate({
//          mutation: HANDLE_VOTE,
//          variables: {
//             votes,
//             contentId
//          }
//       });

//       if (data.fridayVotes) {
//          const now = Date.now() + 86400000;
//          const cookieExpiration = new Date(now);

//          document.cookie = `multChoice=${position}; expires=${cookieExpiration}; path=/wigo;`;

//          return data.fridayVotes;
//       } else {
//          return "Something went wrong!";
//       }
//    } catch (error) {
//       console.log(error);
//       return "Error";
//    }
// };

export const getMultipleOptionsPollIn24 = async () => {
   try {
      const { data } = await client.query({
         query: GET_POLL_MULTIPLE_OPTIONS,
         variables: {}
      });

      if (!data.poll_multiple_choice_in_24) {
         return { data: null, status: "error" };
      }

      return { data, status: "done" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};
