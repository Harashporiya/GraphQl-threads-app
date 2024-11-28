import { ApolloServer } from "@apollo/server";
import { user } from './user'

async function crateApolloGraphqlServer(){
    // Create GraphQL server
  const gqlServer = new ApolloServer({
    typeDefs: `
    ${user.typeDefs}
      type Query {
        ${user.queries}
      }
        type Mutation{
        ${user.mutations}
        }
    `,
    resolvers: {
      Query: {
        ...user.resolvers.queries,
      },
      Mutation:{
        ...user.resolvers.mutations
      }

    }
  });

  // Start the GraphQL server
  await gqlServer.start();

  return gqlServer;
}

export default crateApolloGraphqlServer