import { Pagination } from "../fragments/buttons/pagination";
import { ContentGraphicsPost } from "../fragments/cards/content_graphics_post";
import { DailyVerseCard } from "../fragments/cards/daily_verse_card";
import { DailyVerseImage } from "../fragments/cards/daily_verse_image";
import { VideoThumbnailPrimary } from "../fragments/cards/video_thumbnail_primary";
import { CategoryTag } from "../fragments/chunks/category_tag";
import { SeePostInfo } from "../fragments/chunks/see_post_info";
import { TextEditorTopInfo } from "../fragments/text_editor_top_info";
import { TextEditorVerseSelection } from "../fragments/text_editor_verse_selection";
import { VerseRefTagWrapper } from "../fragments/verse_ref_tag_wrapper";
import { FastFacts } from "../layouts/wigo/fast_facts";
import { ThoughtsOneLineCarrousel } from "../layouts/scrollers/user_content/thoughts_one_line_carrousel";
import { NavigationMain } from "../layouts/navs/navigation_main";
import { UnsplasImgPicker } from "../layouts/scrollers/unsplash_img_picker";
import { PreviewThoughtCommentaryStack } from "../layouts/stacks/preview_thought_commentary_stack";
import { TextEditor } from "../layouts/text_editor";
import { TextEditorActions } from "../layouts/text_editor_actions";
import { CommentaryTextEditor } from "../templates/content/commentary_text_editor";
import { ThoughtTextEditor } from "../templates/content/thought_text_editor";
import { ThoughtsDisplay } from "../layouts/content/thoughts_display";
import { CommentaryOneLineCarrousel } from "../layouts/scrollers/user_content/commentaries_one_line_carrousel";
import { CommentariesDisplay } from "../layouts/content/commentary_display";
import { Quote } from "../fragments/cards/posts/quote";
import { QuoteOneLineCarrousel } from "../layouts/scrollers/user_content/quote_one_line_carrousel";
import { QuoteDisplay } from "../layouts/content/quotes_display";
import { SermonNoteOneLineCarrousel } from "../layouts/scrollers/user_content/sermon_note_one_line_carrousel";
import { SermonNoteDisplay } from "../layouts/content/sermon_note_display";
import { PostComment } from "../fragments/cards/posts/post_comment";
import { PostComment as PostComentIcon } from "../fragments/chunks/post_comment";
import { PostCommentsWrapper } from "../layouts/scrollers/user_content/post_comments_wrapper";
import { TextAreaPrimary } from "../fragments/inputs/text_area_primary";
import { PostComments } from "../layouts/stacks/post_coments";
import { GradientBackgroundOption } from "../fragments/buttons/menu_options/gradient_background_option";
import { SelectPostBackground } from "../layouts/menus/select_post_background";
import { BackgroundSelection } from "../fragments/chunks/background_selection";
import { CategorySelection } from "../fragments/chunks/category_selection";
import { QuoteEditorActions } from "../layouts/quote_editor_actions";
import { QuoteEditorTextEditor } from "../layouts/quote_editor";
import { QuoteEditor } from "../templates/content/quote_editor";
import { RadioPrimary } from "../fragments/inputs/radio_primary";
import { InputSecondary } from "../fragments/inputs/input_secondary";
import { SelectTrueColorPersonality } from "../fragments/inputs/select_true_color_personality";
import { SermonNoteEditorActions } from "../layouts/sermon_note_editor_actions";
import { UserNotifications } from "../fragments/cards/user_notification";
import { UserNotificationsWrapper } from "../layouts/scrollers/user_content/user_notifications_wrapper";
import { SecondaryStack } from "../layouts/stacks/templates/secondary_stack";
import { ToggleMenu } from "../fragments/chunks/toggle_menu";
import { TeritaryStack } from "../layouts/stacks/templates/teritary_stack";
import { SermonNoteEditor } from "../templates/content/sermon_note_editor";
import { AboutMe } from "../layouts/account/profile/about_me";
import { BibleChapter } from "../layouts/bible_chapter";
import { CommentariesGridByUser } from "../layouts/scrollers/user_content/commentaries_grid_by_user";
import { BibleVersionScripture } from "../fragments/buttons/bible_version_scripture";
import { BiblePreferences } from "../layouts/menus/Bible_preferences";
import { ReadBookmark } from "../fragments/chunks/read_bookmark";
import { ReadSettings } from "../fragments/chunks/read_settings";
import { ReadBibleHeader } from "../layouts/read_bible_header";
import { ReadBibleModal } from "../templates/read_bible_modal";
import commentaries_one_line_carrouselStories from "../layouts/scrollers/user_content/commentaries_one_line_carrousel.stories";
import { DailyVerseModal } from "../layouts/daily_verse_modal";
import { CommentaryFilter } from "../fragments/commentary_filter";
import { VerseByVerse } from "../templates/verse_by_verse";
import { WigoQuotes } from "../layouts/wigo/wigo_quotes";
import { WigoDailVerse } from "../layouts/wigo/wigo_daily_verse";
import { WigoCommentaries } from "../layouts/wigo/wigo_commentaries";
import { ThumbsUpDownPoll } from "../fragments/cards/thumbs_up_down_poll";
import { CastYourVote } from "../layouts/wigo/cast_your_vote";
import { WigoThoughts } from "../layouts/wigo/wigo_thoughts";
import { WigoSermons } from "../layouts/wigo/wigo_sermons";

const Test = () => {
   return (
      <div style={{ padding: "3rem" }}>
         <WigoSermons
            sermonNotes={[
               {
                  ID: "32",
                  content: "This is a title",
                  DROPBOX_ID:
                     "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  posted_on: "07/29/22 22:00",
                  date: "07/29/22 22:00",
                  title: "title",
                  file_url: "#",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  }
               },
               {
                  ID: "32",
                  content: "This is a title",
                  DROPBOX_ID:
                     "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  posted_on: "07/29/22 22:00",
                  date: "07/29/22 22:00",
                  title: "title",
                  file_url: "#",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  }
               },
               {
                  ID: "32",
                  content: "This is a title",
                  DROPBOX_ID:
                     "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  posted_on: "07/29/22 22:00",
                  date: "07/29/22 22:00",
                  title: "title",
                  file_url: "#",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  }
               },
               {
                  ID: "32",
                  content: "This is a title",
                  DROPBOX_ID:
                     "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  posted_on: "07/29/22 22:00",
                  date: "07/29/22 22:00",
                  title: "title",
                  file_url: "#",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  }
               },
               {
                  ID: "32",
                  content: "This is a title",
                  DROPBOX_ID:
                     "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  posted_on: "07/29/22 22:00",
                  date: "07/29/22 22:00",
                  title: "title",
                  file_url: "#",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  }
               }
            ]}
         />
         {/* <CastYourVote /> */}
         {/* <WigoThoughts
            thoughts={[
               {
                  title: "Title",
                  ID: "32",
                  body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  referenced_verses: "1CO.1.1 MATT.2.2",
                  posted_on: "11/29/22 22:00",
                  date: "11/29/22 22:00",
                  total_count: 10,
                  postImage: "/images/bible_books/1.png",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [
                     {
                        average_count: 3,
                        total_count: 34
                     }
                  ]
               },
               {
                  title: "Title",
                  ID: "32",
                  body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  referenced_verses: "1CO.1.1 MATT.2.2",
                  posted_on: "11/29/22 22:00",
                  date: "11/29/22 22:00",
                  total_count: 10,
                  postImage: "/images/bible_books/1.png",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [
                     {
                        average_count: 3,
                        total_count: 34
                     }
                  ]
               },
               {
                  title: "Title",
                  ID: "32",
                  body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  referenced_verses: "1CO.1.1 MATT.2.2",
                  posted_on: "11/29/22 22:00",
                  date: "11/29/22 22:00",
                  total_count: 10,
                  postImage: "/images/bible_books/1.png",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [
                     {
                        average_count: 3,
                        total_count: 34
                     }
                  ]
               },
               {
                  title: "Title",
                  ID: "32",
                  body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  referenced_verses: "1CO.1.1 MATT.2.2",
                  posted_on: "11/29/22 22:00",
                  date: "11/29/22 22:00",
                  total_count: 10,
                  postImage: "/images/bible_books/1.png",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [
                     {
                        average_count: 3,
                        total_count: 34
                     }
                  ]
               },
               {
                  title: "Title",
                  ID: "32",
                  body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  referenced_verses: "1CO.1.1 MATT.2.2",
                  posted_on: "11/29/22 22:00",
                  date: "11/29/22 22:00",
                  total_count: 10,
                  postImage: "/images/bible_books/1.png",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [
                     {
                        average_count: 3,
                        total_count: 34
                     }
                  ]
               }
            ]}
         /> */}
         {/*
         <ThumbsUpDownPoll
            content={{
               countdownLimit: "08/03/2022 21:00:00",
               id: "1",
               poll: "The earth is 6,000 years old",
               votes: { votesDown: 1, votesUp: 3 }
            }}
            cta={{
               handleVote(up: number, down: number, id: string, myvote: string) {
                  console.log(up, down, id, myvote);
               }
            }}
         /> */}
         {/* <WigoCommentaries
            commentaries={[
               {
                  ID: "32",
                  body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  referenced_verses: "1CO.1.1 MATT.2.2",
                  posted_on: "11/29/22 22:00",
                  date: "11/29/22 22:00",
                  VERSE_ID: "MAT.1.1",
                  verse_citation: "Matthew 12:1",
                  total_count: 10,
                  postImage: "/images/bible_books/1.png",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [
                     {
                        average_count: 3,
                        total_count: 34
                     }
                  ]
               },
               {
                  ID: "32",
                  body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  referenced_verses: "1CO.1.1 MATT.2.2",
                  posted_on: "11/29/22 22:00",
                  VERSE_ID: "MAT.1.1",
                  verse_citation: "Matthew 12:1",
                  date: "11/29/22 22:00",
                  total_count: 10,
                  postImage: "/images/bible_books/1.png",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [
                     {
                        average_count: 3,
                        total_count: 34
                     }
                  ]
               },
               {
                  ID: "32",
                  VERSE_ID: "MAT.1.1",
                  verse_citation: "Matthew 12:1",
                  body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  referenced_verses: "1CO.1.1 MATT.2.2",
                  posted_on: "11/29/22 22:00",
                  date: "11/29/22 22:00",
                  total_count: 10,
                  postImage: "/images/bible_books/1.png",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [
                     {
                        average_count: 3,
                        total_count: 34
                     }
                  ]
               },
               {
                  ID: "32",
                  VERSE_ID: "MAT.1.1",
                  verse_citation: "Matthew 12:1",
                  body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  referenced_verses: "1CO.1.1 MATT.2.2",
                  posted_on: "11/29/22 22:00",
                  date: "11/29/22 22:00",
                  total_count: 10,
                  postImage: "/images/bible_books/1.png",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [
                     {
                        average_count: 3,
                        total_count: 34
                     }
                  ]
               },
               {
                  ID: "32",
                  VERSE_ID: "MAT.1.1",
                  verse_citation: "Matthew 12:1",
                  body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  referenced_verses: "1CO.1.1 MATT.2.2",
                  posted_on: "11/29/22 22:00",
                  date: "11/29/22 22:00",
                  total_count: 10,
                  postImage: "/images/bible_books/1.png",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [
                     {
                        average_count: 3,
                        total_count: 34
                     }
                  ]
               }
            ]}
         /> */}
         {/* <WigoDailVerse /> */}
         {/* <DailyVerseImage /> */}
         {/* <VerseByVerse
            commentaries={[
               {
                  ID: "32",
                  body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  referenced_verses: "1CO.1.1 MATT.2.2",
                  posted_on: "11/29/22 22:00",
                  date: "11/29/22 22:00",
                  VERSE_ID: "MAT.1.1",
                  verse_citation: "Matthew 12:1",
                  total_count: 10,
                  postImage: "/images/bible_books/1.png",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [
                     {
                        average_count: 3,
                        total_count: 34
                     }
                  ]
               },
               {
                  ID: "32",
                  body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  referenced_verses: "1CO.1.1 MATT.2.2",
                  posted_on: "11/29/22 22:00",
                  VERSE_ID: "MAT.1.1",
                  verse_citation: "Matthew 12:1",
                  date: "11/29/22 22:00",
                  total_count: 10,
                  postImage: "/images/bible_books/1.png",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [
                     {
                        average_count: 3,
                        total_count: 34
                     }
                  ]
               },
               {
                  ID: "32",
                  VERSE_ID: "MAT.1.1",
                  verse_citation: "Matthew 12:1",
                  body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  referenced_verses: "1CO.1.1 MATT.2.2",
                  posted_on: "11/29/22 22:00",
                  date: "11/29/22 22:00",
                  total_count: 10,
                  postImage: "/images/bible_books/1.png",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [
                     {
                        average_count: 3,
                        total_count: 34
                     }
                  ]
               },
               {
                  ID: "32",
                  VERSE_ID: "MAT.1.1",
                  verse_citation: "Matthew 12:1",
                  body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  referenced_verses: "1CO.1.1 MATT.2.2",
                  posted_on: "11/29/22 22:00",
                  date: "11/29/22 22:00",
                  total_count: 10,
                  postImage: "/images/bible_books/1.png",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [
                     {
                        average_count: 3,
                        total_count: 34
                     }
                  ]
               },
               {
                  ID: "32",
                  VERSE_ID: "MAT.1.1",
                  verse_citation: "Matthew 12:1",
                  body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  referenced_verses: "1CO.1.1 MATT.2.2",
                  posted_on: "11/29/22 22:00",
                  date: "11/29/22 22:00",
                  total_count: 10,
                  postImage: "/images/bible_books/1.png",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [
                     {
                        average_count: 3,
                        total_count: 34
                     }
                  ]
               }
            ]}
         /> */}
         {/* <CommentaryOneLineCarrousel
            commentaries={[
               {
                  ID: "32",
                  body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  referenced_verses: "1CO.1.1 MATT.2.2",
                  posted_on: "11/29/22 22:00",
                  date: "11/29/22 22:00",
                  VERSE_ID: "MAT.1.1",
                  verse_citation: "Matthew 12:1",
                  total_count: 10,
                  postImage: "/images/bible_books/1.png",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [
                     {
                        average_count: 3,
                        total_count: 34
                     }
                  ]
               },
               {
                  ID: "32",
                  body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  referenced_verses: "1CO.1.1 MATT.2.2",
                  posted_on: "11/29/22 22:00",
                  VERSE_ID: "MAT.1.1",
                  verse_citation: "Matthew 12:1",
                  date: "11/29/22 22:00",
                  total_count: 10,
                  postImage: "/images/bible_books/1.png",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [
                     {
                        average_count: 3,
                        total_count: 34
                     }
                  ]
               },
               {
                  ID: "32",
                  VERSE_ID: "MAT.1.1",
                  verse_citation: "Matthew 12:1",
                  body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  referenced_verses: "1CO.1.1 MATT.2.2",
                  posted_on: "11/29/22 22:00",
                  date: "11/29/22 22:00",
                  total_count: 10,
                  postImage: "/images/bible_books/1.png",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [
                     {
                        average_count: 3,
                        total_count: 34
                     }
                  ]
               },
               {
                  ID: "32",
                  VERSE_ID: "MAT.1.1",
                  verse_citation: "Matthew 12:1",
                  body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  referenced_verses: "1CO.1.1 MATT.2.2",
                  posted_on: "11/29/22 22:00",
                  date: "11/29/22 22:00",
                  total_count: 10,
                  postImage: "/images/bible_books/1.png",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [
                     {
                        average_count: 3,
                        total_count: 34
                     }
                  ]
               },
               {
                  ID: "32",
                  VERSE_ID: "MAT.1.1",
                  verse_citation: "Matthew 12:1",
                  body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  referenced_verses: "1CO.1.1 MATT.2.2",
                  posted_on: "11/29/22 22:00",
                  date: "11/29/22 22:00",
                  total_count: 10,
                  postImage: "/images/bible_books/1.png",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [
                     {
                        average_count: 3,
                        total_count: 34
                     }
                  ]
               }
            ]}
         /> */}
         {/* <CommentaryFilter /> */}
         {/* <DailyVerseModal /> */}
         {/* <DailyVerseCard /> */}
         {/* <ReadBibleTemplate
            cta={{
               handleTheme: (theme: string) => console.log(theme)
            }}
         /> */}
         {/* <ReadBibleHeader isChapeterBookmarked={false} /> */}
         {/* <ReadBookmark
            chapterId='GEN.1'
            bookMarks={["1CO.2", "JHN.3", "MAT.1"]}
            isBookMarked={true}
         /> */}
         {/* <ReadSettings
            cta={{
               handleFontSelection: (value: string) => console.log(value),
               handleThemeSelection: (value: string) => console.log(value)
            }}
         /> */}
         {/* <ReadBookmark isBookMarked={true} /> */}
         {/* <Pagination goBack='/' goForth='/' type='2' forContent='read' /> */}
         {/* <DailyVerseCard versionId='' /> */}
         {/* <NavigationMain /> */}
         {/* <BibleVersionScripture
            cta={{ handleSelection: (content) => console.log(content) }}
            BiblePreferences={{
               versionName: "ESV",
               versionId: "de4e12af7f28f599-02",
               scriptureRef: "1 Thessalonians 5:15",
               bibleLanguage: "english"
            }}
         /> */}
         {/* <BiblePreferences /> */}
         {/* <DailyVerseImage versionId='de4e12af7f28f599-02' /> */}
         {/* <CategoryTag id='CYN' /> */}
         {/* <TextEditorActions
            postReferences={[
               "JHN.1.1",
               "ROM.3.4",
               "EST.3.3",
               "JHN.1.1",
               "ROM.3.4",
               "EST.3.3",
               "JHN.1.1",
               "ROM.3.4",
               "EST.3.3"
            ]}
            content={
               <div>
                  Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in
                  a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                  Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
                  looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum
                  passage, and going through the cites of the word in classical literature,
                  discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
                  1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
                  Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very
                  popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor
                  sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem
                  Ipsum used since the 1500s is reproduced below for those interested. Sections
                  1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
                  reproduced in their exact original form, accompanied by English versions from the
                  1914 translation by H. Rackham. Contrary to popular belief, Lorem Ipsum is not
                  simply random text. It has roots in a piece of classical Latin literature from 45
                  BC, making it over 2000 years old. Richard McClintock, a Latin professor at
                  Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words,
                  consectetur, from a Lorem Ipsum passage, and going through the cites of the word
                  in classical literature, discovered the undoubtable source. Lorem Ipsum comes from
                  sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of
                  Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory
                  of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,
                  "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard
                  chunk of Lorem Ipsum used since the 1500s is reproduced below for those
                  interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by
                  Cicero are also reproduced in their exact original form, accompanied by English
                  versions from the 1914 translation by H. Rackham.
               </div>
            }
            cta={{
               handleRefVerseSelection: (id) => console.log("close modal", id),
               handleCategorySelection(id) {
                  console.log(id);
               },
               handlePrivacySelection(privacy) {
                  console.log(privacy);
               }
            }}
            postImage='/images/bible_books/1.png'
            userAuthority={1}
            userId='1'
            username='username'
            avatar='/images/user_avatars/default.png'
            postPostedOnDate='07/08/2022 11:00'
            postCreatedDate='07/08/2022 11:00'
            postCategory='PNK'
         /> */}
         {/* <SeePostInfo
            userAuthority={1}
            userId='1'
            username='username'
            avatar='/images/user_avatars/default.png'
            postPostedOnDate='07/08/2022 11:00'
            postCreatedDate='07/08/2022 11:00'
            postCategory='PNK'
         /> */}
         {/* <PreviewThoughtCommentaryStack
            postReferences={[
               "JHN.1.1",
               "ROM.3.4",
               "EST.3.3",
               "JHN.1.1",
               "ROM.3.4",
               "EST.3.3",
               "JHN.1.1",
               "ROM.3.4",
               "EST.3.3"
            ]}
            body={`
                  Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in
                  a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                  Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
                  looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum
                  passage, and going through the cites of the word in classical literature,
                  discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
                  1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
                  Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very
                  popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor
                  sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem
                  Ipsum used since the 1500s is reproduced below for those interested. Sections
                  1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
                  reproduced in their exact original form, accompanied by English versions from the
                  1914 translation by H. Rackham. Contrary to popular belief, Lorem Ipsum is not
                  simply random text. It has roots in a piece of classical Latin literature from 45
                  BC, making it over 2000 years old. Richard McClintock, a Latin professor at
                  Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words,
                  consectetur, from a Lorem Ipsum passage, and going through the cites of the word
                  in classical literature, discovered the undoubtable source. Lorem Ipsum comes from
                  sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of
                  Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory
                  of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,
                  "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard
                  chunk of Lorem Ipsum used since the 1500s is reproduced below for those
                  interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by
                  Cicero are also reproduced in their exact original form, accompanied by English
                  versions from the 1914 translation by H. Rackham.`}
            cta={{ handleCloseModal: () => console.log("close modal") }}
            postImage='/images/bible_books/1.png'
            userAuthority={1}
            userId='1'
            username='username'
            avatar='/images/user_avatars/default.png'
            postPostedOnDate='07/08/2022 11:00'
            postCreatedDate='07/08/2022 11:00'
            postCategory='PNK'
         /> */}
         {/* <VerseRefTagWrapper refs={["dsfds", "dfasd", "ssads"]} /> */}
         {/* <TextEditorVerseSelection /> */}
         {/* <TextEditor
            body={`# Title (link)[www.example.com]`}
            postImage='/images/bible_books/1.png'
            userAuthority={1}
            userId='123'
            username='Username'
            avatar='/images/user_avatar'
            postPostedOnDate='08/11/22 09:00'
            postCreatedDate='08/11/22 09:00'
            postCategory='YLW'
            postReferences={["1CO.1.1", "MAT.3.2"]}
            postPrivacy={false}
            cta={{
               handleBody() {},
               handleCategorySelection() {},
               handlePrivacySelection() {},
               handlePost() {},
               handleReferencedVerses() {},
               handleRefVerseSelection() {}
            }}
         /> */}
         {/* <CommentaryTextEditor
            body={`# Title &nbsp; (link)[www.example.com]`}
            postImage='/images/bible_books/1.png'
            userAuthority={1}
            userId='123'
            username='Username'
            avatar='/images/user_avatar'
            postPostedOnDate='08/11/22 09:00'
            postCreatedDate='08/11/22 09:00'
            postCategory='YLW'
            postReferences={["1CO.1.1", "MAT.3.2"]}
            postPrivacy={true}
         /> */}
         {/* <ThoughtTextEditor
            body={`# Title &nbsp; (link)[www.example.com]`}
            postImage='/images/bible_books/1.png'
            userAuthority={1}
            userId='123'
            username='Username'
            avatar='/images/user_avatar'
            postPostedOnDate='08/11/22 09:00'
            postCreatedDate='08/11/22 09:00'
            postCategory='YLW'
            postReferences={["1CO.1.1", "MAT.3.2"]}
            postPrivacy={true}
         /> */}
         {/* <TextEditorTopInfo
            userAuthority={1}
            userId='1'
            username='username'
            bkgImg='/images/bible_books/1.png'
            avatar='/images/user_avatars/default.png'
            postPostedOnDate='07/08/2022 11:00'
            postCreatedDate='07/08/2022 11:00'
            postCategory='PNK'
            cta={{ handleCloseModal: () => console.log("hey") }}
         /> */}
         {/* <UnsplasImgPicker
            images={[
               { link: "", author: "", src: "", alt: "" },
               { link: "", author: "", src: "", alt: "" },
               { link: "", author: "", src: "", alt: "" },
               { link: "", author: "", src: "", alt: "" },
               { link: "", author: "", src: "", alt: "" }
            ]}
            cta={{
               handleImgSelection: (url) => console.log(url),
               closeModal: () => console.log("close")
            }}
         /> */}
         {/* {
            <TextEditorTopInfo
               userAuthority={1}
               userId='123'
               username='username'
               avatar='img/avatars/default.png'
               postPostedOnDate='12/12/12 12:00'
               postCreatedDate='12/12/12 12:00'
               postCategory='PPL'
               cta={{
                  handleCloseModal: () => {},
                  handleImageBkgSelection: (url: string) => {}
               }}
            />
         } */}
         {/* <VideoThumbnailPrimary
            content={{
               url: "https://www.youtube.com/watch?v=tnVK_LJvHXs",
               title: "MY Awesome Video",
               description: "This is a small description"
            }}
         /> */}
         {/* <ContentGraphicsPost
            images={[
               "/images/bible_books/1.png",
               "/images/bible_books/2.png",
               "/images/bible_books/3.png",
               "/images/bible_books/4.png",
               "/images/bible_books/5.png"
            ]}
         /> */}
         {/* <FastFacts
            images={[
               "/images/bible_books/1.png",
               "/images/bible_books/2.png",
               "/images/bible_books/3.png",
               "/images/bible_books/4.png",
               "/images/bible_books/5.png"
            ]}
         /> */}
         {
            // <ThoughtsOneLineCarrousel
            //    thoughts={[
            //       {
            //          ID: "32",
            //          title: "This is a title",
            //          body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
            //          category_tags: "#YLW",
            //          referenced_verses: "1CO.1.1 MATT.2.2",
            //          posted_on: "07/29/22 22:00",
            //          date: "07/29/22 22:00",
            //          total_count: 10,
            //          postImage: "/images/bible_books/1.png",
            //          creator: {
            //             ID: "1",
            //             signature: "Username",
            //             authority_level: 1,
            //             approval_rating: 90,
            //             avatar: "/imges/user_avatars/default.png",
            //             first_name: "John",
            //             last_name: "Doe",
            //             my_church: "The Chruch of my Lord Jesus Christ"
            //          },
            //          comments: [
            //             {
            //                total_count: 34
            //             }
            //          ],
            //          approvals: [
            //             {
            //                average_count: 3,
            //                total_count: 34
            //             }
            //          ]
            //       },
            //       {
            //          ID: "32",
            //          title: "This is a title",
            //          body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
            //          category_tags: "#YLW",
            //          referenced_verses: "1CO.1.1 MATT.2.2",
            //          posted_on: "07/29/22 22:00",
            //          date: "07/29/22 22:00",
            //          total_count: 10,
            //          postImage: "/images/bible_books/1.png",
            //          creator: {
            //             ID: "1",
            //             signature: "Username",
            //             authority_level: 1,
            //             approval_rating: 90,
            //             avatar: "/imges/user_avatars/default.png",
            //             first_name: "John",
            //             last_name: "Doe",
            //             my_church: "The Chruch of my Lord Jesus Christ"
            //          },
            //          comments: [
            //             {
            //                total_count: 34
            //             }
            //          ],
            //          approvals: [
            //             {
            //                average_count: 3,
            //                total_count: 34
            //             }
            //          ]
            //       },
            //       {
            //          ID: "32",
            //          title: "This is a title",
            //          body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
            //          category_tags: "#YLW",
            //          referenced_verses: "1CO.1.1 MATT.2.2",
            //          posted_on: "07/29/22 22:00",
            //          date: "07/29/22 22:00",
            //          total_count: 10,
            //          postImage: "/images/bible_books/1.png",
            //          creator: {
            //             ID: "1",
            //             signature: "Username",
            //             authority_level: 1,
            //             approval_rating: 90,
            //             avatar: "/imges/user_avatars/default.png",
            //             first_name: "John",
            //             last_name: "Doe",
            //             my_church: "The Chruch of my Lord Jesus Christ"
            //          },
            //          comments: [
            //             {
            //                total_count: 34
            //             }
            //          ],
            //          approvals: [
            //             {
            //                average_count: 3,
            //                total_count: 34
            //             }
            //          ]
            //       },
            //       {
            //          ID: "32",
            //          title: "This is a title",
            //          body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
            //          category_tags: "#YLW",
            //          referenced_verses: "1CO.1.1 MATT.2.2",
            //          posted_on: "07/29/22 22:00",
            //          date: "07/29/22 22:00",
            //          total_count: 10,
            //          postImage: "/images/bible_books/1.png",
            //          creator: {
            //             ID: "1",
            //             signature: "Username",
            //             authority_level: 1,
            //             approval_rating: 90,
            //             avatar: "/imges/user_avatars/default.png",
            //             first_name: "John",
            //             last_name: "Doe",
            //             my_church: "The Chruch of my Lord Jesus Christ"
            //          },
            //          comments: [
            //             {
            //                total_count: 34
            //             }
            //          ],
            //          approvals: [
            //             {
            //                average_count: 3,
            //                total_count: 34
            //             }
            //          ]
            //       },
            //       {
            //          ID: "32",
            //          title: "This is a title",
            //          body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
            //          category_tags: "#YLW",
            //          referenced_verses: "1CO.1.1 MATT.2.2",
            //          posted_on: "07/29/22 22:00",
            //          date: "07/29/22 22:00",
            //          total_count: 10,
            //          postImage: "/images/bible_books/1.png",
            //          creator: {
            //             ID: "1",
            //             signature: "Username",
            //             authority_level: 1,
            //             approval_rating: 90,
            //             avatar: "/imges/user_avatars/default.png",
            //             first_name: "John",
            //             last_name: "Doe",
            //             my_church: "The Chruch of my Lord Jesus Christ"
            //          },
            //          comments: [
            //             {
            //                total_count: 34
            //             }
            //          ],
            //          approvals: [
            //             {
            //                average_count: 3,
            //                total_count: 34
            //             }
            //          ]
            //       }
            //    ]}
            // />
         }
         {/* <ThoughtsDisplay
            thoughts={[
               {
                  ID: "342",
                  title: "This is a title",
                  body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  referenced_verses: "1CO.1.1 MATT.2.2",
                  posted_on: "07/29/22 22:00",
                  date: "07/29/22 22:00",
                  total_count: 10,
                  postImage: "/images/bible_books/1.png",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [
                     {
                        average_count: 3,
                        total_count: 34
                     }
                  ]
               },
               {
                  ID: "3",
                  title: "This is a title",
                  body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  referenced_verses: "1CO.1.1 MATT.2.2",
                  posted_on: "07/29/22 22:00",
                  date: "07/29/22 22:00",
                  total_count: 10,
                  postImage: "/images/bible_books/1.png",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [
                     {
                        average_count: 3,
                        total_count: 34
                     }
                  ]
               },
               {
                  ID: "112",
                  title: "This is a title",
                  body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  referenced_verses: "1CO.1.1 MATT.2.2",
                  posted_on: "07/29/22 22:00",
                  date: "07/29/22 22:00",
                  total_count: 10,
                  postImage: "/images/bible_books/1.png",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [
                     {
                        average_count: 3,
                        total_count: 34
                     }
                  ]
               },
               {
                  ID: "1",
                  title: "This is a title",
                  body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  referenced_verses: "1CO.1.1 MATT.2.2",
                  posted_on: "07/29/22 22:00",
                  date: "07/29/22 22:00",
                  total_count: 10,
                  postImage: "/images/bible_books/1.png",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [
                     {
                        average_count: 3,
                        total_count: 34
                     }
                  ]
               },
               {
                  ID: "5",
                  title: "This is a title",
                  body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  referenced_verses: "1CO.1.1 MATT.2.2",
                  posted_on: "07/29/22 22:00",
                  date: "07/29/22 22:00",
                  total_count: 10,
                  postImage: "/images/bible_books/1.png",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [
                     {
                        average_count: 3,
                        total_count: 34
                     }
                  ]
               }
            ]}
         />
         <CommentariesDisplay
            commentaries={[
               {
                  ID: "88",
                  body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#GRN",
                  referenced_verses: "1CO.1.1 MATT.2.2",
                  posted_on: "11/29/22 22:00",
                  date: "11/29/22 22:00",
                  VERSE_ID: "MAT.1.1",
                  verse_citation: "Matthew 12:1",
                  total_count: 10,
                  postImage: "/images/bible_books/1.png",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [
                     {
                        average_count: 3,
                        total_count: 34
                     }
                  ]
               },
               {
                  ID: "5",
                  body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  referenced_verses: "1CO.1.1 MATT.2.2",
                  posted_on: "11/29/22 22:00",
                  VERSE_ID: "MAT.1.1",
                  verse_citation: "Matthew 12:1",
                  date: "11/29/22 22:00",
                  total_count: 10,
                  postImage: "/images/bible_books/1.png",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [
                     {
                        average_count: 3,
                        total_count: 34
                     }
                  ]
               },
               {
                  ID: "2",
                  VERSE_ID: "MAT.1.1",
                  verse_citation: "Matthew 12:1",
                  body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#RD",
                  referenced_verses: "1CO.1.1 MATT.2.2",
                  posted_on: "11/29/22 22:00",
                  date: "11/29/22 22:00",
                  total_count: 10,
                  postImage: "/images/bible_books/1.png",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [
                     {
                        average_count: 3,
                        total_count: 34
                     }
                  ]
               },
               {
                  ID: "312",
                  VERSE_ID: "MAT.1.1",
                  verse_citation: "Matthew 12:1",
                  body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#BL",
                  referenced_verses: "1CO.1.1 MATT.2.2",
                  posted_on: "11/29/22 22:00",
                  date: "11/29/22 22:00",
                  total_count: 10,
                  postImage: "/images/bible_books/1.png",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [
                     {
                        average_count: 3,
                        total_count: 34
                     }
                  ]
               },
               {
                  ID: "332",
                  VERSE_ID: "MAT.1.1",
                  verse_citation: "Matthew 12:1",
                  body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#PPL",
                  referenced_verses: "1CO.1.1 MATT.2.2",
                  posted_on: "11/29/22 22:00",
                  date: "11/29/22 22:00",
                  total_count: 10,
                  postImage: "/images/bible_books/1.png",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [
                     {
                        average_count: 3,
                        total_count: 34
                     }
                  ]
               }
            ]}
         /> */}
         {/* <Quote
            cta={{ handleDelete: (id) => console.log(id) }}
            quote={{
               ID: "23",
               body: "This is  a body",
               category_tags: "#BR",
               author: "Matt",
               background: "quote-bkg--14",
               posted_on: "07/05/22 21:00",
               date: "07/05/22 21:00",
               total_count: 23,
               creator: {
                  ID: "23",
                  signature: "Username",
                  authority_level: 1,
                  approval_rating: 87,
                  avatar: ""
               },
               comments: [
                  {
                     total_count: 34
                  }
               ],
               approvals: [{ average_count: 23, total_count: 23 }]
            }}
         />*/}
         {/* <QuoteOneLineCarrousel
            quotes={[
               {
                  ID: "0",
                  body: "This is  a body",
                  category_tags: "#BR",
                  author: "Matt",
                  background: "quote-bkg--14",
                  posted_on: "07/05/22 21:00",
                  date: "07/05/22 21:00",
                  total_count: 23,
                  creator: {
                     ID: "23",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 87,
                     avatar: ""
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [{ average_count: 23, total_count: 23 }]
               },
               {
                  ID: "11",
                  body: "This is  a body",
                  category_tags: "#BR",
                  author: "Matt",
                  background: "quote-bkg--14",
                  posted_on: "07/05/22 21:00",
                  date: "07/05/22 21:00",
                  total_count: 23,
                  creator: {
                     ID: "23",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 87,
                     avatar: ""
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [{ average_count: 23, total_count: 23 }]
               },
               {
                  ID: "76",
                  body: "This is  a body",
                  category_tags: "#BR",
                  author: "Matt",
                  background: "quote-bkg--14",
                  posted_on: "07/05/22 21:00",
                  date: "07/05/22 21:00",
                  total_count: 23,
                  creator: {
                     ID: "23",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 87,
                     avatar: ""
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [{ average_count: 23, total_count: 23 }]
               },
               {
                  ID: "2",
                  body: "This is  a body",
                  category_tags: "#BR",
                  author: "Matt",
                  background: "quote-bkg--14",
                  posted_on: "07/05/22 21:00",
                  date: "07/05/22 21:00",
                  total_count: 23,
                  creator: {
                     ID: "23",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 87,
                     avatar: ""
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [{ average_count: 23, total_count: 23 }]
               },
               {
                  ID: "233",
                  body: "This is  a body",
                  category_tags: "#BR",
                  author: "Matt",
                  background: "quote-bkg--14",
                  posted_on: "07/05/22 21:00",
                  date: "07/05/22 21:00",
                  total_count: 23,
                  creator: {
                     ID: "23",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 87,
                     avatar: ""
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [{ average_count: 23, total_count: 23 }]
               }
            ]}
         /> */}
         {/* <WigoQuotes
            quotes={[
               {
                  ID: "0",
                  body: "This is  a body",
                  category_tags: "#BR",
                  author: "Matt",
                  background: "quote-bkg--14",
                  posted_on: "07/05/22 21:00",
                  date: "07/05/22 21:00",
                  total_count: 23,
                  creator: {
                     ID: "23",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 87,
                     avatar: ""
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [{ average_count: 23, total_count: 23 }]
               },
               {
                  ID: "11",
                  body: "This is  a body",
                  category_tags: "#BR",
                  author: "Matt",
                  background: "quote-bkg--14",
                  posted_on: "07/05/22 21:00",
                  date: "07/05/22 21:00",
                  total_count: 23,
                  creator: {
                     ID: "23",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 87,
                     avatar: ""
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [{ average_count: 23, total_count: 23 }]
               },
               {
                  ID: "76",
                  body: "This is  a body",
                  category_tags: "#BR",
                  author: "Matt",
                  background: "quote-bkg--14",
                  posted_on: "07/05/22 21:00",
                  date: "07/05/22 21:00",
                  total_count: 23,
                  creator: {
                     ID: "23",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 87,
                     avatar: ""
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [{ average_count: 23, total_count: 23 }]
               },
               {
                  ID: "2",
                  body: "This is  a body",
                  category_tags: "#BR",
                  author: "Matt",
                  background: "quote-bkg--14",
                  posted_on: "07/05/22 21:00",
                  date: "07/05/22 21:00",
                  total_count: 23,
                  creator: {
                     ID: "23",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 87,
                     avatar: ""
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [{ average_count: 23, total_count: 23 }]
               },
               {
                  ID: "233",
                  body: "This is  a body",
                  category_tags: "#BR",
                  author: "Matt",
                  background: "quote-bkg--14",
                  posted_on: "07/05/22 21:00",
                  date: "07/05/22 21:00",
                  total_count: 23,
                  creator: {
                     ID: "23",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 87,
                     avatar: ""
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [{ average_count: 23, total_count: 23 }]
               }
            ]}
         /> */}
         {/* <QuoteDisplay
            quotes={[
               {
                  ID: "0",
                  body: "This is  a body",
                  category_tags: "#BR",
                  author: "Matt",
                  background: "quote-bkg--14",
                  posted_on: "07/05/22 21:00",
                  date: "07/05/22 21:00",
                  total_count: 23,
                  creator: {
                     ID: "23",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 87,
                     avatar: ""
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [{ average_count: 23, total_count: 23 }]
               },
               {
                  ID: "11",
                  body: "This is  a body",
                  category_tags: "#BR",
                  author: "Matt",
                  background: "quote-bkg--14",
                  posted_on: "07/05/22 21:00",
                  date: "07/05/22 21:00",
                  total_count: 23,
                  creator: {
                     ID: "23",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 87,
                     avatar: ""
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [{ average_count: 23, total_count: 23 }]
               },
               {
                  ID: "76",
                  body: "This is  a body",
                  category_tags: "#BR",
                  author: "Matt",
                  background: "quote-bkg--14",
                  posted_on: "07/05/22 21:00",
                  date: "07/05/22 21:00",
                  total_count: 23,
                  creator: {
                     ID: "23",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 87,
                     avatar: ""
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [{ average_count: 23, total_count: 23 }]
               },
               {
                  ID: "2",
                  body: "This is  a body",
                  category_tags: "#BR",
                  author: "Matt",
                  background: "quote-bkg--14",
                  posted_on: "07/05/22 21:00",
                  date: "07/05/22 21:00",
                  total_count: 23,
                  creator: {
                     ID: "23",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 87,
                     avatar: ""
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [{ average_count: 23, total_count: 23 }]
               },
               {
                  ID: "233",
                  body: "This is  a body",
                  category_tags: "#BR",
                  author: "Matt",
                  background: "quote-bkg--14",
                  posted_on: "07/05/22 21:00",
                  date: "07/05/22 21:00",
                  total_count: 23,
                  creator: {
                     ID: "23",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 87,
                     avatar: ""
                  },
                  comments: [
                     {
                        total_count: 34
                     }
                  ],
                  approvals: [{ average_count: 23, total_count: 23 }]
               }
            ]}
         /> */}

         {/* <SermonNoteOneLineCarrousel
            sermonNotes={[
               {
                  ID: "2",
                  content: "This is a title",
                  DROPBOX_ID:
                     "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  posted_on: "07/29/22 22:00",
                  date: "07/29/22 22:00",
                  title: "title",
                  file_url: "#",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  }
               },
               {
                  ID: "112",
                  content: "This is a title",
                  DROPBOX_ID:
                     "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  posted_on: "07/29/22 22:00",
                  date: "07/29/22 22:00",
                  title: "title",
                  file_url: "#",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  }
               },
               {
                  ID: "34",
                  content: "This is a title",
                  DROPBOX_ID:
                     "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  posted_on: "07/29/22 22:00",
                  date: "07/29/22 22:00",
                  title: "title",
                  file_url: "#",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  }
               },
               {
                  ID: "5",
                  content: "This is a title",
                  DROPBOX_ID:
                     "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  posted_on: "07/29/22 22:00",
                  date: "07/29/22 22:00",
                  title: "title",
                  file_url: "#",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  }
               },
               {
                  ID: "55",
                  content: "This is a title",
                  DROPBOX_ID:
                     "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  posted_on: "07/29/22 22:00",
                  date: "07/29/22 22:00",
                  title: "title",
                  file_url: "#",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  }
               }
            ]}
         /> */}

         {/* <SermonNoteDisplay
            sermonNotes={[
               {
                  ID: "2",
                  content: "This is a title",
                  DROPBOX_ID:
                     "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  posted_on: "07/29/22 22:00",
                  date: "07/29/22 22:00",
                  title: "title",
                  file_url: "#",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  }
               },
               {
                  ID: "112",
                  content: "This is a title",
                  DROPBOX_ID:
                     "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  posted_on: "07/29/22 22:00",
                  date: "07/29/22 22:00",
                  title: "title",
                  file_url: "#",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  }
               },
               {
                  ID: "34",
                  content: "This is a title",
                  DROPBOX_ID:
                     "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  posted_on: "07/29/22 22:00",
                  date: "07/29/22 22:00",
                  title: "title",
                  file_url: "#",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  }
               },
               {
                  ID: "5",
                  content: "This is a title",
                  DROPBOX_ID:
                     "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  posted_on: "07/29/22 22:00",
                  date: "07/29/22 22:00",
                  title: "title",
                  file_url: "#",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  }
               },
               {
                  ID: "55",
                  content: "This is a title",
                  DROPBOX_ID:
                     "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                  category_tags: "#YLW",
                  posted_on: "07/29/22 22:00",
                  date: "07/29/22 22:00",
                  title: "title",
                  file_url: "#",
                  creator: {
                     ID: "1",
                     signature: "Username",
                     authority_level: 1,
                     approval_rating: 90,
                     avatar: "/imges/user_avatars/default.png",
                     first_name: "John",
                     last_name: "Doe",
                     my_church: "The Chruch of my Lord Jesus Christ"
                  }
               }
            ]} 
         /> */}
         {/* <PostComment
            postHeader={{
               username: "Username",
               avatar: "Username",
               userId: "1",
               postId: "2",
               userAuthority: 1,
               postType: "",
               widthTimeStamp: {
                  time: "08/29/22 19:00",
                  niceTime: "08/29/22 19:00",
                  quiet: true
               }
            }}
            postSettingsOptions={{
               showShareopton: false,
               showEditOption: false,
               showDeleteOption: true,
               showReportOption: false
            }}
            comment='Add the variable font stylesheet request to your head tag and the current variable axes configuration to icons using CSS.'
            cta={{ handleDelete: () => console.log("log") }}
         /> */}
         {/* <PostCommentsWrapper
            postComments={[
               {
                  ID: "1",
                  body: "Add the variable font stylesheet request to your head tag and the current variable axes configuration to icons using CSS.",
                  creator_avatar: "",
                  creator_signature: "username",
                  creator_approval_rate: "80",
                  creator_authority_level: 1,
                  creator_id: "1",
                  posted_on: "08/10/22 09:00",
                  date: "08/10/22 09:00"
               },
               {
                  ID: "10",
                  body: "Add the variable font stylesheet request to your head tag and the current variable axes configuration to icons using CSS.",
                  creator_avatar: "",
                  creator_signature: "username",
                  creator_approval_rate: "80",
                  creator_authority_level: 1,
                  creator_id: "1",
                  posted_on: "08/10/22 09:00",
                  date: "08/10/22 09:00"
               },
               {
                  ID: "11",
                  body: "Add the variable font stylesheet request to your head tag and the current variable axes configuration to icons using CSS.",
                  creator_avatar: "",
                  creator_signature: "username",
                  creator_approval_rate: "80",
                  creator_authority_level: 1,
                  creator_id: "1",
                  posted_on: "08/10/22 09:00",
                  date: "08/10/22 09:00"
               },
               {
                  ID: "13",
                  body: "Add the variable font stylesheet request to your head tag and the current variable axes configuration to icons using CSS.",
                  creator_avatar: "",
                  creator_signature: "username",
                  creator_approval_rate: "80",
                  creator_authority_level: 1,
                  creator_id: "1",
                  posted_on: "08/10/22 09:00",
                  date: "08/10/22 09:00"
               },
               {
                  ID: "14",
                  body: "Add the variable font stylesheet request to your head tag and the current variable axes configuration to icons using CSS.",
                  creator_avatar: "",
                  creator_signature: "username",
                  creator_approval_rate: "80",
                  creator_authority_level: 1,
                  creator_id: "1",
                  posted_on: "08/10/22 09:00",
                  date: "08/10/22 09:00"
               }
            ]}
         /> */}
         {/* <TextAreaPrimary
            defaultValue=''
            placeHolder=''
            maxLength={50}
            cta={{ handleCurrentValue() {} }}
         /> */}
         {/* <PostComments
            postComments={[
               {
                  ID: "1",
                  body: "Add the variable font stylesheet request to your head tag and the current variable axes configuration to icons using CSS.",
                  creator_avatar: "",
                  creator_signature: "username",
                  creator_approval_rate: "80",
                  creator_authority_level: 1,
                  creator_id: "1",
                  posted_on: "08/10/22 09:00",
                  date: "08/10/22 09:00"
               },
               {
                  ID: "10",
                  body: "Add the variable font stylesheet request to your head tag and the current variable axes configuration to icons using CSS.",
                  creator_avatar: "",
                  creator_signature: "username",
                  creator_approval_rate: "80",
                  creator_authority_level: 1,
                  creator_id: "1",
                  posted_on: "08/10/22 09:00",
                  date: "08/10/22 09:00"
               },
               {
                  ID: "11",
                  body: "Add the variable font stylesheet request to your head tag and the current variable axes configuration to icons using CSS.",
                  creator_avatar: "",
                  creator_signature: "username",
                  creator_approval_rate: "80",
                  creator_authority_level: 1,
                  creator_id: "1",
                  posted_on: "08/10/22 09:00",
                  date: "08/10/22 09:00"
               },
               {
                  ID: "13",
                  body: "Add the variable font stylesheet request to your head tag and the current variable axes configuration to icons using CSS.",
                  creator_avatar: "",
                  creator_signature: "username",
                  creator_approval_rate: "80",
                  creator_authority_level: 1,
                  creator_id: "1",
                  posted_on: "08/10/22 09:00",
                  date: "08/10/22 09:00"
               },
               {
                  ID: "14",
                  body: "Add the variable font stylesheet request to your head tag and the current variable axes configuration to icons using CSS.",
                  creator_avatar: "",
                  creator_signature: "username",
                  creator_approval_rate: "80",
                  creator_authority_level: 1,
                  creator_id: "1",
                  posted_on: "08/10/22 09:00",
                  date: "08/10/22 09:00"
               }
            ]}
            cta={{
               handleClose() {},
               handleValue(value: string) {
                  console.log(value);
               }
            }}
         /> */}
         {/* <PostComentIcon contentType={1} postId='123' comments={23} iconColor='#F1EAFF' />
         <GradientBackgroundOption
            text='Option one'
            background='quote-bkg--2'
            cta={{ handleClick: (value) => console.log(value) }}
         />
         <SelectPostBackground
            cta={{
               handleCloseModal() {},
               handleValue(value) {
                  console.log(value);
               }
            }}
         /> */}
         {/* <BackgroundSelection
            background='quote-bkg--6'
            cta={{
               handleSelection(value) {
                  console.log(value);
               }
            }}
         />
         <CategorySelection
            categoryId='YLW'
            cta={{
               handleSelection(value) {
                  console.log(value);
               }
            }}
         />
         <QuoteEditorActions
            categoryId='GRN'
            background='quote-bkg--17'
            cta={{ handleCategory() {}, handleBkg() {}, handlePost() {} }}
         />
         <div style={{ width: "100vw", height: "100vh" }}>
            <QuoteEditor quote='My wonderful quote' author='I am the author' />
         </div> */}
         {/* <QuoteEditor /> */}
         {/* <RadioPrimary
            displayV={false}
            icon={{ primary: "male", secondary: "female" }}
            text={{ primary: "male", secondary: "female" }}
            cta={{
               handleOptionSelection(selection: number) {
                  console.log(selection);
               }
            }}
         /> */}
         {/* {
            <InputSecondary
               label='My church'
               cta={{
                  handleValue(value: string) {
                     console.log(value);
                  }
               }}
            />
         } */}
         {/* <SelectTrueColorPersonality
            currColor={2}
            label='My color personality'
            cta={{
               handleSelection(color: string) {
                  console.log(color);
               }
            }}
         /> */}
         {/* <SermonNoteEditorActions
            sermonTitle='My title'
            categoryId='GRN'
            cta={{
               handleCategory(cat) {
                  console.log(cat);
               },
               handleTitle(tit) {
                  console.log(tit);
               },
               handleUploadedFile(file) {
                  console.log(file);
               }
            }}
         /> */}

         {/* <UserNotifications ID="124" postId='123' postType={0} body='This with notification' /> */}
         {/* <UserNotificationsWrapper /> */}
         {/* <SecondaryStack
            menuType={1}
            title='Primary background'
            content={<>Hello</>}
            cta={{ handleClose: () => console.log("modal close") }}
         /> */}
         {/* <ToggleMenu /> */}
         {/*          
            <TeritaryStack title='dsdsf' hasNotifications={true}>
               <div></div>
            </TeritaryStack> */}
         {/* <SermonNoteEditor renderClose={true} /> */}
         {/* <AboutMe
            userId='432'
            myChurch='My good Lord knows'
            ministry='worthless slave'
            favBibleVerse='1 Peter 1:8'
            fullTimeJob='Software Engneer'
            colorPersonality='green'
            favColor='Gray'
         /> */}

         {/* <BibleChapter chapterId='GEN.1' versionId='de4e12af7f28f599-02' /> */}
         {/* <ComentariesGrid /> */}
      </div>
   );
};
export default Test;
