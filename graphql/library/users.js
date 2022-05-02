import { gql } from "@apollo/client";

export const GET_LIB_APPROVED_USERS = gql`
   query ($skip: String!) {
      AuthorizedContentProvider(skip: $skip, userType: AUTHOR) {
         id
         fullName
         avatar
         recommended
         organization
         userType
      }
   }
`;
