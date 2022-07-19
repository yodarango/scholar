**_ERRORS_**

# The ideal is to implement apollo error with Link and Http in the apollo-client.js, however, doing this breaks Auth, research why!

**BEFORE RELEASE**

-  Make sure that the count of characters for each input field mathc with the count length set in the DB

**COOL TO HAVES/ LATER RELEASES**

-  Find a better way to refetch queries after data updates

   -  options are:
      1. refetch data by calling DB again _(currently doing so)_
      2. Implement apollo [client.refetchQueries](https://www.apollographql.com/docs/react/data/refetching/)
      3. just add an extra query to the DB and send the data

-  Move Thought.tsx to its own component and not a carrousel mapping

-  Reading-collage-units.tsx and all places where an inital bible version is required

-  reload current chapter upon version change on fragments/squares/reading challenge.

-  add all the error and success messages displayed upon CTA's under one file
   for better maintanability and salability

-  change the wayt that stories are rendered. currently is kinda messy!

-  Have a way for users to search content by _TAG_, _USER_ID_, _VERSE_ and be able to render them in their own page for sharing purposes, rahter than just putting them in a bkg layer. I mean this is the heart of the app so....

-  have a way to share posts

-  set the /helpers/math/calcualterating... helper on the userBioWrapper

-  turn user profile avatar into its own component

-  comentary-content.tsx is using comments-of-thoughts.tsx when it should be using comments-of comments-content.tsx instead

-  get read of realoading the page upon data submission, there might be more places but the known as of now are:

   1. settings page: Upon settings update
   2. profile page: upon creating a new post

-  adda denomination sign maybe

-  work on the "select verse" model because if you click out of the <p></p> tag it will not color the text orange \*\*not sure about this, might be working, but still the props passed are through the function(e) rather than the data received from the API

-  add general notifiations banner for all users

-  get ready fo the resize query and improve the rendering of me page

-  instead of saving an array of categories to the db save an enum nuber from 1-10 and have cats in hteir own table with meaning

# REVAMP

### New created files

/fragmanets/chunks/icons.tsx
/fragmanets/chunks/user_avatar.tsx
/fragments/chuks/rating.tsx
/fragments/chuks/post_reactions.tsx
/fragments/chuks/stats_count.tsx
/fragments/Typography/\*
/fragments/chuks/svgs/\*
