last files touches were the profile_posts.tsx, commentaries_with_filter.tsx and commentaries_by_folder.tsx

I am getting an error that ` Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.`

Might be being caused by the hook. look into it!

Also might want to restructure the routes. Maybe remove /users and do /@me instead. Example /@me/folders, /@me/settings, /@me/about etc
