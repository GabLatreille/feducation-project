import React from 'react';
import {
  AppProvider,
  Page,
  Card,
  Button,
  ResourceList,
  TextStyle,
  Badge,
} from '@shopify/polaris';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider, Mutation, Query } from 'react-apollo';
import Loading from './Loading'

const ALL_PRODUCTS = gql`
query {
  shop {
    products(first: 50){
      edges{
        node {
          id
          title
          description
          tags
          productType
        }
      }
    }
  }
}
`;

const DELETE_PRODUCT = gql`
  mutation productDelete($input: ProductDeleteInput!) {
    productDelete(input: $input) {
      deletedProductId
      shop {
        id
      }
    }
  }
`;


const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include'
  }
});

class QueryAll extends React.Component {

  render() {

    function mutate(productDelete, id) {
      const productInput = {
        id: id,
      };

      productDelete({
        variables: { input: productInput },
      });

      window.location.reload();

    }

    return (
      <AppProvider>
        <Page>
          <ApolloProvider client={client}>
            <Query query={ALL_PRODUCTS}>
              {
                ({ loading, error, data }) => {
                  if (loading) return <Loading />;
                  if (error) return `Error! ${error.message}`;

                  return (
                    <Card>
                      <ResourceList
                        resourceName={{ singular: 'task', plural: 'tasks' }}
                        items={data.shop.products.edges}
                        renderItem={(item) => {
                          const { id, title, description, tags, productType } = item.node;
                          console.log(id)

                          let media = <Badge status="info">0</Badge>;
                          if (productType == 1) media = <Badge status="success">1</Badge>;
                          else if (productType == 2) media = <Badge status="attention">2</Badge>;
                          else if (productType == 3) media = <Badge status="warning">3</Badge>;

                          return (
                            <ResourceList.Item
                              id={id}
                              media={media}
                            >
                              <h3><TextStyle variation="strong">{title}</TextStyle></h3>
                              <h5>{description}</h5>
                              <p>{tags}</p>
                              <Mutation mutation={DELETE_PRODUCT}>
                                {
                                  (productDelete) => {
                                    return (
                                      <Button onClick={() => mutate(productDelete, id)} submit>Finished</Button>
                                    )
                                  }
                                }
                              </Mutation>
                            </ResourceList.Item>
                          );
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
}

export default QueryAll;
