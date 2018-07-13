import React from 'react';
import { AppProvider, DisplayText} from '@shopify/polaris';
import { ApolloProvider, Query } from 'react-apollo';
import ApolloClient, { gql } from 'apollo-boost';

const SHOP_QUERY = gql`
{
    shop{
        name
        description
    }
}
`;

const client = new ApolloClient({
    fetchOptions: {
        credentials: 'include',
    },
});



export default function Home() {
    return (
        <AppProvider>
            <ApolloProvider client={client}>
                <Query query={SHOP_QUERY}>
                    {
                        ({ loading, error, data }) => {
                            if (loading) return "loading ...";
                            if (error) return `Error! ${error.message}`;
                            console.log(data.shop)

                            return (
                                <div>
                                    <DisplayText size="extraLarge">Welcome to {data.shop.name}!</DisplayText>
                                    <DisplayText size="medium">{data.shop.description}</DisplayText>
                                </div>
                            )
                        }
                    }

                </Query>
            </ApolloProvider>
        </AppProvider>

    );
}
