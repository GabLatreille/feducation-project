import React from 'react';
import Fetch from 'react-fetch-component';
import {
  AppProvider,
  Page,
  Card,
  Button,
  ResourceList,
  TextStyle,
  Badge,
} from '@shopify/polaris';

import ApolloClient, {gql} from 'apollo-boost';
import {ApolloProvider, Mutation, Query} from 'react-apollo';
import Loading from './Loading'

const ALL_PRODUCTS = gql `
query Products($reverse: Boolean){
  shop {
    products(first: 50, sortKey:PRODUCT_TYPE, reverse:true){
      edges{
        node {
          id
          title
          productType
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

export default function QueryByWeight() {
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
                      const {id, title, productType} = item.node;

                      let media = <Badge status="info">0</Badge>;
                      if(productType==1) media = <Badge status="success">1</Badge>;
                      else if(productType==2) media = <Badge status="attention">2</Badge>;
                      else if(productType==3) media = <Badge status="warning">3</Badge>;

                      return (<ResourceList.Item id={id} media={media} accessibilityLabel={`View details for ${title}`}>
                        <h3><TextStyle variation="strong">{title}</TextStyle></h3>
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
