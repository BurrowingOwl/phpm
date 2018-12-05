import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { injectGlobal } from 'styled-components';
import theme from './styles/muiTheme';
import { App } from './containers';
import ApolloClient from './apollo';

injectGlobal([`
  html, body {
    height: 100%;
    overflow: auto;
  }
`]);

const Root = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <ApolloProvider client={ApolloClient}>
      <App path="/" />
    </ApolloProvider>
  </MuiThemeProvider>
);

ReactDOM.render(<Root />, document.getElementById('app'));
