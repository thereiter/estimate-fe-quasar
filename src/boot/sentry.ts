import { defineBoot } from '#q-app/wrappers';
import * as Sentry from '@sentry/vue';
import { createSentryPiniaPlugin } from '@sentry/vue';

export default defineBoot(({ app, store }) => {
  Sentry.init({
    dsn: 'https://d9ef1a7114156c4e9bd5cf523842d780@o4504782439448576.ingest.us.sentry.io/4509756174696448',
    // Filter out default `Vue` integration
    integrations: (integrations) =>
      integrations.filter((integration) => integration.name !== 'Vue'),
  });

  Sentry.addIntegration(Sentry.vueIntegration({ app }));
  store.use(createSentryPiniaPlugin());
});
