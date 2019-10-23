const axios = require('axios');
const { graphql, buildSchema } = require('graphql');

process.on('message', (msg) => {

  //const schema =  buildSchema(`${msg}`);
  const schema = buildSchema(`
    type Launch {
      id: ID,
      launch_year: String,
      mission_name: String,
      rocket: [Rocket],
    }

    type Rocket {
      id: ID,
      rocket_id: String,
      rocket_name: String,
      rocket_type: String,
    }

    type Query {
      launch: Launch,
      rocket: Rocket,
    }`
  )
  const root = {
    launch: () => 
      {
        return axios
          .get('https://api.spacexdata.com/v3/launches/latest')
          .then(res => res.data)
      }
  }

  graphql(schema, '{launch {launch_year mission_name}}', root).then((response) => {
    console.log(response);
  })
})

