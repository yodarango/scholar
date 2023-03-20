export const useLogout = () => {
   localStorage.removeItem("auth");
   location.href = "/login";
};
