import { gql } from "@apollo/client";

export const GET_TEACHERS = gql`
  query {
    teachers {
      id
      name
      subjects {
        id
        name
      }
    }
  }
`;

export const GET_PUPILS = gql`
  query {
    pupils {
      id
      name
      grade
    }
  }
`;

export const GET_SUBJECTS = gql`
  query {
    subjects {
      id
      name
      grade
      teacher {
        id
        name
      }
    }
  }
`;
