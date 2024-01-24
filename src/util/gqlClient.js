import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const gqlClient = new ApolloClient({
    uri: "https://instaswap-api.metaforo.io/",
    cache: new InMemoryCache()
});

export default gqlClient;