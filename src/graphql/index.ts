import { ApolloServer } from "@apollo/server";


async function crateApolloGraphqlServer(){
    // Create GraphQL server
  const gqlServer = new ApolloServer({
    typeDefs: `
      type Query {
       
      }
        type Mutation{
        
        }
    `,
    resolvers: {
      Query: {},
      Mutation:{}
    }
  });

  // Start the GraphQL server
  await gqlServer.start();
}

export default crateApolloGraphqlServer