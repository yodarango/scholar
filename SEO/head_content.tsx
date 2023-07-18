type THeadContent = {
   title?: string;
};
const HeadContent = ({ title = "Show Yourself Approved" }: THeadContent) => {
   return (
      <>
         <meta charSet='UTF-8' />
         <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
         <meta
            name='keywords'
            content='web app, Shrood, commentary, posts, social media, app, like, comment, quote, books, preaching, podcast, oneness, aljc, upci, wpf'
         />
         <meta
            name='description'
            content='Learning the word one verse at a time together. Share your notes, content and more. Interact with others, react to their posts, access hundreds of location info and content'
         />
         <meta name='robots' content='index,follow' />
         <meta name='url' content='https://be.shrood.app' />
         <meta name='identifier-URL' content='https://be.shrood.app' />

         <meta name='directory' content='submission' />
         <meta name='category' content='Web App' />
         <meta name='coverage' content='Worldwide' />
         <meta name='rating' content='General' />

         <meta name='og:title' content={`Shrood | ${title}`} />
         <meta property='og:url' content='https://be.shrood.app' />

         <meta property='og:image' content='https://be.shrood.app/images/sm_logo.png' />

         <meta property='og:type' content='web app' />
         <meta
            property='og:description'
            content='Learning the word one verse at a time together. Share your notes, content and more. Interact with others, react to their posts, access hundreds of location info and content'
         />
         <meta property='og:locale' content='en_GB' />
         <meta name='og:site_name' content='Shrood' />

         <meta name='og:region' content='TN' />

         <meta name='og:postal-code' content='37777' />

         <meta name='og:country-name' content='USA' />

         <meta name='blogcatalog' />

         <meta name='twitter:title' content={`Shrood | ${title}`} />
         <meta
            name='twitter:description'
            content='Learning the word one verse at a time together. Share your notes, content and more. Interact with others, react to their posts, access hundreds of location info and content'
         />
         <meta
            name='twitter:image'
            content='https://be.shrood.app/images/branding/logo_round_purple_500.png'
         />
         <meta name='twitter:site' content='https://be.shrood.app' />
         <meta name='twitter:creator' content='@Yodarango' />

         <meta name='viewport' content='width=device-width, initial-scale=1.0 maximum-scale=1' />

         <title>{`Shrood | ${title}`}</title>

         <link rel='icon' type='image/png' href='/images/branding/logo_fav_purple.webp' />
      </>
   );
};

export default HeadContent;
