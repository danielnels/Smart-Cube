import gql from "graphql-tag";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        isVerified
      }
    }
  }
`;

export const ADD_EMAIL_VERIFICATION_TOKEN = gql`
  mutation AddEmailVerificationTokenMutation(
    $userId: String!
    $username: String!
    $email: String!
  ) {
    addEmailVerificationToken(
      userId: $userId
      username: $username
      email: $email
    ) {
      user {
        username
        email
        isVerified
      }
      token
      expireAt
    }
  }
`;

export const VERIFY_EMAIL = gql`
  mutation VerifyEmailMutation($email: String!, $token: String!) {
    verifyEmail(email: $email, token: $token) {
      user {
        _id
        username
        email
        isVerified
      }
    }
  }
`;

export const USER_LOGIN = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        isVerified
      }
    }
  }
`;

export const USER_FORGOT_PASSWORD = gql`
  mutation ForgotPasswordMutation($email: String!) {
    forgotPassword(email: $email) {
      _id
    }
  }
`;
export const USER_UPDATE_PASSWORD = gql`
  mutation UpdatePasswordMutation(
    $email: String!
    $oldPassword: String!
    $newPassword: String!
  ) {
    updatePassword(
      email: $email
      oldPassword: $oldPassword
      newPassword: $newPassword
    ) {
      _id
    }
  }
`;
