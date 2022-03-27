# ------------------------- DAIYLYS ------------------------

**Left Off**

-  set the /helpers/math/calcualterating... helper on th euserBioWrapper
-  Find a way to pass users info the the "Quick info Access" component

## TO DO's

-  Oh man this sounds craxy but seeems like auth is almost ready. Please test and double check possible failing scenarios

-  set a way for users to request a "trusted level"

-  add a distinguisher in the avatar for certified users

-  adda denomination sign maybe

-  turn user profile avatar into its own comp (maybe)

-  set geder on Sign up route and set a default avatar image

-  add a welcome banner the first time user logs in

-  add try catch everywehre needed

-  Make sure there is conditional Rendering EVERYWHERE Like Post Contnet Pupup, which trhows error if anything is null!

-  work on the "select verse" model because if you click out of the <p></p> tag it will not color the text orange

-  make the category tag indicator small circles rather than whole lines across the content: looks ugly

-  change the colors of categories fore more pastelish colors

**_ERRORS_**

# The ideal is to implement apollo error with Link and Http in the apollo-client.js, however, doing this breaks Auth, research why!

**BEFORE RELEASE**

-  Make sure that the count of characters for each input field mathc with the count length set in the DB

-  Implement Lazy loading and create as many statics as possible

-  Add user authorization or CORS-ORIGIN limitations in all forms being submitted to avoid vendors

-  the rate content dropdown has the option to cancel all the way to the bottom, notvre itto the top or implement a X to close because right now it looks like youre stuck without option to close it

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
