module.exports = schema => `
const { gql } = require('apollo-server');

const typeDefs = gql\`
${schema}
\`;

module.exports = typeDefs;
`;