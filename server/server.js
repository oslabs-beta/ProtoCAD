const axios = require('axios');
const { graphql, buildSchema } = require('graphql');

process.on('message', (msg) => {
  //const schema =  buildSchema(`${msg[0]}`);
  const query = msg[1]
  // let path = `${msg[2]}/resolver.js`
  // const root = require(path)
  const schema = buildSchema(`
    type Launch {
      id: ID,
      launch_year: String,
      mission_name: String,
      rocket: Rocket,
    }

    type Rocket {
      id: ID,
      rocket_id: String,
      rocket_name: String,
      rocket_type: String,
    }

    type Query {
      launch: Launch,
      launches: [Launch],
      rocket: Rocket,
    }`
  )
  const root = {
    launch: () => 
      {
        return axios
          .get('https://api.spacexdata.com/v3/launches/latest')
          .then(res => res.data)
      },
    launches: () =>
      {
        return axios
          .get('https://api.spacexdata.com/v3/launches/')
          .then(res => res.data)
      }
  }
  // const root = {
  //   launch: () => 
  //     ({
  //       mission_name: 'jason1245',
  //       launch_year: '2019'
  //     })
  // }

  //const query = '{launch {launch_year mission_name rocket {rocket_id}}}'
  try {
    graphql(schema, query, root).then((response) => {
      console.log(response.data.launches[0])
      process.send(response);
    })
  }
  catch(err) {
    console.log(err)
  }
})

