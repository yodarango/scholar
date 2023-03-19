export const useUserAuth = (token: string) => {
   // switching to local storage because apple has a bug that expires cookies at session time
   // document.cookie = `authorization=${data.authenticate_user.token}; expires=${expTime}; domain=${window.location.hostname}; path=/`;

   const tokenExpiration = 86_400_000 * 93; // roughly three months
   const today = Date.now();
   const expTime = today + tokenExpiration;
   const jwtAuth = {
      auth: token,
      expiresIn: expTime
   };
   localStorage.setItem("auth", JSON.stringify(jwtAuth));
   location.href = "/users/@me";
};
