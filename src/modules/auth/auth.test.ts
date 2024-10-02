import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import typeDefs from '../../schemas';
import resolvers from '../../resolvers';
import db from '../../services/db';
import formatMessage from '../../localization/intl';
import { formatError } from '../../utils';
import { randomNumber } from '../user/user.test';
import { UserRole } from '../user/types';

describe('AUTH RESOLVERS', () => {
  const guestServer = new ApolloServer({
    typeDefs,
    resolvers,
    formatError,
    context: async () => {
      const users = await db.user.findMany({ where: { role: UserRole.ADMIN } });
      const user = users[0];

      return { req: { userId: user.id, me: { language: 'KA', role: user.role } }, db };
    },
  });
  // @ts-ignore
  const { mutate } = createTestClient(guestServer);
  // @ts-ignore
  let verificationCode;
  const mobile = randomNumber;

  it('Client Sign UP', async () => {
    const CLIENT_SIGN_UP = gql`
      mutation ClientSignUp(
        $firstName: String
        $lastName: String
        $email: String
        $password: String
        $mobile: String!
        $language: Language!
      ) {
        clientSignUp(
          data: {
            firstName: $firstName
            lastName: $lastName
            email: $email
            password: $password
            mobile: $mobile
            language: $language
          }
        ) {
          id
          mobile
        }
      }
    `;

    const { data, errors } = await mutate({
      mutation: CLIENT_SIGN_UP,
      variables: {
        language: 'KA',
        mobile,
      },
    });

    errors?.[0] && console.error(errors[0].message);

    expect(data?.clientSignUp.mobile).toEqual(mobile);

    const user = await db.client.findUnique({
      where: { mobile },
    });
    // @ts-ignore
    verificationCode = user.verificationCode;
    // @ts-ignore
    userId = user.id;
  });

  it('Verify Code', async () => {
    const VERIFY_CODE = gql`
      mutation VerifyCode($code: String!, $lang: Language!, $mobile: String) {
        verifyCode(data: { code: $code, mobile: $mobile }, lang: $lang) {
          message
        }
      }
    `;

    const { data, errors } = await mutate({
      mutation: VERIFY_CODE,
      variables: {
        // @ts-ignore
        code: verificationCode,
        mobile,
        lang: 'KA',
      },
    });

    errors?.[0] && console.error(errors[0].message);

    expect(data?.verifyCode.message).toEqual(formatMessage('KA', 'auth.mobileVerifiedSuccessfully'));
  });
  guestServer.stop();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError,
    context: async () => {
      const client = await db.client.findUnique({ where: { mobile } });
      // @ts-ignore
      const userId = client.id;

      return { req: { userId, me: { language: 'KA' } }, db, res: {} };
    },
  });
  // @ts-ignore
  const { query: newQuery, mutate: newMutation } = createTestClient(server);

  it('Finish Client Sign UP', async () => {
    const UPDATE_USER = gql`
      mutation UpdateUser(
        $firstName: String
        $password: String
        $lastName: String
        $email: String
        $mobile: String
        $language: Language
        $photo: String
        $smsEnabled: Boolean
        $notificationsEnabled: Boolean
        $verificationCode: String
      ) {
        updateMyProfile(
          data: {
            authType: client
            firstName: $firstName
            password: $password
            lastName: $lastName
            email: $email
            mobile: $mobile
            language: $language
            photo: $photo
            smsEnabled: $smsEnabled
            notificationsEnabled: $notificationsEnabled
            verificationCode: $verificationCode
          }
        ) {
          ... on Client {
            id
            firstName
            lastName
            mobile
          }
        }
      }
    `;

    const { data, errors } = await newMutation({
      mutation: UPDATE_USER,
      variables: {
        firstName: 'Sandro',
        lastName: 'Regular Var',
        password: 'sandro',
        lang: 'KA',
        // @ts-ignore
        verificationCode,
      },
    });

    errors?.[0] && console.error(errors[0].message);

    expect(data?.updateMyProfile.firstName).toEqual('Sandro');
    expect(data?.updateMyProfile.lastName).toEqual('Regular Var');
  });

  it('Sign In Client', async () => {
    const SIGN_IN = gql`
      mutation SignIn($mobile: String!, $password: String!) {
        signin(data: { mobile: $mobile, password: $password, authType: client }) {
          ... on Client {
            id
            firstName
            lastName
            mobile
            token
          }
        }
      }
    `;

    const { data, errors } = await mutate({
      mutation: SIGN_IN,
      variables: {
        mobile,
        password: 'sandro',
        authType: 'client',
        lang: 'KA',
      },
    });

    errors?.[0] && console.error(errors[0].message);

    expect(data?.signin?.id).toBeTruthy();
    expect(data?.signin?.firstName).toEqual('Sandro');
  });

  it('FETCH My Profile', async () => {
    const GET_MY_PROFILE = gql`
      query me($authType: AuthType) {
        me(authType: $authType) {
          id
        }
      }
    `;

    const { data, errors } = await newQuery({ query: GET_MY_PROFILE, variables: { authType: 'client' } });

    errors?.[0] && console.error(errors[0].message);

    expect(data?.me?.id).toBeTruthy();
  });

  it('Send Verification Code', async () => {
    const SEND_VERIFICATION_CODE = gql`
      mutation SendVerificationCode($mobile: String!, $language: Language!) {
        sendVerificationCode(data: { mobile: $mobile }, lang: $language) {
          message
        }
      }
    `;

    const { data, errors } = await mutate({
      mutation: SEND_VERIFICATION_CODE,
      variables: {
        mobile,
        language: 'KA',
      },
    });

    errors?.[0] && console.error(errors[0].message);
    const user = await db.client.findUnique({
      where: { mobile },
    });
    // @ts-ignore
    verificationCode = user.verificationCode;
    expect(data?.sendVerificationCode.message).toEqual(formatMessage('KA', 'auth.codeSentSuccessfully'));
  });

  it('Reset password', async () => {
    const RESET_PASSWORD = gql`
      mutation ResetPassword($mobile: String!, $password: String!, $verificationCode: String!, $lang: Language!) {
        resetPassword(
          data: { mobile: $mobile, password: $password, verificationCode: $verificationCode, authType: client }
          lang: $lang
        ) {
          ... on Client {
            id
            firstName
            lastName
            mobile
            token
          }
        }
      }
    `;

    const { data, errors } = await mutate({
      mutation: RESET_PASSWORD,
      variables: {
        mobile,
        // @ts-ignore
        verificationCode,
        password: 'password',
        lang: 'KA',
      },
    });

    errors?.[0] && console.error(errors[0].message);

    expect(data?.resetPassword.id).toBeTruthy();
  });

  it('Change Password', async () => {
    const CHANGE_PASSWORD = gql`
      mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
        changeMyPassword(data: { currentPassword: $currentPassword, newPassword: $newPassword, authType: client }) {
          message
        }
      }
    `;

    const { data, errors } = await newMutation({
      mutation: CHANGE_PASSWORD,
      variables: {
        currentPassword: 'password',
        newPassword: 'password123',
      },
    });

    errors?.[0] && console.error(errors[0].message);

    expect(data?.changeMyPassword.message).toEqual(formatMessage('KA', 'auth.passwordChangedSuccessfully'));
  });

  it('Update Mobile', async () => {
    const UPDATE_MOBILE = gql`
      mutation UpdateMobile($verificationCode: String!, $mobile: String!) {
        updateMyMobile(data: { verificationCode: $verificationCode, authType: client, mobile: $mobile }) {
          message
        }
      }
    `;

    const user = await db.client.findUnique({
      where: { mobile },
    });

    const { data, errors } = await newMutation({
      mutation: UPDATE_MOBILE,
      variables: {
        mobile: `50${Math.random().toString().slice(2, 9)}`,
        language: 'KA',
        // @ts-ignore
        verificationCode: user.verificationCode,
      },
    });

    errors?.[0] && console.error(errors[0].message);

    expect(data?.updateMyMobile.message).toEqual(formatMessage('KA', 'common.updatedSuccessfully'));
  });

  it('Logout', async () => {
    const SIGN_OUT = gql`
      mutation SignOut {
        signout {
          message
        }
      }
    `;
    const { data, errors } = await mutate({
      mutation: SIGN_OUT,
    });

    errors?.[0] && console.error(errors[0].message);

    expect(data?.signout.message).toEqual('GoodBye!');
  });

  server.stop();
});
