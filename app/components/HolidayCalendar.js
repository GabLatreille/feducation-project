import React from 'react';
import { AppProvider, Card, ResourceList, TextStyle } from '@shopify/polaris';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Fetch from 'react-fetch-component';

export default function HolidayCalendar() {
    const client = new ApolloClient({
        fetchOptions: {
            credentials: 'include'
        }
    });

    const today = new Date();
    const apiurl = "https://holidayapi.com/v1/holidays?key=d587794b-1171-4a49-920a-afb6230f92da&country=CA&year=2017&month=" + (today.getMonth() + 1);

    return (
        <AppProvider>
            <ApolloProvider client={client}>
                <Fetch url={apiurl} as="json">
                    {
                        (fetchResults) => {
                            if (fetchResults.data) {
                                return (
                                    <Card>
                                        <ResourceList
                                            resourceName={{ singular: 'holiday', plural: 'holidays' }}
                                            items={fetchResults.data.holidays}
                                            renderItem={(item) => {
                                                const { name, date } = item;
                                                const longDate = new Date(date)
                                                return (
                                                    <ResourceList.Item>
                                                        <h3><TextStyle variation="strong">{name}</TextStyle></h3>
                                                        <h5>{longDate.getDate() + "/" + longDate.getMonth() + "/" + longDate.getFullYear()}</h5>
                                                    </ResourceList.Item>
                                                );
                                            }
                                            }
                                        />
                                    </Card>
                                )
                            }
                        }
                    }
                </Fetch>
            </ApolloProvider>
        </AppProvider>
    )
}
