import { client } from "../../../apollo-client";
import { GET_POLL_MULTIPLE_OPTIONS } from "../../../graphql/interactive/poll_multiple_options";

export const getMultipleOptionsPollIn24 = async () => {
   try {
      const {
         data,
         data: { poll_multiple_choice_in_24 }
      } = await client.query({
         query: GET_POLL_MULTIPLE_OPTIONS,
         variables: {}
      });

      const { options, votes } = poll_multiple_choice_in_24;

      let totalOptions = [];

      if (poll_multiple_choice_in_24) {
         // parse the the date as the options and votes come in a string form
         if (options && typeof options === "string") {
            totalOptions = options.split(":");
            poll_multiple_choice_in_24.options = totalOptions;
         }

         // parse the votes
         if (votes) {
            if (votes.vote && typeof votes.vote === "string") {
               // split each vote separately
               const splitVotes = votes.vote.split(":");
               // parse it to an integer

               let vote = splitVotes.map((vote: string) => parseInt(vote));
               poll_multiple_choice_in_24.votes = {
                  ...poll_multiple_choice_in_24.votes,
                  vote
               };
            }
         } else {
            poll_multiple_choice_in_24.votes = {
               ID: null,
               vote: [...Array(totalOptions.length)].map((o, i) => 0)
            };
         }

         return { data, status: "done" };
      }

      return { data: null, status: "error" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};
