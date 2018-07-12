import React from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider, Mutation, Query } from 'react-apollo';
import {
  Form,
  FormLayout,
  Card,
  TextField,
  Button
} from '@shopify/polaris';

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
    credentials: 'include',
  },
});

class DeleteTask extends React.Component {
  state = {
    id: ''
  };

  handleChange = (field) => {
    return (value) => this.setState({ [field]: value });
  };

  handleSubmit = (event) => {
    this.setState(
      {
        id: ''
      }
    );
  };

  render() {

    const { id } = this.state;

    function mutate(productDelete) {
      console.log(typeof id);
      const productInput = {
        "deletedProductId": id,
      };

      productDelete({
        variables: { input: productInput },
      });

    }


    return (
      <ApolloProvider client={client}>

        <Mutation mutation={DELETE_PRODUCT}>
          {
            (productDelete, mutationResults) => {
              const loading = mutationResults.loading && <p>loading...</p>;

              const error = mutationResults.error && <p>error creating new task</p>;

              const success = mutationResults.data && (<p>
                successfully created &nbsp; {mutationResults.data.productDelete.product.title}
              </p>);

              return (
                <Card sectioned="sectioned">
                  <Form onSubmit={this.handleSubmit}>
                    <FormLayout>
                      <TextField
                        value={id}
                        onChange={this.handleChange('id')}
                        label="id"
                        type="text"
                      />
                      <Button onClick={() => mutate(productDelete)} submit>Submit</Button>
                    </FormLayout>
                  </Form>

                </Card>
              )
            }
          }
        </Mutation>
      </ApolloProvider>);

  }
}
export default DeleteTask;
