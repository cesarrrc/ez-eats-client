import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/layout";
import { NotificationContextProvider } from "../store/notification-context";
import { ApolloProvider } from "@apollo/client/react";
import client from "../lib/apollo";
import { gql } from "@apollo/client";



export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <NotificationContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NotificationContextProvider>
    </ApolloProvider>
  );
}
