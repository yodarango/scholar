export type TAllPosts = {
   thought_approval_total_count: number;
   quote_approval_total_count: number;
   commentaries_approval_total_count: number;
   //    commentaries: Tcommentary[];
   //    thoughts: Tthought[];
   //    quotes: TsingleStory[];
   //    sermon_notes: TsermonPost[];
};

export type TUser = {
   ID: string;
   MONGO_DB_ID: string;
   signature: string;
   first_name: string;
   last_name: string;
   birth_date: string;
   gender: number;
   email: string;
   date_registered: string;
   authority_level: number;
   approval_rating: number;
   avatar: string;
   is_patron?: boolean;
   my_church: string;
   my_favorite_color: string;
   my_job: string;
   my_true_color_personality_test: string;
   my_story: string;
   my_ministry: string;
   my_favorite_verse: string;
   total_posts: number;
   total_ratings: number;
   all_posts?: TAllPosts;
   all_posts_profile?: TAllPosts;
};

export type TuserSummary = {
   ID: string;
   signature: string;
   avatar: string;
   authority_level: number;
   approval_rating: number;
   total_posts: number;
   total_ratings: number;
   has_new_notifications: boolean;
};

export type TpostSummary = {
   commentary_count: number;
   quote_count: number;
   thought_count: number;
   sermon_count: number;
};
