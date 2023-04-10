last files touched were folder_editor.tsx, use_save_folder.ts, user_get_folder.ts, /folders/new/[id].tsx and /folders/edit/index.tsx .
attempting to setup new folder and edit folder components. Edit folder seems to be working, but the "change folder color" button is not working. The bkg color is not taking the color from . See why.

after fixing edit make sure creating a new one works and then folders will be set. Also add a "is_private" prop.

Also might want to restructure the routes. Maybe remove /users and do /@me instead. Example /@me/folders, /@me/settings, /@me/about etc
