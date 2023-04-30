import { gql } from "@apollo/client";

export const BULK_ACTION = gql`
   mutation ($IDs: [ID], $action: String, $contentType: Int, $USER_ID: ID, $isSelf: Boolean) {
      bulk_actions(
         data: {
            IDs: $IDs
            action: $action
            contentType: $contentType
            USER_ID: $USER_ID
            isSelf: $isSelf
         }
      )
   }
`;
