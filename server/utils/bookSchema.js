const axios = require('axios');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Author {
      name: String,
    }

    type Book {
      title: String,
      authors: [Author]
    }

    type Query {
      author(name: String): Author,
      allAuthor: [Author],
      book(title: String): Book,
      allBook(title: String): [Book]
    }
  `)
  const root = {
    book: (args) => 
      {
        return axios
          .get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${args.title}&key=AIzaSyD4bymyi_wD_OIO9kEP26jir5rR3ftnkRg`)
          .then(res => res.data.items)
          .then(items => items[0].volumeInfo)
      },
    allBook: (args) => 
      {
        return axios
          .get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${args.title}&key=AIzaSyD4bymyi_wD_OIO9kEP26jir5rR3ftnkRg`)
          .then(res => res.data.items)
          .then(items => {
            const output = [];
            for(let i = 0; i < items.length; i++) {
              output.push(items[i].volumeInfo)
            }
            return output;
          })
      }
  }
  const query = '{book(title: "The Collector") {title}}'
  //const query = '{allBook(title:"Harry Potter") {title}}'

  module.exports = {schema, root, query};