import { defineBoot } from '#q-app/wrappers';
import { useTemplateGlobals } from 'stores/template-globals';

export default defineBoot(({ router, store }) => {
  router.beforeEach((to, from, next) => {
    const templateGlobalsState = useTemplateGlobals(store);
    const matchAgainstRoutes = (routeName: string): boolean => {
      return to.matched.some((m) => m.name === routeName);
    };
    templateGlobalsState.$patch((state) => {
      // todo: consider removing this
      state.isIndexPage = matchAgainstRoutes('index');
      // todo: consider removing this
      state.isDarkMode = matchAgainstRoutes('index');
      // todo: find by route children
      // todo: consider removing this
      state.isEstimatePage = matchAgainstRoutes('estimate');
      // todo: consider removing this
      state.isEstimateCheckoutPage = matchAgainstRoutes('checkout');
    });
    next();
  });
});
