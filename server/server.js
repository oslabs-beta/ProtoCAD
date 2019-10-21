const { ApolloServer, gql } = require('apollo-server');
const url ='localhost:4000';

let typeDefs;
process.on('message', (msg) => {
  const typeDefs = gql`${msg}`;
  let resolvers;
  const server = new ApolloServer({typeDefs, resolvers});
  
  console.log(typeDefs);
  
  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
  });
})

