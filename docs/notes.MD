## ERRORS

-  The ideal is to implement apollo error with Link and Http in the apollo-client.js, however, doing this breaks Auth, research why!

## BEFORE RELEASE

-  Make sure that the count of characters for each input field mathc with the count length set in the DB

## COOL TO HAVES/ LATER RELEASES

-  Find a better way to refetch queries after data updates

   -  options are:
      1. refetch data by calling DB again _(currently doing so)_
      2. Implement apollo [client.refetchQueries](https://www.apollographql.com/docs/react/data/refetching/)
      3. just add an extra query to the DB and send the data

-  add general notifiations banner for all users

-  instead of saving an array of categories to the db save an enum nuber from 1-10 and have cats in hteir own table with meaning

## FROM LAST CODING SESSION

-  working on integrating the _Post_ action of all post types into one function in helpers/functions/posts/post_content.ts.
-  currently quote and thoughts are working with it, but somethings are needed in thought:

   -  select category >
   -  select it again >
   -  You get the _informative only_ modal not the selection menu

-  Quote: Make sure this does not happen in **Quote**
-  Commentary: in **Thought** there was issues remapping the referenced_verses after post submission as it was converted to string. Make sure this does not happen in **Commentary**
