import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import clientState from './clientState';
// authentication 설정
// cache 사용시 auth 확인 못하는 걸 해결해줌.
// https://www.apollographql.com/docs/react/recipes/authentication.html 참고
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: '/graphql',
  credentials: 'same-origin',
});
const state = withClientState({
  cache,
  ...clientState,
});
const client = new ApolloClient({
  cache,
  link: ApolloLink.from([state, link]),
});

// client.resetStore(); 하면 state 초기화.
client.onResetStore(state.writeDefaults);

export default client;
