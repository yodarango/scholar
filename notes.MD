# ------------------------- DAIYLYS ------------------------

**02/17/22**

## TO DO's

-  catch errors on:
   \*\* post ratings
   \*\* sermon_notes post
   \*\* sermon_notescomment
   \*\* quotes stories (wigo) comment
   \*\* quotes stories (wigo) rate
   \*\* quotes profile rate
   \*\* quotes stories (wigo) comment

**_ERRORS_**

# The ideal is to implement apollo error with Link and Http in the apollo-client.js, however, doing this breaks Auth, research why!

# wigo - thursday is not working 😭

// ---------------------------- COMPLETED -------------------- //
The following things have been aware of and need to be improved:
✅ = done
❌ = not longer needed.changed my mind

///// 07/05/2021
✅ let off at comments-of-comments.tsx
❌ style the comments cards to be comments on a comment no the main commnet cards - No comments to comments allowed for now

////// 07/12/2021
✅ the timers that schedule the daily questions and the daily verse will have to be done from the back end
❌ start the timer in node and save it to the databse - Saving manually to the DB for now

//////// 08/04/21
✅ instead of having a totally new "create new post" page just render it as a popup fpr
all types of new posts.

//////// 08/04/21
✅ after finishing the Library page finsih up the home page

///////// 08/11/2021
✅ convert fetch requests to getStaticProps

//////// 12/19/2021
✅ Left off on implementing the QUOTE editor which is positin to the db but the tags and bkg are not working

////// 12/19/2021
✅ chagned the background property on the db so the quotes everytwehre need to be changed. the bkg went
from using colors to IDs

////// 12/19/2021
✅ Left off on posting thought content but it is returning NULL and not the values after being submitted
see why. Also commentaries and wuotes doing it

////// 12/24/2021
✅ Submitting the sermon notes is kinda mess but it is where i left off

///////// 12/31/21
✅ implement edit route for commentary post

///////// 01/03/22
✅ implementing quote editor

// ----------------------------- BEFORE RELEASE ---------------------- //

-  Make sure that the count of characters for each input field mathc with the count length set in the DB

-  Implement Lazy loading and create as many statics as possible

-  Add user authorization or CORS-ORIGIN limitations in all forms being submitted to avoid vendors

// ----------------------------- COOL TO HAVES/ LATER RELEASES ---------------------- //

-  Move Thought.tsx to its own component and not a carrousel mapping

-  Reading-collage-units.tsx and all places where an inital bible version is required

-  reload current chapter upon version change on fragments/squares/reading challenge.

-  add all the error and success messages displayed upon CTA's under one file
   for better maintanability and salability

-  change the wayt that stories are rendered. currently is kinda messy!
