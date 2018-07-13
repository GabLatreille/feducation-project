import {gql} from 'apollo-boost';

const ShopQuery = gql`
{
    shop{
        name
        description
    }
}
`;

export default ShopQuery;