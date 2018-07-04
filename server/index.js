import dotenv from 'dotenv';
import Koa from 'koa';
import session from 'koa-session';
import createShopifyAuth, {
  createVerifyRequest,
} from '@shopify/koa-shopify-auth';
import renderReactApp from './render-react-app';
import webpack from 'koa-webpack';
import graphQLProxy from '@shopify/koa-shopify-graphql-proxy';

dotenv.config();
const SHOPIFY_API_KEY = "8fe7514165a31e6edd9c1f4d23cefd49";
const SHOPIFY_SECRET = "063c189a8be1912c37c0aeedd75f0a69";

const app = new Koa();
app.use(session(app));
app.keys = [SHOPIFY_SECRET];

app.use(
  createShopifyAuth({
    apiKey: SHOPIFY_API_KEY,
    secret: SHOPIFY_SECRET,
    scopes: ['write_products'],
    afterAuth(ctx) {
      const {shop, accessToken} = ctx.session;
      console.log('We did it!', shop, accessToken);
      ctx.redirect('/');
    },
  }),
);

app.use(graphQLProxy)

app.use(createVerifyRequest());

app.use(webpack());

app.use(renderReactApp);

export default app;
