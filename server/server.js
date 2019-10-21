const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');
const url ='localhost:4000';

process.on('message', (msg) => {
  let typeDefs = gql`${msg}`;
  // let resolvers;

//   const typeDefs = gql`
// type Launch {
//   id: ID,
//   launch_year: String,
//   mission_name: String,
//   rocket: [Rocket],
// }

// type Rocket {
//   id: ID,
//   rocket_id: String,
//   rocket_name: String,
//   rocket_type: String,
// }

// type Query {
//   launch: Launch,
//   rocket: Rocket,
// }`;

  const resolvers = {
    Query: {
      launch(parent, args) {
        return axios
          .get('https://api.spacexdata.com/v3/launches/latest')
          .then(res => res.data)
      },
    }
  };
  const server = new ApolloServer({typeDefs, resolvers});
  
  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
  });
})

