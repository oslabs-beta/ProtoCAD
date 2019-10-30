const axios = require('axios');
const { buildSchema } = require('graphql');

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
      allLaunch: [Launch],
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
    allLaunch: () =>
      {
        return axios
          .get('https://api.spacexdata.com/v3/launches/')
          .then(res => res.data)
          .then(items => {
            const output = [];
            for(let i = items.length-5; i < items.length; i++) {
              output.push(items[i])
            }
            return output;
          })
      }
  }
  // const query = '{launch {launch_year mission_name}}'
  const query = '{allLaunch {launch_year mission_name rocket {rocket_type}}}'

  module.exports = {schema, root, query}