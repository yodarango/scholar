export const useLogout = (redirect?: string) => {
   localStorage.removeItem("auth");
   location.href = redirect || "/login";
};
