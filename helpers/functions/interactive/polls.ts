import { client } from "../../../apollo-client";
import { GET_ALL_POLLS } from "../../../graphql/interactive/polls";

export const getAllPolls = async () => {
   try {
      const {
         data,
         data: { all_polls }
      } = await client.query({
         query: GET_ALL_POLLS,
         variables: {}
      });

      console.log(data);

      if (all_polls) {
         all_polls.map((poll: any, index: number) => {
            // parse thumbs up polls
            if (poll.type === 1) {
               let votes: any = { votesUp: null, votesDown: null };

               // parse votes as they come in string
               if (poll.votes) {
                  if (poll.votes.vote) {
                     const votesArray = poll.votes.vote.split(" ");
                     votes.votesUp = votesArray[0];
                     votes.votesDown = votesArray[1];

                     poll.votes = {
                        ...poll.votes,
                        votesUp: parseInt(votes.votesUp),
                        votesDown: parseInt(votes.votesDown)
                     };
                  } else {
                     poll.votes = {
                        ID: null,
                        type: null,
                        POLL_ID: null,
                        votesUp: 0,
                        votesDown: 0
                     };
                  }
               } else {
                  poll.votes = {
                     ID: null,
                     type: null,
                     POLL_ID: null,
                     votesUp: 0,
                     votesDown: 0
                  };
               }
            }
            if (poll.type === 2) {
               // parse the the date as the options and votes come in a string form
               if (poll.options && typeof poll.options === "string") {
                  let options = poll.options.split(" ");
                  poll.options = options;
               }

               // parse the votes
               if (poll.votes) {
                  if (poll.votes.vote && typeof poll.votes.vote === "string") {
                     // split each vote separately
                     const splitVotes = poll.votes.vote.split(" ");
                     // parse it to an integer

                     let vote = splitVotes.map((vote: string) => parseInt(vote));
                     poll.votes = {
                        ...poll.votes,
                        vote
                     };
                  }
               }
            }
         });

         return { data, status: "done" };
      }

      return { data: null, status: "error" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};
