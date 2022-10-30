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
      const {
         data,
         data: { poll_multiple_choice_in_24 }
      } = await client.query({
         query: GET_POLL_MULTIPLE_OPTIONS,
         variables: {}
      });

      if (poll_multiple_choice_in_24) {
         // parse the the date as the options and votes come in a string form
         if (
            poll_multiple_choice_in_24.options &&
            typeof poll_multiple_choice_in_24.options === "string"
         ) {
            let options = poll_multiple_choice_in_24.options.split(" ");
            poll_multiple_choice_in_24.options = options;
         }

         // parse the votes
         if (poll_multiple_choice_in_24.votes) {
            if (
               poll_multiple_choice_in_24.votes.vote &&
               typeof poll_multiple_choice_in_24.votes.vote === "string"
            ) {
               // split each vote separately
               const splitVotes = poll_multiple_choice_in_24.votes.vote.split(" ");
               // parse it to an integer

               let vote = splitVotes.map((vote: string) => parseInt(vote));
               poll_multiple_choice_in_24.votes = {
                  ...poll_multiple_choice_in_24.votes,
                  vote
               };
            }
         }

         return { data, status: "done" };
      }

      return { data: null, status: "error" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};
