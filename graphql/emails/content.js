import { gql } from "@apollo/client";

export const RECOMMNED_NEW_LIB_CONTENT = gql`
   mutation (
      $content_type: String
      $source_name: String
      $source_url: String
      $submitter_name: String
      $submitter_email: String
      $message: String
   ) {
      recomend_new_library_content(
         data: {
            content_type: $content_type
            source_name: $source_name
            source_url: $source_url
            submitter_name: $submitter_name
            submitter_email: $submitter_email
            message: $message
         }
      )
   }
`;

export const NEW_TRUSTED_USER_REQUEST = gql`
   mutation (
      $church: String
      $f_name: String
      $l_name: String
      $age: Boolean
      $ministry: String
      $timeInMinistry: Boolean
      $bibleEducation: Boolean
      $degree: String
   ) {
      trusted_user_application(
         data: {
            church: $church
            f_name: $f_name
            l_name: $l_name
            age: $age
            ministry: $ministry
            timeInMinistry: $timeInMinistry
            bibleEducation: $bibleEducation
            degree: $degree
         }
      )
   }
`;

export const BUG_REPORT = gql`
   mutation ($where: String, $when: String, $how: String, $who: String) {
      new_bug_report(data: { where: $where, when: $when, how: $how, who: $who })
   }
`;
