import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// authentication 설정
// cache 사용시 auth 확인 못하는 걸 해결해줌.
// https://www.apollographql.com/docs/react/recipes/authentication.html 참고
const link = new HttpLink({
  uri: '/graphql',
  credentials: 'same-origin',
});
const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
});

export default client;
