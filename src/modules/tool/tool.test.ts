import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import typeDefs from '../../schemas';
import resolvers from '../../resolvers';
import db from '../../services/db';
import formatMessage from '../../localization/intl';
import { formatError } from '../../utils';
import { ToolType, UserRole } from '@prisma/client';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError,
  context: async () => {
    const users = await db.user.findMany({ where: { role: UserRole.MANAGER } });
    const user = users[0];

    return { req: { userId: user.id, me: { language: 'KA', role: user.role } }, db };
  },
});
// @ts-ignore
const { query, mutate } = createTestClient(server);

describe('TOOl RESOLVERS', () => {
  // @ts-ignore
  let toolId;

  const CREATE_TOOL = gql`
    mutation CreateTool($name: String!, $description: String!, $toolType: ToolType!) {
      createTool(data: { name: $name, description: $description, toolType: $toolType }) {
        id
        name
        description
      }
    }
  `;

  it('CREATE Tool', async () => {
    const name = Math.random().toString(36).substring(7);
    const { data, errors } = await mutate({
      mutation: CREATE_TOOL,
      variables: {
        name,
        description: 'Steam cleaner!!',
        toolType: ToolType.VACUUM_CLEANER,
      },
    });

    errors?.[0] && console.error(errors[0].message);
    toolId = data?.createTool.id;
    expect(data?.createTool.name).toEqual(name);
  });

  it('FETCH All Tools', async () => {
    const GET_ALL_TOOLS = gql`
      query GetAllTools {
        getAllTools {
          id
          name
          description
        }
      }
    `;

    const { data, errors } = await query({ query: GET_ALL_TOOLS });

    errors?.[0] && console.error(errors[0].message);

    expect(Array.isArray(data?.getAllTools)).toBeTruthy();
    expect(data?.getAllTools[0]?.id).toBeTruthy();
  });

  it('FETCH Tool by id', async () => {
    const GET_TOOL = gql`
      query GetTool($id: String!) {
        getTool(id: $id) {
          id
          name
          description
        }
      }
    `;

    // @ts-ignore
    const { data, errors } = await query({ query: GET_TOOL, variables: { id: toolId } });

    errors?.[0] && console.error(errors[0].message);
    // @ts-ignore
    expect(data?.getTool.id).toEqual(toolId);
    expect(data?.getTool.id).toBeTruthy();
  });

  const UPDATE_TOOL = gql`
    mutation UpdateTool($id: String!, $name: String, $description: String, $toolType: ToolType) {
      updateTool(data: { id: $id, name: $name, description: $description, toolType: $toolType }) {
        id
        name
        description
      }
    }
  `;

  it('Update Tool', async () => {
    const name = Math.random().toString(36).substring(7);
    const { data, errors } = await mutate({
      mutation: UPDATE_TOOL,
      variables: {
        // @ts-ignore
        id: toolId,
        name,
        description: 'Updated Steam cleaner!!',
        toolType: ToolType.VACUUM_CLEANER,
      },
    });

    errors?.[0] && console.error(errors[0].message);
    toolId = data?.updateTool.id;
    expect(data?.updateTool.description).toEqual('Updated Steam cleaner!!');
  });

  it('DELETE Tool', async () => {
    const DELETE_TOOL = gql`
      mutation DeleteTool($id: String!) {
        deleteTool(id: $id) {
          message
        }
      }
    `;

    const { data, errors } = await mutate({
      mutation: DELETE_TOOL,
      // @ts-ignore
      variables: { id: toolId },
    });

    errors?.[0] && console.error(errors[0].message);

    expect(data?.deleteTool?.message).toEqual(formatMessage('KA', 'common.deletedSuccessfully'));
  });

  server.stop();
});
