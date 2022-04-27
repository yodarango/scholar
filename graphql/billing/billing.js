import { gql } from "@apollo/client";

export const GET_ORDER_SUCCESS_DATA = gql`
   query ($session_id: String) {
      order_success(session_id: $session_id) {
         ... on Successful_Order {
            name
            email
            token
         }

         ... on Failed_Order {
            message
         }
      }
   }
`;

export const CREATE_CHECKOUT_SESSION = gql`
   mutation ($price_id: String) {
      create_checkout_session(price_id: $price_id)
   }
`;

export const GET_USER_PORTAL_SESSION = gql`
   query {
      customer_portal {
         ... on User_Portal_Session {
            id
            object
            configuration
            customer
            return_url
            url
         }

         ... on Failed_Order {
            message
         }
      }
   }
`;
