import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors :', graphQLErrors)
    console.log('networkError :', networkError)
  },
  request: async operation => {
    operation.setContext({
      headers: {
        authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
      }
    });
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App query={client.query} />
  </ApolloProvider>,
  document.getElementById("root")
);

reportWebVitals();
