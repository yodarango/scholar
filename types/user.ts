export type TAllPosts = {
   commentaries_approval_total_count: number;
   article_approval_total_count: number;
   quote_approval_total_count: number;
};

export type TUser = {
   my_true_color_personality_test?: string;
   has_new_notifications?: boolean;
   all_posts_profile?: TAllPosts;
   my_favorite_color?: string;
   my_favorite_verse?: string;
   date_registered?: string;
   authority_level?: number;
   approval_rating?: number;
   total_ratings?: number;
   all_posts?: TAllPosts;
   total_posts?: number;
   is_patron?: boolean;
   MONGO_DB_ID?: string;
   my_ministry?: string;
   birth_date?: string;
   first_name?: string;
   my_church?: string;
   last_name?: string;
   signature?: string;
   my_story?: string;
   avatar?: string;
   my_job?: string;
   gender?: number;
   email?: string;
   ID?: string;
};

export type TpostSummary = {
   commentary_count: number;
   article_count: number;
   sermon_count: number;
   quote_count: number;
};
