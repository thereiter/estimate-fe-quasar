import { defineBoot } from '#q-app/wrappers';
import { useAuthStore } from 'stores/auth';

export default defineBoot(({ router, store }) => {
  router.beforeEach((to, from, next) => {
    const authState = useAuthStore(store);
    next();
  });
});
