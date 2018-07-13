import { gql } from 'apollo-boost';

const ProductCreateMutation = gql`
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

export default ProductCreateMutation;