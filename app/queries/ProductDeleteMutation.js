import { gql } from 'apollo-boost';

const ProductDeleteMutation = gql`
  mutation productDelete($input: ProductDeleteInput!) {
    productDelete(input: $input) {
      deletedProductId
      shop {
        id
      }
    }
  }
`;

export default ProductDeleteMutation;