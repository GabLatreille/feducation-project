import React from 'react';
import Fetch from 'react-fetch-component';
import {
  AppProvider,
  Page,
  Card,
  Button,
  ResourceList,
  TextStyle,
} from '@shopify/polaris';

import ApolloClient, {gql} from 'apollo-boost';
import {ApolloProvider, Mutation, Query} from 'react-apollo';
import Loading from './Loading'

const ALL_PRODUCTS = gql `
query{
  shop {
    products(first: 50){
      edges{
        node {
          id
          title
          tags
        }
      }
    }
  }
}
`;

const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include'
  }
});

export default function QueryByTag() {
  return (
    <AppProvider>
    <Page>
      <ApolloProvider client={client}>
        <Query query={ALL_PRODUCTS}>
          {
            ({loading, error, data}) => {
              if (loading) return <Loading />;
              if (error) return `Error! ${error.message}`;

              const tasks = data.shop.products.edges;

              return (
                <Card>
                  <ResourceList
                    resourceName={{singular: 'task', plural: 'tasks'}}
                    items={tasks}
                    renderItem={(item) => {
                      const {id, title, tags} = item.node;

                      return (<ResourceList.Item id={id} accessibilityLabel={`View details for ${title}`}>
                        <h3><TextStyle variation="strong">{title}</TextStyle></h3>
                        <p>{tags}</p>
                      </ResourceList.Item>);
                    }
                  }
                  />
                </Card>
              );
            }
          }
        </Query>

      </ApolloProvider>
    </Page>
  </AppProvider>)
}
