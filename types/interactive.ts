export enum EPolllType {
   THUMBS_UP = 1,
   MULTIPLE_OPTIONS = 2
}

export type TThumbsUpDownPoll = {
   ID: string;
   type: number;
   dilemma: string;
   countdown: string;
   votes: {
      votesUp: number;
      votesDown: number;
   };
};

export type TMultipleChicePoll = {
   ID: string;
   type: number;
   dilemma: string;
   options: string[];
   votes: number[];
   countdown: string;
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
