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
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Mutation, Query } from 'react-apollo';
import Loading from './Loading'
import { AllProductQuery, ProductDeleteMutation } from '../queries'

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
            <Query query={AllProductQuery}>
              {
                ({ loading, data }) => {
                  if (loading) return <Loading />;

                  return (
                    <Card>
                      <ResourceList
                        resourceName={{ singular: 'task', plural: 'tasks' }}
                        items={data.shop.products.edges}
                        renderItem={(item) => {
                          const { id, title, description, tags, productType } = item.node;

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
                              <Mutation mutation={ProductDeleteMutation}>
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
