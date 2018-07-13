import { gql } from 'apollo-boost';

const PriorityQuery = gql`
query Products($reverse: Boolean){
    shop {
        products(first: 50, sortKey:PRODUCT_TYPE, reverse:$reverse){
            edges{
                node {
                    id
                    title
                    productType
                }
            }
        }
    }
}
`;

export default PriorityQuery;