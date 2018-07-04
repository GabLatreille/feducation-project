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
query {
  shop {
    products(first: 50){
      edges{
        node {
          id
          title
          description
          tags
          variants(first: 1){
            edges{
              node{
                weight
              }
            }
          }
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

export default function QueryAll() {
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
                      const {id, title, description, tags} = item.node;
                      const {weight} = item.node.variants.edges[0].node

                      let media = <Badge status="info">0</Badge>;
                      if(weight==1) media = <Badge status="success">1</Badge>;
                      else if(weight==2) media = <Badge status="attention">2</Badge>;
                      else if(weight==3) media = <Badge status="warning">3</Badge>;

                      return (<ResourceList.Item id={id} media={media} accessibilityLabel={`View details for ${title}`}>
                        <h3><TextStyle variation="strong">{title}</TextStyle></h3>
                        <h5>{description}</h5>
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
