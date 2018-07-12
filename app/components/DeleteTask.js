const DELETE_PRODUCT = gql`
  mutation productDelete($input: ProductDeleteInput!) {
    productDelete(input: $input) {
      userErrors {
        field
        message
      }
      deletedProductId
      shop {
        id
      }
    }
  }
`;
