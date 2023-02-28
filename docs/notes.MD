## ERRORS

-  The ideal is to implement apollo error with Link and Http in the apollo-client.js, however, doing this breaks Auth, research why!

## BEFORE RELEASE

-  Make sure that the count of characters for each input field match with the count length set in the DB

## COOL TO HAVES/ LATER RELEASES

-  Find a better way to refetch queries after data updates

   -  options are:
      1. refetch data by calling DB again _(currently doing so)_
      2. Implement apollo [client.refetchQueries](https://www.apollographql.com/docs/react/data/refetching/)
      3. just add an extra query to the DB and send the data

-  add general notifications banner for all users

-  instead of saving an array of categories to the db save an enum number from 1-10 and have cats in their own table with meaning

## FROM LAST CODING SESSION

-  add different types of highlights in read and map them to types in sql (eg: gradient, color, image, etc)
-  add commentary annotations after the verse commented: (emojis, icons, etc)
