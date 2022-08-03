export type TThumbsUpDownPoll = {
   id: string;
   poll: string;
   countdownLimit: string;
   votes: {
      votesUp: number;
      votesDown: number;
   };
};

export type TMultipleChicePoll = {
   id: string;
   question: string;
   options: string[];
   votes: {
      votes: number[];
   };
};
