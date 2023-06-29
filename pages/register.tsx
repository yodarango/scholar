import RegisterTemplate from "../components/templates/users/register";
import { UseIsNotAuth } from "../hooks/use_check_auth";

export default function Register() {
   return (
      <UseIsNotAuth redirect='/users/@me'>
         <RegisterTemplate />
      </UseIsNotAuth>
   );
}
