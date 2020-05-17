import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { resolvers, typeDefs } from "./resolvers";
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from "@apollo/react-hooks";

const cache = new InMemoryCache({});
const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: "http://localhost:4000/graphql"
  })
,

  typeDefs,  resolvers
});

cache.writeData({
  data: {
    dynamicForm: [{
      __typename: "FormInput",
      id: 1,
      type: "name",
      required: true,
      field: "Name",
      value: "Waterlabs"
    },{
      __typename: "FormInput",
      id: 2,
      type: "date",
      required: false,
      field: "Birthday",
      value: '01-10-1990'
    },{
      __typename: "FormInput",
      id: 3,
      type: "string",
      required: true,
      field: "Email",
      value: ""
    },{
      __typename: "FormInput",
      id: 4,
      type: "number",
      required: false,
      field: "Phone Number",
      value: ""
    }]
  }
});
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
