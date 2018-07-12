import React from 'react';
import { Page, AppProvider } from '@shopify/polaris';
import ApolloClient from 'apollo-boost';
import { Switch, Route, withRouter } from 'react-router';
import RoutePropagator from '@shopify/react-shopify-app-route-propagator';
import {Calendar, Weight, All, New } from './routes'

const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include',
  },
});

const Propagator = withRouter(RoutePropagator);

export default function () {
  return (
    <AppProvider>
      <div>
        <link rel="stylesheet" href="https://sdks.shopifycdn.com/polaris/2.2.0/polaris.min.css" />
        <Page
          title="Task Organizer"
          secondaryActions={[{ content: 'ALL', url: '/' }, { content: 'Weight', url: '/weight' }, { content: 'Calendar', url: '/calendar' }, { content: 'New', url: '/new' }]}
        >
          <React.Fragment>
            <Propagator />
            <Switch>
              <Route exact path="/" component={All} />
              <Route exact path="/calendar" component={Calendar} />
              <Route path="/weight" component={Weight} />
              <Route path="/new" component={New} />
            </Switch>
          </React.Fragment>
        </Page>
      </div>
    </AppProvider>
  );
}
