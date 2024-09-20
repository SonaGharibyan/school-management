import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation signup($email: String!, $password: String!, $role: String!) {
    signup(email: $email, password: $password, role: $role)
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const ADD_TEACHER = gql`
  mutation addTeacher($data: TeacherUpdateInput!) {
    addTeacher(data: $data) {
      id
      name
      subjects {
        id
        name
      }
    }
  }
`;

export const DELETE_TEACHER = gql`
  mutation deleteTeacher($id: ID!) {
    deleteTeacher(id: $id) {
      id
    }
  }
`;

export const UPDATE_TEACHER = gql`
  mutation UpdateTeacher($id: ID!, $data: TeacherUpdateInput!) {
    updateTeacher(id: $id, data: $data) {
      id
      name
      subjects {
        id
        name
      }
    }
  }
`;

export const ADD_PUPIL = gql`
  mutation AddPupil($data: PupilCreateInput!) {
    createPupil(data: $data) {
      id
      name
      grade
      subjects {
        id
        name
      }
    }
  }
`;

export const UPDATE_PUPIL = gql`
  mutation UpdatePupil($id: ID!, $data: PupilUpdateInput!) {
    updatePupil(id: $id, data: $data) {
      id
      name
      grade
      subjects {
        id
        name
      }
    }
  }
`;

export const DELETE_PUPIL = gql`
  mutation DeletePupil($id: ID!) {
    deletePupil(id: $id) {
      id
      name
    }
  }
`;

export const ADD_SUBJECT = gql`
  mutation AddSubject($data: SubjectCreateInput!) {
    createSubject(data: $data) {
      id
      name
      teacher {
        id
        name
      }
    }
  }
`;

export const UPDATE_SUBJECT = gql`
  mutation UpdateSubject($id: ID!, $data: SubjectUpdateInput!) {
    updateSubject(id: $id, data: $data) {
      id
      name
      teacher {
        id
        name
      }
    }
  }
`;

export const DELETE_SUBJECT = gql`
  mutation DeleteSubject($id: ID!) {
    deleteSubject(id: $id) {
      id
      name
    }
  }
`;
