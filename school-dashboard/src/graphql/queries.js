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

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const ADD_TEACHER = gql`
  mutation addTeacher($name: String!) {
    addTeacher(name: $name) {
      id
      name
    }
  }
`;

export const ADD_PUPIL = gql`
  mutation addPupil($name: String!, $grade: Int!) {
    addPupil(name: $name, grade: $grade) {
      id
      name
      grade
    }
  }
`;

export const ADD_SUBJECT = gql`
  mutation addSubject($name: String!, $teacherId: Int) {
    addSubject(name: $name, teacherId: $teacherId) {
      id
      name
    }
  }
`;

export const ASSIGN_SUBJECT_TO_PUPIL = gql`
  mutation assignSubjectToPupil($pupilId: Int!, $subjectId: Int!) {
    assignSubjectToPupil(pupilId: $pupilId, subjectId: $subjectId) {
      id
      name
      subjects {
        id
        name
      }
    }
  }
`;
