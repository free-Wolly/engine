import { gql } from 'apollo-server-express';

export default gql`
  union UserObjectResponse = User | Client | Employee

  enum AuthType {
    user
    client
    employee
  }

  enum WollyErrorCodes {
    USER_NOT_FOUND
    INVALID_TOKEN
  }

  type SignInCrmResponse {
    user: User
    token: String
  }

  type ClientSingInResponse {
    user: Client!
    token: String!
  }

  type ClientUpdateMyProfileResponse {
    user: Client!
    token: String
  }

  type ResponseMessageWithToken {
    token: String
    message: String
  }

  type ClientSignupResponse {
    user: Client!
    token: String!
  }

  extend type Query {
    me(authType: AuthType): User
  }
  extend type Mutation {
    signin(data: SignInInput!, language: Language!): ClientSingInResponse
    signinCrm(data: SignInInput!, language: Language!): SignInCrmResponse
    signout: SuccessMessage
    clientSignUp(data: ClientSignupInput!, language: Language!): ClientSignupResponse!
    resetPassword(data: PasswordResetInput, language: Language!): UserObjectResponse
    changeMyPassword(data: ChangeMyPasswordInput): SuccessMessage
    updateMyMobile(data: UpdateMyMobileInput!): SuccessMessage
    updateMyProfile(data: UpdateProfileInput!): ClientUpdateMyProfileResponse!
    sendVerificationCode(data: SendVerificationCodeInput, language: Language!): ResponseMessage
    resendVerificationCode(data: ResendVerificationCodeInput!, language: Language!): ResponseMessage
    verifyCode(data: VerifyCodeInput!, language: Language!): ResponseMessage
  }

  input SignInInput {
    email: String
    mobile: String
    password: String!
    authType: AuthType!
    pushToken: String
  }

  input ChangeMyPasswordInput {
    currentPassword: String!
    newPassword: String!
    authType: AuthType!
  }

  input UpdateMyMobileInput {
    mobile: String!
    verificationCode: String!
    authType: AuthType!
  }

  input UpdateProfileInput {
    firstName: String
    lastName: String
    password: String
    email: String
    mobile: String
    language: Language
    photo: String
    verificationCode: String
    smsEnabled: Boolean
    notificationsEnabled: Boolean
  }

  input LanguageInput {
    code: String!
  }

  input PasswordResetInput {
    mobile: String!
    email: String
    password: String!
    authType: AuthType!
    verificationCode: String!
  }

  input ClientSignupInput {
    androidSignature: String
    firstName: String
    lastName: String
    password: String
    email: String
    mobile: String!
    language: Language!
  }

  input SendVerificationCodeInput {
    androidSignature: String
    mobile: String!
  }

  input ResendVerificationCodeInput {
    androidSignature: String
    mobile: String!
  }

  input VerifyCodeInput {
    code: String!
    mobile: String!
  }
`;
