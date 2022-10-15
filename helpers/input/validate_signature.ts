// checks for a valid user input

const format = /^\w+$/;
export const checkForValidSignature = (input: string) => {
   const currInput = input;
   if (!format.test(currInput)) {
      return false;
   } else {
      return true;
   }
};
