import { gql } from "@apollo/client";

export const GET_LIB_APPROVED_USERS = gql`
   query ($skip: String!, $userType: LibraryUserTypes) {
      AuthorizedContentProvider(skip: $skip, userType: $userType) {
         id
         fullName
         avatar
         recommended
         organization
         userType
      }
   }
`;
