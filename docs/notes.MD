-  update all refs to /uses/folders/ to /users/<id>/folders

Also might want to restructure the routes. Maybe remove /users and do /@me instead. Example /@me/folders, /@me/settings, /@me/about etc

I have fixed the middleware and I have set it up for all routes that need it.
👉 I am currently creating unions for each query so that all routes that need authentication display the modal.
👉 left off in the poll votes. those are set up! move to others
