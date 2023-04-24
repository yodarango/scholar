export const BULK_ACTION = gql`
   query ($IDs: [ID], $action: String, $contentType: Int, $USER_ID: ID, $isSelf: Boolean) {
      quote_approvals(
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
