import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { App } from './containers';
import ApolloClient from './apollo';

const Root = () => (
  <ApolloProvider client={ApolloClient}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(
  <Root />,
  document.getElementById('app')
);
