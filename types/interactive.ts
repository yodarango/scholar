export type TThumbsUpDownPoll = {
   ID: string;
   type: number;
   dilemma: string;
   countdown: string;
   votes: TThumbsUpDownPollVote;
};

export type TThumbsUpDownPollVote = {
   ID: string;
   POLL_ID: string;
   votesUp: number;
   votesDown: number;
};

export type TMultipleChicePoll = {
   ID: string;
   type: number;
   dilemma: string;
   options: string[];
   countdown: string;
   votes: TMultipleChicePollVote;
};

export type TMultipleChicePollVote = {
   ID: string;
   POLL_ID: string;
   vote: number[];
};

export type TVideoThumbnail = {
   url: string;
   title: string;
   description: string;
};

export type TFastFacts = {
   ID: string;
   type: string;
   images: string;
   created_date?: string;
   posted_on?: string;
};
