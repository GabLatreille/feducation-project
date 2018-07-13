import { gql } from 'apollo-boost';

const AllProductQuery = gql`
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

export default AllProductQuery;