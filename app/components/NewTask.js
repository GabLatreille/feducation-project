import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Mutation } from 'react-apollo';
import {
  Form,
  FormLayout,
  Card,
  TextField,
  Button
} from '@shopify/polaris';
import { ProductCreateMutation } from '../queries'

const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include',
  },
});

class NewTask extends React.Component {
  state = {
    title: '',
    description: '',
    tags: '',
    productType: ''
  };

  handleChange = (field) => {
    return (value) => this.setState({ [field]: value });
  };

  handleSubmit = (event) => {
    this.setState(
      {
        title: '',
        description: '',
        tags: '',
        productType: ''
      }
    );
  };

  render() {

    const { title, description, tags, productType } = this.state;

    function mutate(createProduct) {
      const productInput = {
        title: title,
        descriptionHtml: description,
        tags: tags,
        productType: productType
      };

      createProduct({
        variables: { product: productInput },
      });

    }


    return (
      <ApolloProvider client={client}>

        <Mutation mutation={ProductCreateMutation}>
          {
            (createProduct) => {
              return (
                <Card sectioned="sectioned">
                  <Form onSubmit={this.handleSubmit}>
                    <FormLayout>
                      <TextField
                        value={title}
                        onChange={this.handleChange('title')}
                        label="Title"
                        type="text"
                      />
                      <TextField
                        value={description}
                        onChange={this.handleChange('description')}
                        label="Description"
                        type="text"
                      />
                      <TextField
                        value={tags}
                        onChange={this.handleChange('tags')}
                        label="Tags"
                        type="text"
                        helpText={
                          <span>
                            Separate with commas
                          </span>
                        }
                      />
                      <TextField
                        value={productType}
                        onChange={this.handleChange('productType')}
                        label="Priority"
                        type="number"
                        max={3}
                        min={1}
                        helpText={
                          <span>
                            3: high, 2:medium, 1:low
                          </span>
                        }
                      />

                      <Button onClick={() => mutate(createProduct)} submit>Submit</Button>
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
export default NewTask;
