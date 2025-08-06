import { defineSsrMiddleware } from '#q-app/wrappers';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli-vite/developing-ssr/ssr-middleware
export default defineSsrMiddleware(async ({ app, resolve, publicPath, render }) => {
  console.log('logging-middleware:', app, resolve, publicPath, render);
  app.all(resolve.urlPath('*'), (req, _, next) => {
    console.log('someone requested:', req.url);
    next();
  });
});
