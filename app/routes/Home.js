import React from 'react';
import { AppProvider, DisplayText } from '@shopify/polaris';
import { ApolloProvider, Query } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { ShopQuery } from '../Queries'
import { HomeLoading } from '../components'

const client = new ApolloClient({
    fetchOptions: {
        credentials: 'include',
    },
});

export default function Home() {
    return (
        <AppProvider>
            <ApolloProvider client={client}>
                <Query query={ShopQuery}>
                    {
                        ({ loading, data }) => {
                            if (loading) return <HomeLoading />

                            if (data.shop) {
                                const { name, description } = data.shop;
                                return (
                                    <div>
                                        <DisplayText size="extraLarge">Welcome to {name}!</DisplayText>
                                        <DisplayText size="medium">{description}</DisplayText>
                                    </div>
                                )
                            }
                        }
                    }

                </Query>
            </ApolloProvider>
        </AppProvider>

    );
}
