const { graphql, buildSchema } = require('graphql');
const { schema, root, query } = require('./utils/launchSchema');
//const { schema, root, query } = require('./utils/bookSchema');

// runs whenever it receives messsage from electron
// msg {array} params includes data for query, path, schema
process.on('message', (msg) => {
  // const schema =  buildSchema(`${msg[0]}`);
  // const query = msg[1]
  // let path = `${msg[2]}/resolver.js`
  // const root = require(path)

  // makes graphql query
  try {
    graphql(schema, query, root).then((response) => {
      console.log(response);
      process.send(response);
    })
  }
  catch(err) {
    console.log(err)
  }
})

