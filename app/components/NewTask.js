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
  mutation createProduct($title: String!) {
    createProduct(title: $title) {
      id
      title
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
    title: '',
    description: '',
    tags: '',
    weight: ''
  };

  handleChange = (field) => {
      return (value) => this.setState({[field]: value});
    };

    handleSubmit = (event) => {
      // createProduct(this.title)
      console.log(this.title);
      this.setState(
        {
          title: '',
          description: '',
          tags: '',
          weight: ''
        }
      );
    };

  render() {

    const {title,description, tags, weight} = this.state;

    return(
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
            value={weight}
            onChange={this.handleChange('weight')}
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

          <Button submit>Submit</Button>
        </FormLayout>
      </Form>
    )
  }
}
export default NewTask;
