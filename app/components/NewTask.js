import React from 'react';
import ApolloClient, {gql} from 'apollo-boost';
import {ApolloProvider, Mutation, Query} from 'react-apollo';
import {
  Form,
  FormLayout,
  Card,
  TextField,
  Button
} from '@shopify/polaris';

const ADD_PRODUCT = gql`
  mutation productCreate($product: ProductInput!) {
    productCreate(input: $product) {
      product {
        id
        title
        descriptionHtml
        tags
        productType
      }
    }
  }
`;



const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include',
  },
});

class NewTask extends React.Component {
  state = {
    title: '' ,
    description: '',
    tags: '',
    productType: ''
  };

  handleChange = (field) => {
      return (value) => this.setState({[field]: value});
    };

  handleSubmit = (event) => {
    console.log(this.title);
    this.setState(
      {
        title: '' ,
        description: '',
        tags: '',
        productType: ''
      }
    );
  };

  render() {

    const {title, description, tags, productType} = this.state;

    function mutate(createProduct) {
      const productInput = {
        title: title,
        descriptionHtml: description,
        tags: tags,
        productType: productType
      };

      createProduct({
        variables: {product: productInput},
      });

      console.log("YUP");
    }


    return (<ApolloProvider client={client}>

      <Mutation mutation={ADD_PRODUCT}>
        {
          (createProduct, mutationResults) => {
            const loading = mutationResults.loading && <p>loading...</p>;

            const error = mutationResults.error && <p>error creating new task</p>;

            const success = mutationResults.data && (<p>
              successfully created &nbsp; {mutationResults.data.productCreate.product.title}
            </p>);

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
